import { Offer } from '../../types/offer.types';
import { OffersSortingType } from '../../types/state';

function getOffersSortingFunction(offersSortingType: OffersSortingType) {
  switch (offersSortingType) {
    case 'Popular':
      return;
    case 'Price: low to high':
      return function (a: Offer, b: Offer) { return a.price - b.price; };
    case 'Price: high to low':
      return function (a: Offer, b: Offer) { return b.price - a.price; };
    case 'Top rated first':
      return function (a: Offer, b: Offer) { return b.rating - a.rating; };
  }
}
export function getCurrentOffers(offers: Offer[], currentCity: string, offersSortingType: OffersSortingType) {
  return offers.filter((offer) => offer.city.name === currentCity).sort(getOffersSortingFunction(offersSortingType));
}
