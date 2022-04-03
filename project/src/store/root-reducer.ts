import {combineReducers} from '@reduxjs/toolkit';
import { auth } from './auth/auth';
import { control } from './control/control';
import { data } from './data/data';

export const rootReducer = combineReducers({
  'DATA': data.reducer,
  'AUTH': auth.reducer,
  'CONTROL': control.reducer,
});
