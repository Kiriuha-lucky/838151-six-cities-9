import {combineReducers} from '@reduxjs/toolkit';
import { auth } from './auth/auth';
import { activeOffer } from './active-offer/active-offer';
import { currentCity } from './current-city/current-city';
import { offersList } from './offers-list/offers-list';
import { property } from './property/property';
import { sort } from './sort/sort';
import { favoritesOffersList } from './favorites-offers-list/favorites-offers-list';

export const rootReducer = combineReducers({
  offersList: offersList.reducer,
  property: property.reducer,
  auth: auth.reducer,
  activeOffer: activeOffer.reducer,
  sort: sort.reducer,
  currentCity: currentCity.reducer,
  favoritesOffersList: favoritesOffersList.reducer,
});
