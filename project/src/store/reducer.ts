import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../types/cities';
import { dataLoaded, getCurrentCity, loadOffers, offersSort, selectedOfferId } from './action';
import { Offer, ReviewType } from '../components/app/app';

interface initialStateType {
  currentCity: string,
  cities: string[],
  offers: Offer[],
  reviews: ReviewType[],
  selectedOfferId: number,
  offersSort: string,
  isDataLoaded: boolean,
}

const initialState: initialStateType = {
  currentCity: 'Paris',
  cities: CITIES,
  offers: [],
  reviews: [],
  selectedOfferId: 0,
  offersSort: 'Popular',
  isDataLoaded: false,
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
      state.offersSort = action.payload;
    });
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
  builder
    .addCase(dataLoaded, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});
