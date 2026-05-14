import { getBadges, getLocation } from '@/core/catalog';
import { loadState } from '@/core/state';
import { badgeMedallionHTML } from '@/components/badge-icon';

const GRADE_ORDER = { special: 0, premier: 1, rare: 2, common: 3 } as const;
const GRADE_COLOR: Record<string, string> = {
  special: '#d4a017', rare: '#8e44ad', common: '#3498db', premier: '#ff5252',
};
const GRADE_LABEL: Record<string, string> = {
  special: '특별', rare: '희귀', common: '일반', premier: '프리미어',
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
        const loc = getLocation(b.id);
        const place = loc?.name ?? b.name;
        return `
          <div class="bg-card ${got ? 'got' : 'locked'}">
            <div class="bg-medallion-wrap">${badgeMedallionHTML(b, got)}</div>
            <div class="bg-place">${place}</div>
            ${got ? `<div class="bg-tagline">${b.name}</div>` : `<div class="bg-tagline locked-tag">잠김</div>`}
            <div class="bg-grade" style="color:${got ? GRADE_COLOR[b.grade] : '#9ca3af'}">${GRADE_LABEL[b.grade] ?? b.grade}</div>
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
        background: white; border-radius: 12px; padding: 12px 8px;
        text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        display: flex; flex-direction: column; align-items: center;
      }
      .bg-medallion-wrap { width: 72px; margin-bottom: 8px; }
      .bg-card.locked { opacity: 0.95; }
      .bg-place {
        font-size: 13px; font-weight: 700; line-height: 1.2;
        color: var(--voyna-text); min-height: 16px;
      }
      .bg-card.locked .bg-place { color: var(--voyna-muted); }
      .bg-tagline {
        font-size: 11px; color: var(--voyna-muted);
        margin-top: 2px; line-height: 1.2; min-height: 14px;
      }
      .bg-tagline.locked-tag { color: #9ca3af; font-style: italic; }
      .bg-grade {
        font-size: 10px; margin-top: 4px;
        font-weight: 600; letter-spacing: 0.3px;
      }
    </style>
  `;
}
