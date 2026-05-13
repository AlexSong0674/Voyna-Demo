import { describe, it, expect } from 'vitest';
import { xpForLevel, levelForXp } from '@/core/levels';

describe('levels', () => {
  it('xpForLevel: Lv1→2 누적 100xp', () => {
    expect(xpForLevel(2)).toBe(100);
  });
  it('xpForLevel: Lv2→3 누적 = 100 + floor(100*2^1.6)', () => {
    expect(xpForLevel(3)).toBe(100 + Math.floor(100 * Math.pow(2, 1.6)));
  });
  it('levelForXp: 0 xp → Lv1', () => {
    expect(levelForXp(0)).toBe(1);
  });
  it('levelForXp: 99 xp → Lv1', () => {
    expect(levelForXp(99)).toBe(1);
  });
  it('levelForXp: 100 xp → Lv2', () => {
    expect(levelForXp(100)).toBe(2);
  });
  it('levelForXp: 누적 xp 한 단계 부족하면 그 전 레벨', () => {
    const xp = xpForLevel(5) - 1;
    expect(levelForXp(xp)).toBe(4);
  });
});
