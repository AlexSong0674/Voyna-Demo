import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut,
  onAuthStateChanged, type User,
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

export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, provider);
  const u = result.user;
  const state = loadState();
  state.user = {
    uid: u.uid,
    displayName: u.displayName ?? '여행자',
    email: u.email ?? '',
    photoURL: u.photoURL ?? '',
  };
  saveState(state);
  return u;
}

export async function logout(): Promise<void> {
  await signOut(auth);
  const state = loadState();
  state.user = null;
  saveState(state);
}

export function onAuth(cb: (u: User | null) => void): () => void {
  return onAuthStateChanged(auth, cb);
}

export function currentUser(): User | null {
  return auth.currentUser;
}
