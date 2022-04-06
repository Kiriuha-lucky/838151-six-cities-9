import {combineReducers} from '@reduxjs/toolkit';
import { auth } from './auth/auth';
import { control } from './control/control';
import { offersList } from './offers-list/offers-list';
import { property } from './property/property';

export const rootReducer = combineReducers({
  'offersList': offersList.reducer,
  'property': property.reducer,
  'auth': auth.reducer,
  'control': control.reducer,
});
