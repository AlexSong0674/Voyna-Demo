import { describe, it, expect } from 'vitest';
import { evaluateTitle, TITLES } from '@/core/titles';
import type { UserState } from '@/core/state';

// Keep TITLES referenced to avoid dead import warning
void TITLES;

function mkState(over: Partial<UserState>): UserState {
  return {
    user: null, xp: 0, level: 1, title: '초보 탐험가',
    obtained: [], currentLocation: null, realGPS: null,
    lastSeenAt: '', ...over,
  };
}

describe('titles', () => {
  it('기본: 초보 탐험가', () => {
    expect(evaluateTitle(mkState({})).id).toBe('beginner');
  });
  it('배지 5개 → 동네 탐험가', () => {
    const obtained = Array.from({ length: 5 }, (_, i) => ({
      badgeId: `b${i}`, at: '', lat: 0, lng: 0,
    }));
    expect(evaluateTitle(mkState({ obtained })).id).toBe('neighborhood');
  });
  it('배지 10개 → 지도 마니아', () => {
    const obtained = Array.from({ length: 10 }, (_, i) => ({
      badgeId: `b${i}`, at: '', lat: 0, lng: 0,
    }));
    expect(evaluateTitle(mkState({ obtained })).id).toBe('mania');
  });
  it('Lv10 + 배지 20개 → 전설의 여행자', () => {
    const obtained = Array.from({ length: 20 }, (_, i) => ({
      badgeId: `b${i}`, at: '', lat: 0, lng: 0,
    }));
    expect(evaluateTitle(mkState({ level: 10, obtained })).id).toBe('legend');
  });
});
