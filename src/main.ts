import './styles/main.css';
import { startRouter } from './core/router';
import { handleRedirectResult } from './auth/firebase';

function showBootError(msg: string): void {
  const root = document.getElementById('app');
  if (!root) return;
  const div = document.createElement('div');
  div.style.cssText = `
    position: fixed; top: 12px; left: 12px; right: 12px;
    padding: 12px 14px; background: #fef2f2; border: 1px solid #fecaca;
    color: #991b1b; border-radius: 8px; font-size: 12px; z-index: 9999;
    white-space: pre-wrap; word-break: break-word;
  `;
  div.textContent = '[로그인 복귀 오류] ' + msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 15000);
}

window.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('app')!;
  await handleRedirectResult(showBootError);
  startRouter(root);
});
