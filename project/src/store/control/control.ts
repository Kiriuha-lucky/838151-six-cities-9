import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const control = createSlice({
  name: 'control',
  initialState: 0,
  reducers: {
    selectedOfferId: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const { selectedOfferId } = control.actions;
