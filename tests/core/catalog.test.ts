import { describe, it, expect } from 'vitest';
import { getLocations, getBadges, getLocation, getBadge } from '@/core/catalog';

describe('catalog', () => {
  it('locations 31개', () => {
    expect(getLocations()).toHaveLength(31);
  });
  it('badges 31개', () => {
    expect(getBadges()).toHaveLength(31);
  });
  it('ASSIST 좌표 정확', () => {
    const loc = getLocation('assist');
    expect(loc?.lat).toBe(37.5573);
    expect(loc?.lng).toBe(126.9485);
  });
  it('badge id가 location id와 1:1 대응', () => {
    const locIds = new Set(getLocations().map((l) => l.id));
    for (const b of getBadges()) {
      expect(locIds.has(b.id)).toBe(true);
    }
  });
  it('정성 디자인 배지 10개', () => {
    expect(getBadges().filter((b) => b.is_polished)).toHaveLength(10);
  });
  it('getBadge 존재하지 않으면 undefined', () => {
    expect(getBadge('nonexistent')).toBeUndefined();
  });
});
