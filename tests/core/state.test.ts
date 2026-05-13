import { describe, it, expect, beforeEach } from 'vitest';
import { loadState, saveState, resetState, defaultState } from '@/core/state';

beforeEach(() => {
  localStorage.clear();
});

describe('state', () => {
  it('loadState: 없으면 defaultState', () => {
    const s = loadState();
    const d = defaultState();
    expect(s.user).toBe(d.user);
    expect(s.xp).toBe(d.xp);
    expect(s.level).toBe(d.level);
    expect(s.title).toBe(d.title);
    expect(s.obtained).toEqual(d.obtained);
    expect(s.currentLocation).toBe(d.currentLocation);
  });
  it('saveState → loadState 왕복', () => {
    const s = defaultState();
    s.xp = 250;
    s.level = 2;
    saveState(s);
    const loaded = loadState();
    expect(loaded.xp).toBe(250);
    expect(loaded.level).toBe(2);
  });
  it('resetState: localStorage 초기화', () => {
    const s = defaultState();
    s.xp = 999;
    saveState(s);
    resetState();
    expect(loadState().xp).toBe(0);
  });
  it('손상된 JSON은 defaultState 반환', () => {
    localStorage.setItem('voyna_demo_state_v1', '{ broken');
    expect(loadState().xp).toBe(0);
  });
});
