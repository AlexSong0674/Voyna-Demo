import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult,
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

export async function loginWithGoogle(): Promise<void> {
  await signInWithRedirect(auth, provider);
}

export async function handleRedirectResult(): Promise<User | null> {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      persistUser(result.user);
      return result.user;
    }
  } catch (e) {
    console.error('Redirect login failed:', e);
  }
  return null;
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
