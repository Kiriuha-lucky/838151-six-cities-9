import { initialStateType } from '../store/reducer';

export const SORT_TYPES: initialStateType['offersSortingType'][] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];
