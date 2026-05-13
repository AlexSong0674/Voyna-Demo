import './styles/main.css';
import { startRouter } from './core/router';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')!;
  startRouter(root);
});
