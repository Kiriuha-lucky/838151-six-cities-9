import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer.types';
import { ReviewType } from '../../types/review.types';
import { Property } from '../../types/state';

const initialState: Property = {
  currentOffer: {} as Offer,
  reviews: [],
  neighborsOffers: {},
};

export const property = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setOffer: (state, action: PayloadAction<Offer>) => {
      state.currentOffer = action.payload;
    },
    setReviews: (state, action: PayloadAction<ReviewType[]>) => {
      state.reviews = action.payload;
    },
    setNeighborsOffers: (state, action) => {
      state.neighborsOffers = action.payload;
    },
  },
});

export const { setOffer, setReviews, setNeighborsOffers } = property.actions;
