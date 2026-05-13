import { describe, it, expect, beforeEach } from 'vitest';
import { resetState, loadState, defaultState, saveState } from '@/core/state';
import { findNearbyBadges, awardBadge } from '@/core/badge-engine';
import { getLocation } from '@/core/catalog';

beforeEach(() => {
  resetState();
  const s = defaultState();
  s.user = { uid: 'test', displayName: 'Tester', email: 't@t.com', photoURL: '' };
  saveState(s);
});

describe('badge-engine', () => {
  it('findNearbyBadges: 경복궁 좌표면 경복궁 후보 반환', () => {
    const loc = getLocation('gyeongbok')!;
    const found = findNearbyBadges({ lat: loc.lat, lng: loc.lng });
    expect(found.some((c) => c.location.id === 'gyeongbok')).toBe(true);
  });

  it('findNearbyBadges: 이미 획득한 배지는 제외', () => {
    const loc = getLocation('gyeongbok')!;
    awardBadge('gyeongbok', loc.lat, loc.lng);
    const found = findNearbyBadges({ lat: loc.lat, lng: loc.lng });
    expect(found.some((c) => c.location.id === 'gyeongbok')).toBe(false);
  });

  it('awardBadge: XP 적립', () => {
    const before = loadState().xp;
    const r = awardBadge('myeongdong', 37.5636, 126.9826);
    expect(r.success).toBe(true);
    expect(loadState().xp).toBe(before + 50);
  });

  it('awardBadge: 중복 획득 거부', () => {
    awardBadge('gyeongbok', 37.5796, 126.9770);
    const r = awardBadge('gyeongbok', 37.5796, 126.9770);
    expect(r.success).toBe(false);
    if (!r.success) expect(r.reason).toBe('already_obtained');
  });

  it('awardBadge: 누적 xp 가 임계 넘으면 leveledUp=true', () => {
    awardBadge('gyeongbok', 37.5796, 126.9770);
    const r = awardBadge('bukhansan', 37.6588, 126.9772);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.leveledUp).toBe(true);
      expect(r.newLevel).toBeGreaterThan(1);
    }
  });

  it('awardBadge: 5개 채우면 동네 탐험가 칭호', () => {
    for (const id of ['myeongdong', 'gwanghwamun', 'insadong', 'hongdae', 'itaewon']) {
      awardBadge(id, 0, 0);
    }
    expect(loadState().title).toBe('동네 탐험가');
  });
});
