import {store} from '../store/index.js';
import { Offer } from './offer.types.js';
import { ReviewType } from './review.types.js';

export interface Data {
  offers: Offer[],
  offer: {
    currentOffer: Offer,
    reviews: ReviewType[],
    neighborsOffers: Offer[]
  },
}

export interface Auth {
  authorizationStatus: string,
}

export type OffersSortingType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';
export interface Control {
  currentCity: string,
  selectedOfferId: number,
  offersSortingType: OffersSortingType,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
