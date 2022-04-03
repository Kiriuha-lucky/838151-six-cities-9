import { createSlice } from '@reduxjs/toolkit';
import { Control } from '../../types/state';

const initialState: Control = {
  currentCity: 'Paris',
  selectedOfferId: 0,
  offersSortingType: 'Popular',
};

export const control = createSlice({
  name: 'CONTROL',
  initialState,
  reducers: {
    getCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    selectedOfferId: (state, action) => {
      state.selectedOfferId = action.payload;
    },
    offersSort: (state, action) => {
      state.offersSortingType = action.payload;
    },
  },
});

export const { getCurrentCity, selectedOfferId, offersSort } = control.actions;
