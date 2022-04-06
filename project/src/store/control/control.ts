import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Control, OffersSortingType } from '../../types/state';

const initialState: Control = {
  currentCity: 'Paris',
  selectedOfferId: 0,
  offersSortingType: 'Popular',
};

export const control = createSlice({
  name: 'control',
  initialState,
  reducers: {
    getCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    selectedOfferId: (state, action: PayloadAction<number>) => {
      state.selectedOfferId = action.payload;
    },
    offersSort: (state, action: PayloadAction<OffersSortingType>) => {
      state.offersSortingType = action.payload;
    },
  },
});

export const { getCurrentCity, selectedOfferId, offersSort } = control.actions;
