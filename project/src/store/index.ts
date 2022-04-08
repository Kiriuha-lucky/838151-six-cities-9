import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { AuthorizationStatus } from '../types/authorization.types';
import { Offer } from '../types/offer.types';
import { OffersSortingType, Property } from '../types/state';
import { rootReducer } from './root-reducer';

export const api = createAPI();

export interface State {
  offersList: Offer[],
  property: Property,
  auth: AuthorizationStatus,
  activeOffer: number,
  sort: OffersSortingType,
  currentCity: string,
  favoritesOffersList: Offer[]
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
