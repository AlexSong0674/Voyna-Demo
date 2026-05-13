export function showTitleToast(title: string): void {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `🏆 새 칭호 획득: <strong>${title}</strong>`;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.transition = 'opacity 0.4s';
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 400);
  }, 3000);
}
