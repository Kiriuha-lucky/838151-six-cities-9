import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { AuthorizationStatus } from '../types/authorization.types';
import { Control, Offers, Property } from '../types/state';
import { rootReducer } from './root-reducer';

export const api = createAPI();

export interface State {
  offersList: Offers,
  property: Property,
  auth: AuthorizationStatus,
  control: Control,
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
