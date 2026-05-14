import type { Badge } from '@/core/catalog';

const GRADE_COLORS: Record<string, [string, string]> = {
  special: ['#d4a017', '#fff6d5'],
  rare:    ['#8e44ad', '#f3e8f8'],
  common:  ['#3498db', '#e3f2fd'],
  premier: ['#ff5252', '#ffe3e3'],
};

const LOCATION_EMOJI: Record<string, string> = {
  assist: '🎓',
  gyeongbok: '🏯',
  'n-seoul-tower': '🗼',
  cheongwadae: '🏛️',
  bukhansan: '⛰️',
  changdeok: '🏯',
  deoksu: '🏯',
  jongmyo: '🏯',
  changgyeong: '🏯',
  bukchon: '🏘️',
  'lotte-tower': '🏢',
  'banpo-hangang': '🌉',
  inwangsan: '⛰️',
  cheonggyesan: '⛰️',
  'national-museum': '🏛️',
  leeum: '🖼️',
  gwanghwamun: '🏛️',
  sungnyemun: '🏛️',
  insadong: '🎭',
  myeongdong: '🛍️',
  hongdae: '🎶',
  'garosu-gil': '🌳',
  'gangnam-station': '🏙️',
  itaewon: '🌐',
  'yeouido-hangang': '🌊',
  'jamsil-hangang': '🌊',
  'namsan-park': '🌲',
  'seoul-forest': '🌳',
  'gwangjang-market': '🍢',
  ddp: '🛸',
  'coex-byeolmadang': '📚',
};

export function badgeIconSVG(badge: Badge, locked: boolean = false): string {
  if (locked) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="#d1d5db" stroke="#9ca3af" stroke-width="2"/>
      <text x="50" y="64" text-anchor="middle" font-size="40">🔒</text>
    </svg>`;
  }
  const [outer, inner] = GRADE_COLORS[badge.grade] ?? GRADE_COLORS.common!;
  const emoji = LOCATION_EMOJI[badge.id] ?? '⭐';
  const gid = `g-${badge.id}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <radialGradient id="${gid}" cx="50%" cy="38%">
        <stop offset="0%" stop-color="${inner}"/>
        <stop offset="100%" stop-color="${outer}"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#${gid})" stroke="${outer}" stroke-width="3"/>
    <text x="50" y="64" text-anchor="middle" font-size="40">${emoji}</text>
  </svg>`;
}

export function badgeIconDataURI(badge: Badge, locked: boolean = false): string {
  const svg = badgeIconSVG(badge, locked).replace(/\s+/g, ' ').trim();
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/**
 * Returns the primary image source for a badge:
 * - polished + obtained: real PNG path (will fall back to SVG via onerror)
 * - not polished + obtained: SVG inline (no PNG attempt)
 * - locked: SVG inline locked icon
 */
export function badgeImageSrc(badge: Badge, obtained: boolean): { src: string; fallback: string } {
  if (!obtained) {
    const lockedSvg = badgeIconDataURI(badge, true);
    return { src: lockedSvg, fallback: lockedSvg };
  }
  const colorSvg = badgeIconDataURI(badge, false);
  if (badge.is_polished) {
    return { src: badge.image, fallback: colorSvg };
  }
  return { src: colorSvg, fallback: colorSvg };
}
