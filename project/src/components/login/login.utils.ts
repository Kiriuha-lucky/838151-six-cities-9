import { CITIES } from '../cities-list/cities';

export function getRandomCity() {
  const RANDOM_CITY_NUMBER = Math.floor(Math.random() * CITIES.length);
  return CITIES[RANDOM_CITY_NUMBER];
}
