import { loadState } from '@/core/state';
import { xpToNextLevel } from '@/core/levels';
import { getBadge } from '@/core/catalog';
import { navigate } from '@/core/router';
import { badgeMedallionHTML } from '@/components/badge-icon';

export function renderHome(root: HTMLElement): void {
  const state = loadState();
  const xpInfo = xpToNextLevel(state.xp);
  const recent = [...state.obtained].slice(-3).reverse();

  root.innerHTML = `
    <header class="home-hero">
      <img class="avatar" src="${state.user?.photoURL || ''}" onerror="this.style.display='none'"/>
      <div>
        <div class="hello">안녕하세요, ${state.user?.displayName ?? '여행자'}님</div>
        <div class="title-line">🏆 ${state.title}</div>
      </div>
    </header>

    <section class="lv-card">
      <div class="lv-top">
        <span class="lv-num">Lv ${state.level}</span>
        <span class="lv-xp">${state.xp} XP</span>
      </div>
      <div class="lv-bar">
        <div class="lv-bar-fill" style="width:${Math.min(100, xpInfo.progress * 100).toFixed(1)}%"></div>
      </div>
      <div class="lv-bar-text">다음 레벨까지 ${xpInfo.nextThreshold - xpInfo.current} XP</div>
    </section>

    <section class="recent">
      <h2>최근 획득 배지</h2>
      <div class="recent-list">
        ${recent.length === 0
          ? '<p class="empty">아직 획득한 배지가 없어요. 맵 탭에서 탐험을 시작해보세요!</p>'
          : recent.map((o) => {
            const b = getBadge(o.badgeId);
            if (!b) {
              return `<div class="recent-item"><div><div class="r-name">${o.badgeId}</div></div></div>`;
            }
            return `
              <div class="recent-item">
                <div class="recent-medallion">${badgeMedallionHTML(b, true)}</div>
                <div>
                  <div class="r-name">${b.name}</div>
                  <div class="r-grade">${b.grade}</div>
                </div>
              </div>`;
          }).join('')}
      </div>
      <button class="cta" id="go-map">탐험 맵으로 이동</button>
    </section>

    <style>
      .home-hero { display:flex; align-items:center; gap:14px; margin-bottom:20px; }
      .avatar { width:56px; height:56px; border-radius:50%; }
      .hello { font-weight: 700; font-size: 18px; }
      .title-line { color: var(--voyna-muted); font-size: 13px; margin-top: 2px; }

      .lv-card {
        background: white; padding: 18px; border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px;
      }
      .lv-top { display: flex; justify-content: space-between; margin-bottom: 10px; }
      .lv-num { font-size: 22px; font-weight: 800; color: var(--voyna-primary); }
      .lv-xp { color: var(--voyna-muted); }
      .lv-bar { background: #e5e7eb; border-radius: 99px; height: 10px; overflow: hidden; }
      .lv-bar-fill { background: var(--voyna-primary); height: 100%; transition: width 0.4s; }
      .lv-bar-text { font-size: 12px; color: var(--voyna-muted); margin-top: 6px; }

      .recent h2 { font-size: 16px; margin-bottom: 12px; }
      .recent-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
      .recent-item {
        background: white; border-radius: 10px; padding: 10px;
        display: flex; gap: 12px; align-items: center;
      }
      .recent-medallion { width: 48px; flex-shrink: 0; }
      .r-name { font-weight: 600; }
      .r-grade { font-size: 12px; color: var(--voyna-muted); }
      .empty { color: var(--voyna-muted); font-size: 14px; }
      .cta {
        background: var(--voyna-primary); color: white; border: none;
        padding: 14px; width: 100%; border-radius: 10px; font-weight: 600; font-size: 16px;
      }
    </style>
  `;
  document.getElementById('go-map')!.addEventListener('click', () => navigate('map'));
}
