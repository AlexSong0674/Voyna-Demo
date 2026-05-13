import type { UserState } from './state';

export type Title = {
  id: string;
  name: string;
  description: string;
  predicate: (s: UserState, specialCount: number) => boolean;
};

export const TITLES: Title[] = [
  // 우선순위 높은 순으로 평가
  {
    id: 'legend',
    name: '전설의 여행자',
    description: 'Lv10 + 배지 20개',
    predicate: (s) => s.level >= 10 && s.obtained.length >= 20,
  },
  {
    id: 'seoul-conqueror',
    name: '서울 정복자',
    description: '특별 등급 배지 5개',
    predicate: (_, special) => special >= 5,
  },
  {
    id: 'mania',
    name: '지도 마니아',
    description: '배지 10개',
    predicate: (s) => s.obtained.length >= 10,
  },
  {
    id: 'neighborhood',
    name: '동네 탐험가',
    description: '배지 5개',
    predicate: (s) => s.obtained.length >= 5,
  },
  {
    id: 'beginner',
    name: '초보 탐험가',
    description: '시작 칭호',
    predicate: () => true,
  },
];

export function evaluateTitle(s: UserState, specialCount: number = 0): Title {
  for (const t of TITLES) {
    if (t.predicate(s, specialCount)) return t;
  }
  return TITLES[TITLES.length - 1]!;
}
