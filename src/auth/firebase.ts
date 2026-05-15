import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  signOut, onAuthStateChanged, type User,
} from 'firebase/auth';
import { loadState, saveState } from '@/core/state';

const config = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

const app = initializeApp(config);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

function persistUser(u: User): void {
  const state = loadState();
  state.user = {
    uid: u.uid,
    displayName: u.displayName ?? '여행자',
    email: u.email ?? '',
    photoURL: u.photoURL ?? '',
  };
  saveState(state);
}

/**
 * 두 단계 로그인 전략:
 * 1) signInWithPopup 시도 — 빠르고 즉시 결과
 * 2) 실패(COOP/팝업차단/타임아웃) 시 signInWithRedirect 폴백
 *
 * 어떤 단계든 onError 콜백으로 정확한 에러 메시지를 호출자에게 전달.
 */
export async function loginWithGoogle(onError?: (msg: string) => void): Promise<User | null> {
  // 1) Try popup first
  try {
    console.log('[auth] trying signInWithPopup...');
    const result = await signInWithPopup(auth, provider);
    persistUser(result.user);
    console.log('[auth] popup ok:', result.user.email);
    return result.user;
  } catch (e: any) {
    const code = e?.code || 'unknown';
    const msg = e?.message || String(e);
    console.warn('[auth] popup failed:', code, msg);

    // popup-blocked or COOP issues -> fallback to redirect
    const fallbackCodes = new Set([
      'auth/popup-blocked',
      'auth/popup-closed-by-user',
      'auth/cancelled-popup-request',
      'auth/operation-not-supported-in-this-environment',
      'auth/internal-error',
      'auth/web-storage-unsupported',
    ]);

    if (fallbackCodes.has(code) || /Cross-Origin-Opener-Policy|window\.closed/i.test(msg)) {
      console.log('[auth] falling back to signInWithRedirect...');
      try {
        await signInWithRedirect(auth, provider);
        // page navigates away; control resumes in handleRedirectResult on return
        return null;
      } catch (re: any) {
        const rmsg = `Redirect 로그인 실패: ${re?.code ?? ''} ${re?.message ?? re}`;
        console.error('[auth]', rmsg);
        onError?.(rmsg);
        throw re;
      }
    }

    const userMsg = `로그인 실패 (${code})\n${msg}`;
    onError?.(userMsg);
    throw e;
  }
}

/**
 * 페이지 부팅 시 호출 — signInWithRedirect로부터의 복귀를 처리.
 * 에러는 콜백으로 노출 (silent 실패 방지).
 */
export async function handleRedirectResult(onError?: (msg: string) => void): Promise<User | null> {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      persistUser(result.user);
      console.log('[auth] redirect ok:', result.user.email);
      return result.user;
    }
    return null;
  } catch (e: any) {
    const msg = `Redirect 복귀 실패 (${e?.code ?? 'unknown'}): ${e?.message ?? e}`;
    console.error('[auth]', msg);
    onError?.(msg);
    return null;
  }
}

export async function logout(): Promise<void> {
  await signOut(auth);
  const state = loadState();
  state.user = null;
  saveState(state);
}

export function onAuth(cb: (u: User | null) => void): () => void {
  return onAuthStateChanged(auth, (u) => {
    if (u) persistUser(u);
    cb(u);
  });
}

export function currentUser(): User | null {
  return auth.currentUser;
}
