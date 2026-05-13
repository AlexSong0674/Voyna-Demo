import { loadState, saveState } from './state';
import { getBadges, getBadge, getLocations, type Location, type Badge } from './catalog';
import { haversineMeters } from './geo';
import { levelForXp } from './levels';
import { evaluateTitle } from './titles';

export type NearbyCandidate = {
  location: Location;
  badge: Badge;
  distance: number;
};

export type AwardResult =
  | {
      success: true;
      badge: Badge;
      xpGained: number;
      newXp: number;
      newLevel: number;
      previousLevel: number;
      leveledUp: boolean;
      newTitle?: string;
      previousTitle: string;
    }
  | { success: false; reason: 'already_obtained' | 'unknown_badge' };

export function findNearbyBadges(
  current: { lat: number; lng: number },
  maxResults: number = 20
): NearbyCandidate[] {
  const state = loadState();
  const obtained = new Set(state.obtained.map((o) => o.badgeId));
  const out: NearbyCandidate[] = [];
  for (const loc of getLocations()) {
    if (obtained.has(loc.id)) continue;
    const d = haversineMeters(current.lat, current.lng, loc.lat, loc.lng);
    if (d <= loc.radius) {
      const badge = getBadge(loc.id);
      if (badge) out.push({ location: loc, badge, distance: d });
    }
  }
  return out.sort((a, b) => a.distance - b.distance).slice(0, maxResults);
}

function countSpecialObtained(obtainedIds: string[]): number {
  let n = 0;
  for (const id of obtainedIds) {
    const b = getBadge(id);
    if (b?.grade === 'special') n++;
  }
  return n;
}

export function awardBadge(badgeId: string, lat: number, lng: number): AwardResult {
  const badge = getBadge(badgeId);
  if (!badge) return { success: false, reason: 'unknown_badge' };

  const state = loadState();
  if (state.obtained.some((o) => o.badgeId === badgeId)) {
    return { success: false, reason: 'already_obtained' };
  }

  const previousLevel = state.level;
  const previousTitle = state.title;
  state.obtained.push({ badgeId, at: new Date().toISOString(), lat, lng });
  state.xp += badge.xp;
  state.level = levelForXp(state.xp);

  const specialCount = countSpecialObtained(state.obtained.map((o) => o.badgeId));
  const title = evaluateTitle(state, specialCount);
  state.title = title.name;
  saveState(state);

  const leveledUp = state.level > previousLevel;
  const titleChanged = title.name !== previousTitle;

  return {
    success: true,
    badge,
    xpGained: badge.xp,
    newXp: state.xp,
    newLevel: state.level,
    previousLevel,
    leveledUp,
    newTitle: titleChanged ? title.name : undefined,
    previousTitle,
  };
}

export function getObtainedCount(): number {
  return loadState().obtained.length;
}
