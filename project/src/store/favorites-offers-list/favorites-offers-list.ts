import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer.types';

type FavoritesOffers = { [offesrId: number]: Offer };
const initialState = {} as FavoritesOffers;

export const favoritesOffersList = createSlice({
  name: 'favoritesOffersList',
  initialState,
  reducers: {
    setFavoritesOffers: (state, action) => action.payload,
    deleteFavoritesOffer: (state, { payload: id }: PayloadAction<number>) => {
      const { [id]: deletedOffer, ...newState } = state;
      return newState;
    },
  },
});

export const { setFavoritesOffers, deleteFavoritesOffer } = favoritesOffersList.actions;
