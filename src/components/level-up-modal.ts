export function showLevelUp(prev: number, next: number): Promise<void> {
  return new Promise((resolve) => {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="modal level-up">
        <div class="lu-confetti">🎉</div>
        <div class="lu-label">LEVEL UP!</div>
        <div class="lu-numbers">
          <span class="lu-prev">Lv ${prev}</span>
          <span class="lu-arrow">→</span>
          <span class="lu-next">Lv ${next}</span>
        </div>
        <button class="lu-close">계속</button>
      </div>
      <style>
        .level-up { padding: 32px; min-width: 280px; }
        .lu-confetti { font-size: 48px; margin-bottom: 12px; animation: bounce 1s infinite; }
        .lu-label {
          font-size: 14px; font-weight: 800; color: var(--voyna-primary);
          letter-spacing: 3px; margin-bottom: 16px;
        }
        .lu-numbers { font-size: 32px; font-weight: 700; margin-bottom: 24px; }
        .lu-prev { color: var(--voyna-muted); }
        .lu-arrow { margin: 0 12px; color: var(--voyna-primary); }
        .lu-next { color: var(--voyna-primary); animation: glow 1s ease-out; }
        .lu-close {
          background: var(--voyna-primary); color: white; border: none;
          padding: 12px 32px; border-radius: 999px; font-weight: 600;
        }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes glow {
          from { text-shadow: 0 0 30px var(--voyna-primary); transform: scale(1.4); }
          to { text-shadow: none; transform: scale(1); }
        }
      </style>
    `;
    document.body.appendChild(backdrop);
    const close = () => { backdrop.remove(); resolve(); };
    backdrop.querySelector('.lu-close')!.addEventListener('click', close);
  });
}
