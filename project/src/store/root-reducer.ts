import {combineReducers} from '@reduxjs/toolkit';
import { auth } from './auth/auth';
import { control } from './control/control';
import { currentCity } from './current-city/current-city';
import { offersList } from './offers-list/offers-list';
import { property } from './property/property';
import { sort } from './sort/sort';

export const rootReducer = combineReducers({
  offersList: offersList.reducer,
  property: property.reducer,
  auth: auth.reducer,
  control: control.reducer,
  sort: sort.reducer,
  currentCity: currentCity.reducer,
});
