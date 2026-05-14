import { getBadges } from '@/core/catalog';
import { loadState } from '@/core/state';
import { badgeImageSrc } from '@/components/badge-icon';

const GRADE_ORDER = { special: 0, premier: 1, rare: 2, common: 3 } as const;
const GRADE_COLOR: Record<string, string> = {
  special: '#d4a017', rare: '#8e44ad', common: '#3498db', premier: '#ff5252',
};

export function renderBadges(root: HTMLElement): void {
  const state = loadState();
  const obtained = new Set(state.obtained.map((o) => o.badgeId));
  const badges = [...getBadges()].sort((a, b) => {
    const ga = GRADE_ORDER[a.grade as keyof typeof GRADE_ORDER] ?? 9;
    const gb = GRADE_ORDER[b.grade as keyof typeof GRADE_ORDER] ?? 9;
    return ga - gb || a.name.localeCompare(b.name);
  });
  const collected = badges.filter((b) => obtained.has(b.id)).length;

  root.innerHTML = `
    <header class="bg-header">
      <h1>배지 컬렉션</h1>
      <div class="bg-progress">${collected} / ${badges.length}</div>
    </header>
    <div class="bg-grid">
      ${badges.map((b) => {
        const got = obtained.has(b.id);
        const { src, fallback } = badgeImageSrc(b, got);
        return `
          <div class="bg-card ${got ? 'got' : 'locked'}">
            <img src="${src}"
                 onerror="this.onerror=null; this.src='${fallback}'"/>
            <div class="bg-name">${got ? b.name : '???'}</div>
            <div class="bg-grade" style="color:${got ? GRADE_COLOR[b.grade] : '#9ca3af'}">${b.grade}</div>
          </div>`;
      }).join('')}
    </div>
    <style>
      .bg-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
      .bg-header h1 { margin: 0; font-size: 20px; }
      .bg-progress { color: var(--voyna-primary); font-weight: 700; }
      .bg-grid {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
      }
      .bg-card {
        background: white; border-radius: 12px; padding: 12px;
        text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      }
      .bg-card img { width: 64px; height: 64px; border-radius: 50%; margin-bottom: 6px; display: block; margin-left: auto; margin-right: auto; }
      .bg-card.locked { opacity: 0.85; }
      .bg-name { font-size: 12px; font-weight: 600; line-height: 1.2; min-height: 28px; }
      .bg-grade { font-size: 10px; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
    </style>
  `;
}
