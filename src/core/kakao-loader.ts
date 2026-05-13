let loaded: Promise<void> | null = null;

export function loadKakaoMaps(): Promise<void> {
  if (loaded) return loaded;
  loaded = new Promise((resolve, reject) => {
    const key = import.meta.env.VITE_KAKAO_MAP_KEY;
    if (!key) { reject(new Error('VITE_KAKAO_MAP_KEY 미설정')); return; }
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };
    script.onerror = () => reject(new Error('카카오맵 SDK 로드 실패'));
    document.head.appendChild(script);
  });
  return loaded;
}
