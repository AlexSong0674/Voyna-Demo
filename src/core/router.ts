import { renderTabBar, type Tab } from '@/components/tab-bar';
import { renderLoginPage } from '@/auth/login-page';
import { renderHome } from '@/pages/home';
import { renderMap } from '@/pages/map';
import { renderBadges } from '@/pages/badges';
import { renderMore } from '@/pages/more';
import { loadState } from '@/core/state';

let appRoot: HTMLElement;
let currentTab: Tab = 'home';

export function startRouter(root: HTMLElement): void {
  appRoot = root;
  const state = loadState();
  if (!state.user) {
    renderLoginPage(appRoot, () => navigate('home'));
  } else {
    navigate(currentTab);
  }
}

export function navigate(tab: Tab): void {
  currentTab = tab;
  const state = loadState();
  if (!state.user) {
    renderLoginPage(appRoot, () => navigate('home'));
    return;
  }

  appRoot.innerHTML = '';
  const pageContainer = document.createElement('main');
  pageContainer.className = 'page';
  appRoot.appendChild(pageContainer);

  switch (tab) {
    case 'home':   renderHome(pageContainer); break;
    case 'map':    renderMap(pageContainer); break;
    case 'badges': renderBadges(pageContainer); break;
    case 'more':   renderMore(pageContainer); break;
  }

  appRoot.appendChild(renderTabBar(tab, navigate));
}

export function logoutAndReset(): void {
  currentTab = 'home';
  startRouter(appRoot);
}
