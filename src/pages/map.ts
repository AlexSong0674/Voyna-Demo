import { loadKakaoMaps } from '@/core/kakao-loader';
import { getLocations, type Location } from '@/core/catalog';
import { loadState, saveState } from '@/core/state';
import { findNearbyBadges, awardBadge } from '@/core/badge-engine';
import { showBadgeAcquired } from '@/components/badge-acquired-modal';
import { showLevelUp } from '@/components/level-up-modal';
import { showTitleToast } from '@/components/title-toast';
import { getBrowserGPS } from '@/core/geo';

let mapInstance: any = null;
let userMarker: any = null;

const GRADE_COLOR: Record<string, string> = {
  special: '#d4a017', rare: '#8e44ad', common: '#3498db', premier: '#ff5252',
};

export async function renderMap(root: HTMLElement): Promise<void> {
  root.innerHTML = `
    <div class="map-wrap">
      <div id="kakao-map" class="kakao-map"></div>
      <div class="map-actions">
        <button id="gps-btn">📍 내 GPS</button>
        <button id="teleport-btn">✈️ 텔레포트</button>
      </div>
      <div id="teleport-panel" class="teleport-panel hidden"></div>
    </div>
    <style>
      .map-wrap { position: relative; height: calc(100vh - var(--tabbar-h) - 32px); }
      .kakao-map { width: 100%; height: 100%; border-radius: 12px; overflow: hidden; }
      .map-actions {
        position: absolute; bottom: 16px; left: 16px; right: 16px;
        display: flex; gap: 8px; z-index: 10;
      }
      .map-actions button {
        flex: 1; padding: 12px; border: none; border-radius: 24px;
        background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-weight: 600;
      }
      .teleport-panel {
        position: absolute; bottom: 80px; left: 16px; right: 16px;
        background: white; border-radius: 12px; padding: 16px;
        max-height: 50%; overflow-y: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.2); z-index: 11;
      }
      .teleport-panel.hidden { display: none; }
      .teleport-panel h3 { margin: 0 0 12px; font-size: 16px; }
      .tp-item {
        padding: 10px 12px; border-radius: 8px; display: flex;
        justify-content: space-between; align-items: center; cursor: pointer;
      }
      .tp-item:hover { background: #f3f4f6; }
      .tp-item.obtained { opacity: 0.5; }
      .tp-grade {
        font-size: 11px; padding: 2px 8px; border-radius: 999px; color: white;
      }
    </style>
  `;

  try {
    await loadKakaoMaps();
  } catch (e) {
    document.getElementById('kakao-map')!.innerHTML =
      `<div style="padding:20px;color:#dc2626">카카오맵 로드 실패: ${(e as Error).message}</div>`;
    return;
  }

  const container = document.getElementById('kakao-map')!;
  const center = new window.kakao.maps.LatLng(37.5573, 126.9485);
  mapInstance = new window.kakao.maps.Map(container, { center, level: 8 });

  for (const loc of getLocations()) {
    const pos = new window.kakao.maps.LatLng(loc.lat, loc.lng);
    const marker = new window.kakao.maps.Marker({ position: pos, map: mapInstance, title: loc.name });
    const iw = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:6px 10px;font-size:12px">${loc.name}<br/><span style="color:${GRADE_COLOR[loc.grade]}">${loc.grade}</span></div>`,
    });
    window.kakao.maps.event.addListener(marker, 'click', () => {
      iw.open(mapInstance, marker);
      // 핀 클릭은 정보창만 표시. 배지 획득은 텔레포트 또는 실제 GPS 도착으로만.
    });
  }

  const state = loadState();
  const cur = state.currentLocation ?? state.realGPS ?? { lat: 37.5573, lng: 126.9485 };
  setUserMarker(cur.lat, cur.lng);

  document.getElementById('gps-btn')!.addEventListener('click', () => void useRealGPS());
  document.getElementById('teleport-btn')!.addEventListener('click', toggleTeleport);
}

function setUserMarker(lat: number, lng: number): void {
  const pos = new window.kakao.maps.LatLng(lat, lng);
  if (userMarker) userMarker.setMap(null);
  userMarker = new window.kakao.maps.Marker({
    position: pos,
    map: mapInstance,
    image: new window.kakao.maps.MarkerImage(
      'data:image/svg+xml;utf8,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
           <circle cx="14" cy="14" r="10" fill="#2a5cdc" stroke="white" stroke-width="3"/>
         </svg>`
      ),
      new window.kakao.maps.Size(28, 28),
      { offset: new window.kakao.maps.Point(14, 14) }
    ),
  });
  mapInstance.panTo(pos);
}

async function useRealGPS(): Promise<void> {
  try {
    const gps = await getBrowserGPS();
    const state = loadState();
    state.realGPS = gps;
    state.currentLocation = { ...gps, isTeleport: false };
    saveState(state);
    setUserMarker(gps.lat, gps.lng);
    await tryAcquireBadgeAt(gps);
  } catch (e) {
    alert('GPS 획득 실패: ' + (e as Error).message);
  }
}

function toggleTeleport(): void {
  const panel = document.getElementById('teleport-panel')!;
  if (!panel.classList.contains('hidden')) { panel.classList.add('hidden'); return; }

  const state = loadState();
  const obtained = new Set(state.obtained.map((o) => o.badgeId));
  const items = getLocations().map((loc) => {
    const isObtained = obtained.has(loc.id);
    return `
      <div class="tp-item ${isObtained ? 'obtained' : ''}" data-id="${loc.id}">
        <span>${loc.name}</span>
        <span class="tp-grade" style="background:${GRADE_COLOR[loc.grade]}">${loc.grade}</span>
      </div>`;
  }).join('');
  panel.innerHTML = `<h3>텔레포트 (데모용)</h3>${items}`;
  panel.classList.remove('hidden');

  panel.querySelectorAll<HTMLElement>('.tp-item').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.dataset.id!;
      const loc = getLocations().find((l) => l.id === id)!;
      teleportTo(loc);
      panel.classList.add('hidden');
    });
  });
}

function teleportTo(loc: Location): void {
  const state = loadState();
  state.currentLocation = { lat: loc.lat, lng: loc.lng, isTeleport: true };
  saveState(state);
  setUserMarker(loc.lat, loc.lng);
  void tryAcquireBadgeAt({ lat: loc.lat, lng: loc.lng });
}

async function tryAcquireBadgeAt(coords: { lat: number; lng: number }): Promise<void> {
  const nearby = findNearbyBadges(coords);
  if (nearby.length === 0) return;
  const top = nearby[0]!;
  const result = awardBadge(top.location.id, coords.lat, coords.lng);
  if (!result.success) return;
  await showBadgeAcquired(result.badge);
  if (result.leveledUp) await showLevelUp(result.previousLevel, result.newLevel);
  if (result.newTitle) showTitleToast(result.newTitle);
}
