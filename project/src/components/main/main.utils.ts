import { Offer } from '../app/app';

type OffersSortTypeTypes = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

function getOffersSortingFunction(offersSortType: OffersSortTypeTypes) {
  switch (offersSortType) {
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

export function getCurrentOffers(offers: Offer[], currentCity: string, offersSortType: OffersSortTypeTypes) {
  return offers.filter((offer) => offer.city.name === currentCity).sort(getOffersSortingFunction(offersSortType));
}
