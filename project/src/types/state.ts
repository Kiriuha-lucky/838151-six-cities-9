import {store} from '../store/index';
import { AuthorizationStatus } from './authorization.types';
import { Offer } from './offer.types';
import { ReviewType } from './review.types';

export interface Offers {
  offers: Offer[],
}

export interface Property {
  currentOffer: Offer,
  reviews: ReviewType[],
  neighborsOffers: Offer[]
}

export interface Auth {
  authorizationStatus: AuthorizationStatus,
}

export type OffersSortingType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';
export interface Control {
  currentCity: string,
  selectedOfferId: number,
  offersSortingType: OffersSortingType,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
