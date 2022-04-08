import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const activeOffer = createSlice({
  name: 'control',
  initialState: 0,
  reducers: {
    selectedOfferId: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const { selectedOfferId } = activeOffer.actions;
