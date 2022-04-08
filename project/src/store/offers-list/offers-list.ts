import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer.types';

type OffersList = { [offesrId: number]: Offer };
const initialState = {} as OffersList;

export const offersList = createSlice({
  name: 'offersList',
  initialState,
  reducers: {
    setOffers: (state, action) => action.payload,
    updateOffers: (state, { payload }: PayloadAction<{ id: number, offer: Offer }>) => ({ ...state, [payload.id]: payload.offer }),
  },
});

export const { setOffers, updateOffers } = offersList.actions;
