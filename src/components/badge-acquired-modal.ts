import type { Badge } from '@/core/catalog';
import { badgeImageSrc } from './badge-icon';

const GRADE_STYLE: Record<string, { color: string; label: string; glow: string }> = {
  special: { color: '#d4a017', label: '특별', glow: '0 0 60px rgba(212,160,23,0.7)' },
  rare:    { color: '#8e44ad', label: '희귀', glow: '0 0 50px rgba(142,68,173,0.6)' },
  common:  { color: '#3498db', label: '일반', glow: '0 0 40px rgba(52,152,219,0.5)' },
  premier: { color: '#ff5252', label: '프리미어', glow: '0 0 80px rgba(255,82,82,0.8)' },
};

export function showBadgeAcquired(badge: Badge): Promise<void> {
  return new Promise((resolve) => {
    const style = GRADE_STYLE[badge.grade] ?? GRADE_STYLE.common!;
    const { src, fallback } = badgeImageSrc(badge, true);
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="modal badge-acquired" style="border:3px solid ${style.color}; box-shadow: ${style.glow}, 0 12px 40px rgba(0,0,0,0.3);">
        <div class="ba-grade" style="color:${style.color}">✨ ${style.label} 배지 획득 ✨</div>
        <img src="${src}" alt="${badge.name}" class="ba-img"
             onerror="this.onerror=null; this.src='${fallback}'"/>
        <h2 class="ba-name">${badge.name}</h2>
        <p class="ba-desc">${badge.description}</p>
        <div class="ba-xp">+${badge.xp} XP</div>
        <button class="ba-close">확인</button>
      </div>
      <style>
        .badge-acquired { padding: 32px 28px; max-width: 320px; }
        .ba-grade { font-size: 14px; font-weight: 700; letter-spacing: 1px; margin-bottom: 12px; }
        .ba-img {
          width: 140px; height: 140px; border-radius: 50%; margin: 16px 0;
          animation: rotate-in 0.8s ease-out;
        }
        .ba-name { margin: 8px 0; font-size: 22px; }
        .ba-desc { color: var(--voyna-muted); margin: 4px 0 16px; font-size: 14px; }
        .ba-xp {
          font-weight: 700; color: var(--voyna-primary); font-size: 20px;
          margin-bottom: 20px; animation: pulse 0.6s ease-out;
        }
        .ba-close {
          background: var(--voyna-primary); color: white; border: none;
          padding: 12px 28px; border-radius: 999px; font-weight: 600;
        }
        @keyframes rotate-in {
          from { transform: scale(0.3) rotate(-180deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(0.8); } 50% { transform: scale(1.2); } 100% { transform: scale(1); }
        }
      </style>
    `;
    document.body.appendChild(backdrop);
    const close = () => { backdrop.remove(); resolve(); };
    backdrop.querySelector('.ba-close')!.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
  });
}
