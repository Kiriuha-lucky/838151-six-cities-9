import { createReducer } from '@reduxjs/toolkit';
import { OFFERS } from '../mocks/offers';
import { REVIEWS } from '../mocks/reviews';
import { CITIES } from '../types/cities';
import { getCurrentCity, selectedOfferId } from './action';

const initialState = {
  currentCity: 'Paris',
  cities: CITIES,
  offers: OFFERS,
  reviews: REVIEWS,
  selectedOfferId: '',
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
});
