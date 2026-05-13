/**
 * 누적 XP for reaching level n (n>=1).
 * Lv1 = 0xp 시작. Lv2 도달 = 100xp. Lv n 도달 = sum_{k=1..n-1} floor(100 * k^1.6).
 */
export function xpForLevel(n: number): number {
  if (n <= 1) return 0;
  let total = 0;
  for (let k = 1; k < n; k++) {
    total += Math.floor(100 * Math.pow(k, 1.6));
  }
  return total;
}

export function levelForXp(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) {
    level++;
    if (level > 200) break;
  }
  return level;
}

export function xpToNextLevel(xp: number): { current: number; nextThreshold: number; progress: number } {
  const lv = levelForXp(xp);
  const cur = xpForLevel(lv);
  const next = xpForLevel(lv + 1);
  return { current: xp - cur, nextThreshold: next - cur, progress: (xp - cur) / (next - cur) };
}
