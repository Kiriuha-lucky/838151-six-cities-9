import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer.types';
import { Data } from '../../types/state';

const initialState: Data = {
  offers: [],
  offer: {
    currentOffer: {} as Offer,
    reviews: [],
    neighborsOffers: [],
  },
};

export const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
    },
    loadOffer: (state, action) => {
      state.offer.currentOffer = action.payload;
    },
    loadReviews: (state, action) => {
      state.offer.reviews = action.payload;
    },
    loadNeighborsOffers: (state, action) => {
      state.offer.neighborsOffers = action.payload;
    },
  },
});

export const { loadOffers, loadOffer, loadReviews, loadNeighborsOffers } = data.actions;
