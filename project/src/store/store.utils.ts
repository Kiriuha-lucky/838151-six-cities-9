import { Offer } from '../types/offer.types';

export function normalize(data: Offer[]) {
  const normalizeData: { [offerId: number]: Offer } = {};
  data.map((d) => normalizeData[d.id] = d);
  return normalizeData;
}
