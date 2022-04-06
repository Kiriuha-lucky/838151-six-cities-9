import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer.types';
import { Offers } from '../../types/state';

const initialState: Offers = {
  offers: [],
};

export const offersList = createSlice({
  name: 'offersList',
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
});

export const { setOffers } = offersList.actions;
