import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const currentCity = createSlice({
  name: 'currentCity',
  initialState: 'Paris',
  reducers: {
    setCurrentCity: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setCurrentCity } = currentCity.actions;
