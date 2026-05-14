import './styles/main.css';
import { startRouter } from './core/router';
import { handleRedirectResult } from './auth/firebase';

window.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('app')!;
  // Firebase signInWithRedirect 결과 먼저 처리 (있으면 user 상태 갱신됨)
  await handleRedirectResult();
  startRouter(root);
});
