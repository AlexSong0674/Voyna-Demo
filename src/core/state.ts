const KEY = 'voyna_demo_state_v1';

export type ObtainedBadge = {
  badgeId: string;
  at: string;
  lat: number;
  lng: number;
};

export type FirebaseUser = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export type UserState = {
  user: FirebaseUser | null;
  xp: number;
  level: number;
  title: string;
  obtained: ObtainedBadge[];
  currentLocation: { lat: number; lng: number; isTeleport: boolean } | null;
  realGPS: { lat: number; lng: number } | null;
  lastSeenAt: string;
};

export function defaultState(): UserState {
  return {
    user: null,
    xp: 0,
    level: 1,
    title: '초보 탐험가',
    obtained: [],
    currentLocation: null,
    realGPS: null,
    lastSeenAt: new Date().toISOString(),
  };
}

export function loadState(): UserState {
  const raw = localStorage.getItem(KEY);
  if (!raw) return defaultState();
  try {
    const parsed = JSON.parse(raw) as UserState;
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

export function saveState(s: UserState): void {
  s.lastSeenAt = new Date().toISOString();
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function resetState(): void {
  localStorage.removeItem(KEY);
}
