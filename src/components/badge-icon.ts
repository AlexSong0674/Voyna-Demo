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

/** SVG-only fallback illustration for each badge (used when no photo is available). */
function illustrationFor(id: string, accent: string): string {
  switch (id) {
    case 'assist':
      return `<g>
        <path d="M 25 62 Q 35 55 50 58 Q 65 55 75 62 L 75 74 Q 65 67 50 70 Q 35 67 25 74 Z" fill="#ffffff" stroke="${accent}" stroke-width="1.5"/>
        <line x1="50" y1="58" x2="50" y2="70" stroke="${accent}" stroke-width="1.2"/>
        <rect x="38" y="44" width="24" height="4" fill="${accent}"/>
        <polygon points="28,44 72,44 50,36" fill="${accent}"/>
        <line x1="60" y1="44" x2="66" y2="52" stroke="#fbbf24" stroke-width="1.5"/>
        <circle cx="66" cy="53" r="2.2" fill="#fbbf24"/>
      </g>`;
    case 'gyeongbok':
    case 'changdeok':
    case 'deoksu':
    case 'jongmyo':
    case 'changgyeong':
      return `<g>
        <path d="M 20 50 Q 30 32 50 28 Q 70 32 80 50 L 76 52 Q 50 38 24 52 Z" fill="${accent}" stroke="${accent}" stroke-width="1"/>
        <line x1="50" y1="28" x2="50" y2="24" stroke="${accent}" stroke-width="2"/>
        <circle cx="50" cy="22" r="2" fill="${accent}"/>
        <rect x="28" y="52" width="44" height="3" fill="${accent}" opacity="0.85"/>
        <rect x="32" y="55" width="4" height="14" fill="${accent}"/>
        <rect x="48" y="55" width="4" height="14" fill="${accent}"/>
        <rect x="64" y="55" width="4" height="14" fill="${accent}"/>
        <rect x="26" y="69" width="48" height="3" fill="${accent}" opacity="0.7"/>
      </g>`;
    case 'n-seoul-tower':
    case 'namsan-park':
      return `<g>
        <path d="M 18 76 Q 35 66 50 64 Q 65 66 82 76 Z" fill="${accent}" opacity="0.45"/>
        <rect x="48" y="62" width="4" height="2" fill="${accent}"/>
        <polygon points="44,58 56,58 50,42" fill="${accent}"/>
        <rect x="46" y="42" width="8" height="6" fill="${accent}"/>
        <line x1="50" y1="42" x2="50" y2="28" stroke="${accent}" stroke-width="2"/>
        <circle cx="50" cy="26" r="2.2" fill="${accent}"/>
      </g>`;
    case 'cheongwadae':
      return `<g>
        <path d="M 28 50 Q 50 28 72 50 L 68 52 Q 50 38 32 52 Z" fill="#1e3a8a"/>
        <path d="M 18 58 Q 28 48 38 58 L 36 60 Q 28 54 20 60 Z" fill="#1e3a8a" opacity="0.85"/>
        <path d="M 62 58 Q 72 48 82 58 L 80 60 Q 72 54 64 60 Z" fill="#1e3a8a" opacity="0.85"/>
        <rect x="34" y="52" width="32" height="18" fill="${accent}" opacity="0.85"/>
        <rect x="46" y="58" width="8" height="12" fill="#ffffff"/>
      </g>`;
    case 'bukhansan':
    case 'inwangsan':
    case 'cheonggyesan':
      return `<g>
        <polygon points="22,72 42,38 56,58" fill="${accent}" opacity="0.55"/>
        <polygon points="32,72 58,28 78,72" fill="${accent}"/>
        <polygon points="55,34 58,28 61,34 58,40" fill="#ffffff"/>
        <polygon points="40,64 36,72 44,72" fill="#15803d"/>
        <polygon points="40,58 35,68 45,68" fill="#15803d"/>
      </g>`;
    case 'lotte-tower':
      return `<g>
        <polygon points="42,72 58,72 54,28 50,22 46,28" fill="${accent}"/>
        <line x1="50" y1="22" x2="50" y2="14" stroke="${accent}" stroke-width="2"/>
        <circle cx="50" cy="14" r="2" fill="${accent}"/>
        <line x1="46" y1="32" x2="54" y2="32" stroke="#ffffff" stroke-width="1.2"/>
        <line x1="45" y1="42" x2="55" y2="42" stroke="#ffffff" stroke-width="1.2"/>
        <line x1="44" y1="52" x2="56" y2="52" stroke="#ffffff" stroke-width="1.2"/>
        <line x1="43" y1="62" x2="57" y2="62" stroke="#ffffff" stroke-width="1.2"/>
      </g>`;
    case 'banpo-hangang':
    case 'yeouido-hangang':
    case 'jamsil-hangang':
      return `<g>
        <circle cx="50" cy="32" r="9" fill="#fbbf24"/>
        <line x1="22" y1="50" x2="78" y2="50" stroke="${accent}" stroke-width="3"/>
        <line x1="32" y1="50" x2="32" y2="64" stroke="${accent}" stroke-width="2"/>
        <line x1="50" y1="50" x2="50" y2="64" stroke="${accent}" stroke-width="2"/>
        <line x1="68" y1="50" x2="68" y2="64" stroke="${accent}" stroke-width="2"/>
        <path d="M 22 64 Q 30 60 38 64 Q 46 68 54 64 Q 62 60 70 64 Q 76 67 78 64 L 78 76 L 22 76 Z" fill="#60a5fa" opacity="0.7"/>
      </g>`;
    case 'myeongdong':
    case 'insadong':
    case 'hongdae':
    case 'garosu-gil':
    case 'itaewon':
      return `<g>
        <path d="M 40 34 Q 40 24 50 24 Q 60 24 60 34" fill="none" stroke="${accent}" stroke-width="2.5"/>
        <path d="M 30 36 L 70 36 L 66 76 L 34 76 Z" fill="${accent}"/>
        <rect x="44" y="52" width="12" height="14" fill="#ffffff" opacity="0.7"/>
        <rect x="48" y="48" width="4" height="22" fill="#ffffff" opacity="0.7"/>
      </g>`;
    case 'gwanghwamun':
    case 'sungnyemun':
      return `<g>
        <path d="M 20 46 Q 50 30 80 46 L 76 48 Q 50 36 24 48 Z" fill="${accent}"/>
        <rect x="26" y="48" width="48" height="4" fill="${accent}" opacity="0.8"/>
        <path d="M 28 60 Q 50 48 72 60 L 68 62 Q 50 52 32 62 Z" fill="${accent}" opacity="0.9"/>
        <rect x="26" y="62" width="48" height="14" fill="${accent}" opacity="0.85"/>
        <path d="M 44 76 L 44 70 Q 44 66 50 66 Q 56 66 56 70 L 56 76 Z" fill="#ffffff"/>
      </g>`;
    case 'bukchon':
      return `<g>
        <path d="M 18 56 Q 28 44 38 56 L 36 58 Q 28 50 20 58 Z" fill="${accent}" opacity="0.85"/>
        <path d="M 30 64 Q 50 46 70 64 L 67 66 Q 50 54 33 66 Z" fill="${accent}"/>
        <path d="M 62 60 Q 72 48 82 60 L 80 62 Q 72 54 64 62 Z" fill="${accent}" opacity="0.85"/>
        <rect x="22" y="58" width="56" height="14" fill="${accent}" opacity="0.55"/>
      </g>`;
    case 'national-museum':
    case 'leeum':
      return `<g>
        <polygon points="22,46 50,28 78,46 78,50 22,50" fill="${accent}"/>
        <rect x="28" y="50" width="44" height="24" fill="${accent}" opacity="0.85"/>
        <rect x="32" y="52" width="3" height="20" fill="#ffffff" opacity="0.75"/>
        <rect x="42" y="52" width="3" height="20" fill="#ffffff" opacity="0.75"/>
        <rect x="55" y="52" width="3" height="20" fill="#ffffff" opacity="0.75"/>
        <rect x="65" y="52" width="3" height="20" fill="#ffffff" opacity="0.75"/>
      </g>`;
    case 'gangnam-station':
    case 'ddp':
    case 'coex-byeolmadang':
      return `<g>
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
      return `<g>
        <path d="M 26 50 Q 50 48 74 50 Q 70 70 50 72 Q 30 70 26 50 Z" fill="${accent}"/>
        <ellipse cx="50" cy="50" rx="24" ry="4" fill="#ffffff" opacity="0.55"/>
        <line x1="60" y1="32" x2="68" y2="50" stroke="${accent}" stroke-width="2"/>
        <line x1="66" y1="32" x2="72" y2="50" stroke="${accent}" stroke-width="2"/>
      </g>`;
    case 'seoul-forest':
      return `<g>
        <polygon points="34,62 26,76 42,76" fill="#166534"/>
        <polygon points="34,54 28,72 40,72" fill="#16a34a"/>
        <polygon points="66,62 58,76 74,76" fill="#166534"/>
        <polygon points="66,54 60,72 72,72" fill="#16a34a"/>
        <polygon points="50,52 42,72 58,72" fill="#15803d"/>
        <polygon points="50,40 40,68 60,68" fill="#22c55e"/>
      </g>`;
    default:
      return `<g><polygon points="50,28 56,46 74,50 56,54 50,72 44,54 26,50 44,46" fill="${accent}"/></g>`;
  }
}

/**
 * Inner SVG illustration (used as fallback when no photo is available).
 * Sized to fit inside the medallion's inner circle.
 */
export function illustrationSVGContent(badge: Badge): string {
  const style = GRADE_STYLES[badge.grade] ?? GRADE_STYLES.common!;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="medallion-illust">
    <defs>
      <radialGradient id="bg-${badge.id}" cx="50%" cy="40%">
        <stop offset="0%" stop-color="${style.bg1}"/>
        <stop offset="100%" stop-color="${style.bg2}"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#bg-${badge.id})"/>
    ${illustrationFor(badge.id, style.accent)}
  </svg>`;
}

/**
 * Renders a complete medallion HTML block for innerHTML insertion.
 * - Always shows the badge's own design (photo if available, else illustration)
 * - When locked: keeps grade-colored ring but applies grayscale + lock overlay via CSS
 * - Caller must include `.medallion` CSS rules (added to main.css).
 */
export function badgeMedallionHTML(badge: Badge, obtained: boolean, size?: number): string {
  const sizeAttr = size ? `style="width:${size}px;height:${size}px"` : '';
  const gradeClass = `grade-${badge.grade}`;
  const lockedClass = obtained ? '' : 'locked';
  const illust = illustrationSVGContent(badge);
  const escapedFallback = illust.replace(/'/g, "\\'").replace(/\n/g, '');
  if (badge.is_polished) {
    return `<div class="medallion ${gradeClass} ${lockedClass}" ${sizeAttr}>
      <img class="medallion-photo" src="${badge.image}" alt="${badge.name}"
           onerror="this.outerHTML='${escapedFallback}'"/>
    </div>`;
  }
  return `<div class="medallion ${gradeClass} ${lockedClass}" ${sizeAttr}>${illust}</div>`;
}

// Backwards-compatible helpers that some callers may still use.
export function badgeImageSrc(badge: Badge, obtained: boolean): { src: string; fallback: string } {
  const svgFor = (b: Badge) =>
    'data:image/svg+xml;utf8,' + encodeURIComponent(illustrationSVGContent(b).replace(/\s+/g, ' ').trim());
  if (!obtained) {
    const s = svgFor(badge);
    return { src: s, fallback: s };
  }
  const illust = svgFor(badge);
  if (badge.is_polished) {
    return { src: badge.image, fallback: illust };
  }
  return { src: illust, fallback: illust };
}
