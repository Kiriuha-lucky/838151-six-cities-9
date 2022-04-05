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
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
    setOffer: (state, action) => {
      state.offer.currentOffer = action.payload;
    },
    setReviews: (state, action) => {
      state.offer.reviews = action.payload;
    },
    setNeighborsOffers: (state, action) => {
      state.offer.neighborsOffers = action.payload;
    },
  },
});

export const { setOffers, setOffer, setReviews, setNeighborsOffers } = data.actions;
