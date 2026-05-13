import { describe, it, expect } from 'vitest';
import { haversineMeters, withinRadius } from '@/core/geo';

describe('geo', () => {
  it('같은 좌표는 0m', () => {
    expect(haversineMeters(37.5573, 126.9485, 37.5573, 126.9485)).toBe(0);
  });
  it('ASSIST와 경복궁 사이 거리 약 2.5~3.7km 범위', () => {
    const d = haversineMeters(37.5573, 126.9485, 37.5796, 126.9770);
    expect(d).toBeGreaterThan(2500);
    expect(d).toBeLessThan(3700);
  });
  it('withinRadius: 반경 안이면 true', () => {
    expect(withinRadius(37.5573, 126.9485, 37.5573, 126.9485, 50)).toBe(true);
  });
  it('withinRadius: 반경 밖이면 false', () => {
    expect(withinRadius(37.5573, 126.9485, 37.5796, 126.9770, 200)).toBe(false);
  });
});
