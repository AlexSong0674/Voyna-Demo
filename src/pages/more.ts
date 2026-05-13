import { loadState, resetState, saveState } from '@/core/state';
import { logout } from '@/auth/firebase';
import { logoutAndReset } from '@/core/router';

export function renderMore(root: HTMLElement): void {
  const state = loadState();
  root.innerHTML = `
    <h1>더보기</h1>

    <section class="profile">
      <img src="${state.user?.photoURL || ''}" onerror="this.style.display='none'" class="profile-img"/>
      <div>
        <div class="profile-name">${state.user?.displayName ?? ''}</div>
        <div class="profile-email">${state.user?.email ?? ''}</div>
      </div>
    </section>

    <section class="settings">
      <button class="setting-btn" id="reset-demo">🔄 데모 리셋 (배지/XP 초기화)</button>
      <button class="setting-btn danger" id="logout">🚪 로그아웃</button>
    </section>

    <section class="about">
      <h3>Voyna 데모 v0.1</h3>
      <p>이 빌드는 알토대학원 벤처 스타트업 수업 발표 데모용입니다.</p>
      <p>본 서비스는 12주 일정으로 별도 개발 중입니다.</p>
    </section>

    <style>
      .profile { display: flex; gap: 14px; align-items: center; padding: 16px;
                 background: white; border-radius: 12px; margin-bottom: 16px; }
      .profile-img { width: 60px; height: 60px; border-radius: 50%; }
      .profile-name { font-weight: 700; font-size: 16px; }
      .profile-email { color: var(--voyna-muted); font-size: 13px; }
      .settings { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
      .setting-btn {
        background: white; border: none; padding: 14px; text-align: left;
        border-radius: 10px; font-size: 14px; font-weight: 500;
      }
      .setting-btn.danger { color: #dc2626; }
      .about { background: white; padding: 16px; border-radius: 12px; }
      .about h3 { margin: 0 0 8px; font-size: 14px; }
      .about p { margin: 4px 0; font-size: 12px; color: var(--voyna-muted); }
    </style>
  `;

  document.getElementById('reset-demo')!.addEventListener('click', () => {
    if (!confirm('정말 모든 배지/XP를 초기화하시겠어요? (계정 정보는 유지됩니다)')) return;
    const u = loadState().user;
    resetState();
    if (u) {
      const fresh = loadState();
      fresh.user = u;
      saveState(fresh);
    }
    location.reload();
  });

  document.getElementById('logout')!.addEventListener('click', async () => {
    await logout();
    resetState();
    logoutAndReset();
  });
}
