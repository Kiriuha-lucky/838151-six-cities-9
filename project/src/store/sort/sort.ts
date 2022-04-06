import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersSortingType } from '../../types/state';


export const sort = createSlice({
  name: 'sort',
  initialState: 'Popular',
  reducers: {
    setOffersSort: (state, action: PayloadAction<OffersSortingType>) => action.payload,
  },
});

export const { setOffersSort } = sort.actions;
