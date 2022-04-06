import { createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../types/state';

const initialState: Offers = {
  offers: [],
};

export const offersList = createSlice({
  name: 'offersList',
  initialState,
  reducers: {
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
  },
});

export const { setOffers } = offersList.actions;
