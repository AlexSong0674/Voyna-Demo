export type Tab = 'home' | 'map' | 'badges' | 'more';

export function renderTabBar(active: Tab, onChange: (t: Tab) => void): HTMLElement {
  const bar = document.createElement('nav');
  bar.className = 'tabbar';
  bar.innerHTML = `
    <button data-tab="home" class="${active === 'home' ? 'active' : ''}">🏠<span>홈</span></button>
    <button data-tab="map" class="${active === 'map' ? 'active' : ''}">🗺️<span>탐험</span></button>
    <button data-tab="badges" class="${active === 'badges' ? 'active' : ''}">🏅<span>배지</span></button>
    <button data-tab="more" class="${active === 'more' ? 'active' : ''}">⚙️<span>더보기</span></button>
  `;
  bar.querySelectorAll<HTMLButtonElement>('button').forEach((btn) => {
    btn.addEventListener('click', () => onChange(btn.dataset.tab as Tab));
  });
  return bar;
}
