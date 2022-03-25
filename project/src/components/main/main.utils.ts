import { initialStateType } from '../../store/reducer';
import { Offer } from '../app/app';

function getOffersSortingFunction(offersSortingType: initialStateType['offersSortingType']) {
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

export function getCurrentOffers(offers: Offer[], currentCity: string, offersSortingType: initialStateType['offersSortingType']) {
  return offers.filter((offer) => offer.city.name === currentCity).sort(getOffersSortingFunction(offersSortingType));
}
