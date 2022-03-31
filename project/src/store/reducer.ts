import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../types/cities';
import { getCurrentCity, loadNeighborsOffers, loadOffer, loadOffers, loadReviews, offersSort, requireAuthorization, selectedOfferId } from './action';
import { Offer } from '../types/offer.types';
import { ReviewType } from '../types/review.types';
import { AuthorizationStatus } from '../types/authorization.types';

export type OffersSortingType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';
export interface initialStateType {
  currentCity: string,
  cities: string[],
  offers: Offer[],
  reviews: ReviewType[],
  selectedOfferId: number,
  offersSortingType: OffersSortingType,
  authorizationStatus: string,
  offer: {
    currentOffer: Offer,
    reviews: ReviewType[],
    neighborsOffers: Offer[]
  },
}

const initialState: initialStateType = {
  currentCity: 'Paris',
  cities: CITIES,
  offers: [],
  reviews: [],
  selectedOfferId: 0,
  offersSortingType: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  offer: {
    currentOffer: {} as Offer,
    reviews: [],
    neighborsOffers: [],
  },
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    });
  builder
    .addCase(selectedOfferId, (state, action) => {
      state.selectedOfferId = action.payload;
    });
  builder
    .addCase(offersSort, (state, action) => {
      state.offersSortingType = action.payload;
    });
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
  builder
    .addCase(loadOffer, (state, action) => {
      state.offer.currentOffer = action.payload;
    });
  builder
    .addCase(loadReviews, (state, action) => {
      state.offer.reviews = action.payload;
    });
  builder
    .addCase(loadNeighborsOffers, (state, action) => {
      state.offer.neighborsOffers = action.payload;
    });
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
