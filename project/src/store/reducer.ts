import { createReducer } from '@reduxjs/toolkit';
import { OFFERS } from '../mocks/offers';
import { REVIEWS } from '../mocks/reviews';
import { CITIES } from '../types/cities';
import { getCurrentCity, selectedOfferId } from './action';
import {Offer, ReviewType} from '../components/app/app';

interface initialStateType {
  currentCity: string,
  cities: string[],
  offers: Offer[],
  reviews: ReviewType[],
  selectedOfferId: number
}

const initialState: initialStateType = {
  currentCity: 'Paris',
  cities: CITIES,
  offers: OFFERS,
  reviews: REVIEWS,
  selectedOfferId: 0,
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
