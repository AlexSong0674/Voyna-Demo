import { loginWithGoogle } from './firebase';

export function renderLoginPage(root: HTMLElement, onSuccess: () => void): void {
  root.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <h1 class="brand">Voyna</h1>
        <p class="tagline">발걸음이 기록이 되고,<br/>기록이 추억이 된다</p>
        <button id="google-login" class="google-btn">
          <span class="g-icon">G</span> Google로 시작하기
        </button>
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
      .g-icon {
        width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, #4285f4, #34a853, #fbbc04, #ea4335);
        color: white; border-radius: 50%; font-weight: bold; font-size: 14px;
      }
      .hint { margin-top: 16px; font-size: 12px; color: var(--voyna-muted); }
    </style>
  `;

  document.getElementById('google-login')!.addEventListener('click', async () => {
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (e) {
      alert('로그인 실패: ' + (e as Error).message);
    }
  });
}
