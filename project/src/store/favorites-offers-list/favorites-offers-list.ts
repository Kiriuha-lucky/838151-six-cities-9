import { createSlice } from '@reduxjs/toolkit';

export const favoritesOffersList = createSlice({
  name: 'favoritesOffersList',
  initialState: [],
  reducers: {
    setFavoritesOffers: (state, action) => action.payload,
  },
});

export const { setFavoritesOffers } = favoritesOffersList.actions;
