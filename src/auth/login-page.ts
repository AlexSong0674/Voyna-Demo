import { loginWithGoogle } from './firebase';

export function renderLoginPage(root: HTMLElement, _onSuccess: () => void): void {
  root.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <h1 class="brand">Voyna</h1>
        <p class="tagline">발걸음이 기록이 되고,<br/>기록이 추억이 된다</p>
        <button id="google-login" class="google-btn">
          <span class="g-icon">G</span> Google로 시작하기
        </button>
        <div id="login-err" class="login-err"></div>
        <p class="hint">데모용 빌드입니다.</p>
      </div>
    </div>
    <style>
      .login-page {
        min-height: 100vh; display: flex; align-items: center; justify-content: center;
        background: linear-gradient(160deg, #2a5cdc 0%, #1a3a8c 100%);
      }
      .login-card {
        background: white; padding: 40px 32px; border-radius: 20px; text-align: center;
        box-shadow: 0 12px 40px rgba(0,0,0,0.2); max-width: 360px; width: 90%;
      }
      .brand { font-size: 48px; margin: 0 0 12px; color: var(--voyna-primary); letter-spacing: -1px; }
      .tagline { color: var(--voyna-muted); margin: 0 0 32px; line-height: 1.5; }
      .google-btn {
        background: white; border: 1px solid #dadce0; border-radius: 8px;
        padding: 12px 20px; font-size: 16px; width: 100%;
        display: flex; align-items: center; justify-content: center; gap: 12px;
      }
      .google-btn:hover { background: #f8f9fa; }
      .google-btn:disabled { opacity: 0.7; cursor: wait; }
      .g-icon {
        width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, #4285f4, #34a853, #fbbc04, #ea4335);
        color: white; border-radius: 50%; font-weight: bold; font-size: 14px;
      }
      .login-err {
        margin-top: 16px; padding: 10px 12px; font-size: 12px; color: #b91c1c;
        background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;
        text-align: left; word-break: break-word; display: none;
        white-space: pre-wrap;
      }
      .login-err.show { display: block; }
      .hint { margin-top: 16px; font-size: 12px; color: var(--voyna-muted); }
    </style>
  `;

  const btn = document.getElementById('google-login') as HTMLButtonElement;
  const errBox = document.getElementById('login-err') as HTMLDivElement;

  btn.addEventListener('click', async () => {
    errBox.classList.remove('show');
    errBox.textContent = '';
    btn.disabled = true;
    btn.textContent = '로그인 중...';
    try {
      await loginWithGoogle((msg) => {
        errBox.textContent = msg;
        errBox.classList.add('show');
      });
      // Popup 성공 시: onAuthStateChanged가 router를 재초기화하도록 페이지를 새로고침
      // (가장 단순하고 견고한 방식)
      window.location.reload();
    } catch {
      btn.disabled = false;
      btn.innerHTML = '<span class="g-icon">G</span> Google로 시작하기';
    }
  });
}
