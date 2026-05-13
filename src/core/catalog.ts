import locationsData from '@/data/locations.json';
import badgesData from '@/data/badges.json';

export type Grade = 'common' | 'rare' | 'special' | 'premier';

export type Location = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  category: string;
  grade: Grade;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  grade: Grade;
  xp: number;
  image: string;
  is_polished: boolean;
};

const LOCATIONS = locationsData as Location[];
const BADGES = badgesData as Badge[];
const LOC_MAP = new Map(LOCATIONS.map((l) => [l.id, l]));
const BADGE_MAP = new Map(BADGES.map((b) => [b.id, b]));

export const getLocations = (): Location[] => LOCATIONS;
export const getBadges = (): Badge[] => BADGES;
export const getLocation = (id: string): Location | undefined => LOC_MAP.get(id);
export const getBadge = (id: string): Badge | undefined => BADGE_MAP.get(id);
