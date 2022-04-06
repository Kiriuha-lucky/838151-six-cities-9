import { createSlice } from '@reduxjs/toolkit';

export const offersList = createSlice({
  name: 'offersList',
  initialState: [],
  reducers: {
    setOffers: (state, action) => action.payload,
  },
});

export const { setOffers } = offersList.actions;
