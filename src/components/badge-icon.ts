import type { Badge } from '@/core/catalog';

type GradeStyle = {
  borderOuter: string;
  borderInner: string;
  bg1: string;
  bg2: string;
  accent: string;
};

const GRADE_STYLES: Record<string, GradeStyle> = {
  special: {
    borderOuter: '#b8860b',
    borderInner: '#fbbf24',
    bg1: '#fff8dc',
    bg2: '#fef3c7',
    accent: '#b45309',
  },
  rare: {
    borderOuter: '#6b21a8',
    borderInner: '#a855f7',
    bg1: '#f5f3ff',
    bg2: '#ede9fe',
    accent: '#6b21a8',
  },
  common: {
    borderOuter: '#1e40af',
    borderInner: '#3b82f6',
    bg1: '#eff6ff',
    bg2: '#dbeafe',
    accent: '#1e40af',
  },
  premier: {
    borderOuter: '#b91c1c',
    borderInner: '#ef4444',
    bg1: '#fef2f2',
    bg2: '#fee2e2',
    accent: '#991b1b',
  },
};

/** Centered illustrations per badge id. Each illustration uses the 100x100 viewBox, centered at (50, 50). */
function illustrationFor(id: string, accent: string): string {
  switch (id) {
    case 'assist':
      // graduation cap on top of an open book
      return `
        <g>
          <!-- open book -->
          <path d="M 25 62 Q 35 55 50 58 Q 65 55 75 62 L 75 74 Q 65 67 50 70 Q 35 67 25 74 Z" fill="#ffffff" stroke="${accent}" stroke-width="1.5"/>
          <line x1="50" y1="58" x2="50" y2="70" stroke="${accent}" stroke-width="1.2"/>
          <!-- mortarboard cap -->
          <rect x="38" y="44" width="24" height="4" fill="${accent}"/>
          <polygon points="28,44 72,44 50,36" fill="${accent}"/>
          <!-- tassel -->
          <line x1="60" y1="44" x2="66" y2="52" stroke="#fbbf24" stroke-width="1.5"/>
          <circle cx="66" cy="53" r="2.2" fill="#fbbf24"/>
        </g>`;

    case 'gyeongbok':
    case 'changdeok':
    case 'deoksu':
    case 'jongmyo':
    case 'changgyeong':
      // hanok palace roof
      return `
        <g>
          <!-- curved roof -->
          <path d="M 20 50 Q 30 32 50 28 Q 70 32 80 50 L 76 52 Q 50 38 24 52 Z" fill="${accent}" stroke="${accent}" stroke-width="1"/>
          <line x1="50" y1="28" x2="50" y2="24" stroke="${accent}" stroke-width="2"/>
          <circle cx="50" cy="22" r="2" fill="${accent}"/>
          <!-- pillars + base -->
          <rect x="28" y="52" width="44" height="3" fill="${accent}" opacity="0.85"/>
          <rect x="32" y="55" width="4" height="14" fill="${accent}"/>
          <rect x="48" y="55" width="4" height="14" fill="${accent}"/>
          <rect x="64" y="55" width="4" height="14" fill="${accent}"/>
          <rect x="26" y="69" width="48" height="3" fill="${accent}" opacity="0.7"/>
        </g>`;

    case 'n-seoul-tower':
    case 'namsan-park':
      // N Seoul Tower silhouette
      return `
        <g>
          <!-- mountain base -->
          <path d="M 18 76 Q 35 66 50 64 Q 65 66 82 76 Z" fill="${accent}" opacity="0.45"/>
          <!-- tower -->
          <rect x="48" y="62" width="4" height="2" fill="${accent}"/>
          <polygon points="44,58 56,58 50,42" fill="${accent}"/>
          <rect x="46" y="42" width="8" height="6" fill="${accent}"/>
          <line x1="50" y1="42" x2="50" y2="28" stroke="${accent}" stroke-width="2"/>
          <circle cx="50" cy="26" r="2.2" fill="${accent}"/>
          <line x1="50" y1="42" x2="46" y2="36" stroke="${accent}" stroke-width="1.2"/>
          <line x1="50" y1="42" x2="54" y2="36" stroke="${accent}" stroke-width="1.2"/>
        </g>`;

    case 'cheongwadae':
      // three blue-tile hanok roofs
      return `
        <g>
          <!-- main center roof -->
          <path d="M 28 50 Q 50 28 72 50 L 68 52 Q 50 38 32 52 Z" fill="#1e3a8a"/>
          <path d="M 28 50 Q 50 28 72 50 L 68 52 Q 50 38 32 52 Z" fill="url(#cw-tile)" opacity="0.4"/>
          <!-- side roofs -->
          <path d="M 18 58 Q 28 48 38 58 L 36 60 Q 28 54 20 60 Z" fill="#1e3a8a" opacity="0.85"/>
          <path d="M 62 58 Q 72 48 82 58 L 80 60 Q 72 54 64 60 Z" fill="#1e3a8a" opacity="0.85"/>
          <!-- pillar block -->
          <rect x="34" y="52" width="32" height="18" fill="${accent}" opacity="0.85"/>
          <rect x="46" y="58" width="8" height="12" fill="#ffffff"/>
        </g>
        <defs><linearGradient id="cw-tile" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#60a5fa"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient></defs>`;

    case 'bukhansan':
    case 'inwangsan':
    case 'cheonggyesan':
      // craggy mountain peak with pine
      return `
        <g>
          <!-- back peak -->
          <polygon points="22,72 42,38 56,58" fill="${accent}" opacity="0.55"/>
          <!-- front main peak -->
          <polygon points="32,72 58,28 78,72" fill="${accent}"/>
          <!-- snow cap -->
          <polygon points="55,34 58,28 61,34 58,40" fill="#ffffff"/>
          <!-- pine tree -->
          <polygon points="40,64 36,72 44,72" fill="#15803d"/>
          <polygon points="40,58 35,68 45,68" fill="#15803d"/>
          <rect x="39" y="72" width="2" height="3" fill="#78350f"/>
        </g>`;

    case 'lotte-tower':
      // tall tapered skyscraper
      return `
        <g>
          <polygon points="42,72 58,72 54,28 50,22 46,28" fill="${accent}"/>
          <line x1="50" y1="22" x2="50" y2="14" stroke="${accent}" stroke-width="2"/>
          <circle cx="50" cy="14" r="2" fill="${accent}"/>
          <!-- windows -->
          <line x1="46" y1="32" x2="54" y2="32" stroke="#ffffff" stroke-width="1.2"/>
          <line x1="45" y1="42" x2="55" y2="42" stroke="#ffffff" stroke-width="1.2"/>
          <line x1="44" y1="52" x2="56" y2="52" stroke="#ffffff" stroke-width="1.2"/>
          <line x1="43" y1="62" x2="57" y2="62" stroke="#ffffff" stroke-width="1.2"/>
        </g>`;

    case 'banpo-hangang':
    case 'yeouido-hangang':
    case 'jamsil-hangang':
      // bridge arches over wavy river
      return `
        <g>
          <!-- sun -->
          <circle cx="50" cy="32" r="9" fill="#fbbf24"/>
          <circle cx="50" cy="32" r="9" fill="url(#sun-glow)" opacity="0.7"/>
          <!-- bridge deck -->
          <line x1="22" y1="50" x2="78" y2="50" stroke="${accent}" stroke-width="3"/>
          <!-- bridge piers -->
          <line x1="32" y1="50" x2="32" y2="64" stroke="${accent}" stroke-width="2"/>
          <line x1="50" y1="50" x2="50" y2="64" stroke="${accent}" stroke-width="2"/>
          <line x1="68" y1="50" x2="68" y2="64" stroke="${accent}" stroke-width="2"/>
          <!-- water -->
          <path d="M 22 64 Q 30 60 38 64 Q 46 68 54 64 Q 62 60 70 64 Q 76 67 78 64 L 78 76 L 22 76 Z" fill="#60a5fa" opacity="0.7"/>
        </g>
        <defs><radialGradient id="sun-glow"><stop offset="0" stop-color="#fef9c3"/><stop offset="1" stop-color="#fbbf24" stop-opacity="0"/></radialGradient></defs>`;

    case 'myeongdong':
    case 'insadong':
    case 'hongdae':
    case 'garosu-gil':
    case 'itaewon':
      // shopping bag with handles
      return `
        <g>
          <!-- handles -->
          <path d="M 40 34 Q 40 24 50 24 Q 60 24 60 34" fill="none" stroke="${accent}" stroke-width="2.5"/>
          <!-- bag body -->
          <path d="M 30 36 L 70 36 L 66 76 L 34 76 Z" fill="${accent}"/>
          <!-- highlight -->
          <path d="M 30 36 L 70 36 L 68 44 L 32 44 Z" fill="#ffffff" opacity="0.3"/>
          <!-- ribbon -->
          <rect x="44" y="52" width="12" height="14" fill="#ffffff" opacity="0.7"/>
          <rect x="48" y="48" width="4" height="22" fill="#ffffff" opacity="0.7"/>
        </g>`;

    case 'gwanghwamun':
    case 'sungnyemun':
      // traditional Korean gate with archway
      return `
        <g>
          <!-- upper roof -->
          <path d="M 20 46 Q 50 30 80 46 L 76 48 Q 50 36 24 48 Z" fill="${accent}"/>
          <!-- mid wall -->
          <rect x="26" y="48" width="48" height="4" fill="${accent}" opacity="0.8"/>
          <!-- second tier roof -->
          <path d="M 28 60 Q 50 48 72 60 L 68 62 Q 50 52 32 62 Z" fill="${accent}" opacity="0.9"/>
          <!-- base wall + archway -->
          <rect x="26" y="62" width="48" height="14" fill="${accent}" opacity="0.85"/>
          <path d="M 44 76 L 44 70 Q 44 66 50 66 Q 56 66 56 70 L 56 76 Z" fill="#ffffff"/>
          <!-- finial -->
          <circle cx="50" cy="30" r="2" fill="${accent}"/>
        </g>`;

    case 'bukchon':
      // hanok village rooftops
      return `
        <g>
          <path d="M 18 56 Q 28 44 38 56 L 36 58 Q 28 50 20 58 Z" fill="${accent}" opacity="0.85"/>
          <path d="M 30 64 Q 50 46 70 64 L 67 66 Q 50 54 33 66 Z" fill="${accent}"/>
          <path d="M 62 60 Q 72 48 82 60 L 80 62 Q 72 54 64 62 Z" fill="${accent}" opacity="0.85"/>
          <rect x="22" y="58" width="56" height="14" fill="${accent}" opacity="0.55"/>
          <rect x="42" y="64" width="6" height="8" fill="#ffffff" opacity="0.85"/>
          <rect x="52" y="64" width="6" height="8" fill="#ffffff" opacity="0.85"/>
        </g>`;

    case 'national-museum':
    case 'leeum':
      // museum facade
      return `
        <g>
          <polygon points="22,46 50,28 78,46 78,50 22,50" fill="${accent}"/>
          <rect x="28" y="50" width="44" height="24" fill="${accent}" opacity="0.85"/>
          <!-- columns -->
          <rect x="32" y="52" width="3" height="20" fill="#ffffff" opacity="0.75"/>
          <rect x="42" y="52" width="3" height="20" fill="#ffffff" opacity="0.75"/>
          <rect x="55" y="52" width="3" height="20" fill="#ffffff" opacity="0.75"/>
          <rect x="65" y="52" width="3" height="20" fill="#ffffff" opacity="0.75"/>
        </g>`;

    case 'gangnam-station':
    case 'ddp':
    case 'coex-byeolmadang':
      // modern building / urban
      return `
        <g>
          <rect x="34" y="32" width="32" height="44" fill="${accent}"/>
          <rect x="38" y="38" width="6" height="6" fill="#ffffff" opacity="0.85"/>
          <rect x="48" y="38" width="6" height="6" fill="#ffffff" opacity="0.85"/>
          <rect x="58" y="38" width="6" height="6" fill="#ffffff" opacity="0.85"/>
          <rect x="38" y="48" width="6" height="6" fill="#ffffff" opacity="0.85"/>
          <rect x="48" y="48" width="6" height="6" fill="#ffffff" opacity="0.85"/>
          <rect x="58" y="48" width="6" height="6" fill="#ffffff" opacity="0.85"/>
          <rect x="38" y="58" width="6" height="6" fill="#ffffff" opacity="0.85"/>
          <rect x="48" y="58" width="6" height="6" fill="#ffffff" opacity="0.85"/>
          <rect x="58" y="58" width="6" height="6" fill="#ffffff" opacity="0.85"/>
        </g>`;

    case 'gwangjang-market':
      // food / market — bowl with chopsticks
      return `
        <g>
          <path d="M 26 50 Q 50 48 74 50 Q 70 70 50 72 Q 30 70 26 50 Z" fill="${accent}"/>
          <ellipse cx="50" cy="50" rx="24" ry="4" fill="#ffffff" opacity="0.55"/>
          <line x1="60" y1="32" x2="68" y2="50" stroke="${accent}" stroke-width="2"/>
          <line x1="66" y1="32" x2="72" y2="50" stroke="${accent}" stroke-width="2"/>
        </g>`;

    case 'seoul-forest':
      // forest trees
      return `
        <g>
          <polygon points="34,62 26,76 42,76" fill="#166534"/>
          <polygon points="34,54 28,72 40,72" fill="#16a34a"/>
          <rect x="33" y="76" width="2" height="3" fill="#78350f"/>
          <polygon points="66,62 58,76 74,76" fill="#166534"/>
          <polygon points="66,54 60,72 72,72" fill="#16a34a"/>
          <rect x="65" y="76" width="2" height="3" fill="#78350f"/>
          <polygon points="50,52 42,72 58,72" fill="#15803d"/>
          <polygon points="50,40 40,68 60,68" fill="#22c55e"/>
          <rect x="49" y="72" width="2" height="4" fill="#78350f"/>
        </g>`;

    default:
      // generic compass star
      return `
        <g>
          <polygon points="50,28 56,46 74,50 56,54 50,72 44,54 26,50 44,46" fill="${accent}"/>
        </g>`;
  }
}

export function badgeIconSVG(badge: Badge, locked: boolean = false): string {
  if (locked) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="lk-bg" cx="50%" cy="40%">
          <stop offset="0" stop-color="#f3f4f6"/>
          <stop offset="1" stop-color="#9ca3af"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#lk-bg)" stroke="#6b7280" stroke-width="3"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#9ca3af" stroke-width="1" stroke-dasharray="2 3"/>
      <!-- padlock shackle -->
      <path d="M 40 48 V 42 a 10 10 0 0 1 20 0 V 48" fill="none" stroke="#4b5563" stroke-width="3.5"/>
      <!-- padlock body -->
      <rect x="36" y="48" width="28" height="22" rx="3" fill="#4b5563"/>
      <circle cx="50" cy="58" r="2.5" fill="#e5e7eb"/>
      <rect x="49" y="59" width="2" height="6" fill="#e5e7eb"/>
    </svg>`;
  }
  const style = GRADE_STYLES[badge.grade] ?? GRADE_STYLES.common!;
  const gid = `bg-${badge.id}`;
  const ring = `ring-${badge.id}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <radialGradient id="${gid}" cx="50%" cy="40%">
        <stop offset="0%" stop-color="${style.bg1}"/>
        <stop offset="100%" stop-color="${style.bg2}"/>
      </radialGradient>
      <linearGradient id="${ring}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${style.borderInner}"/>
        <stop offset="50%" stop-color="${style.borderOuter}"/>
        <stop offset="100%" stop-color="${style.borderInner}"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#${ring})"/>
    <circle cx="50" cy="50" r="43" fill="url(#${gid})"/>
    <circle cx="50" cy="50" r="43" fill="none" stroke="${style.borderOuter}" stroke-width="0.8" opacity="0.7"/>
    ${illustrationFor(badge.id, style.accent)}
    <!-- shine highlight -->
    <ellipse cx="38" cy="28" rx="14" ry="6" fill="#ffffff" opacity="0.35"/>
  </svg>`;
}

export function badgeIconDataURI(badge: Badge, locked: boolean = false): string {
  const svg = badgeIconSVG(badge, locked).replace(/\s+/g, ' ').trim();
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/**
 * Returns the primary image source for a badge:
 * - obtained: rich SVG illustration (with optional real PNG override)
 * - locked: gray padlock SVG
 */
export function badgeImageSrc(badge: Badge, obtained: boolean): { src: string; fallback: string } {
  if (!obtained) {
    const lockedSvg = badgeIconDataURI(badge, true);
    return { src: lockedSvg, fallback: lockedSvg };
  }
  const richSvg = badgeIconDataURI(badge, false);
  // If user provides a real PNG (is_polished + file exists), use it; otherwise rich SVG.
  if (badge.is_polished) {
    return { src: badge.image, fallback: richSvg };
  }
  return { src: richSvg, fallback: richSvg };
}
