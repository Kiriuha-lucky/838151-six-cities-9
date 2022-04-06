import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const currentCity = createSlice({
  name: 'currentCity',
  initialState: 'Paris',
  reducers: {
    getCurrentCity: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { getCurrentCity } = currentCity.actions;
