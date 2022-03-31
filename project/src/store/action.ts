import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer.types';
import { ReviewType } from '../types/review.types';
import { initialStateType } from './reducer';

export const Action = {
  GET_CURRENT_CITY: 'GET_CURRENT_CITY',
  SELECTED_OFFER_ID: 'SELECTED_OFFER_ID',
  OFFERS_SORT: 'OFFERS_SORT',
  LOAD_OFFERS: 'LOAD_OFFERS',
  LOAD_OFFER: 'LOAD_OFFER',
  LOAD_REVIEWS: 'LOAD_REVIEWS',
  LOAD_NEIGHBORS_OFFERS: 'LOAD_NEIGHBORS_OFFERS',
  AUTHORIZATION: 'AUTHORIZATION',
};

export const getCurrentCity = createAction(Action.GET_CURRENT_CITY, (value: initialStateType['currentCity']) => ({ payload: value }));

export const selectedOfferId = createAction(Action.SELECTED_OFFER_ID, (value: initialStateType['selectedOfferId']) => ({ payload: value }));

export const offersSort = createAction(Action.OFFERS_SORT, (value: initialStateType['offersSortingType']) => ({ payload: value }));

export const loadOffers = createAction(Action.LOAD_OFFERS, (value: Offer[]) => ({ payload: value }));

export const loadOffer = createAction(Action.LOAD_OFFER, (value: Offer) => ({ payload: value }));

export const loadReviews = createAction(Action.LOAD_REVIEWS, (value: ReviewType[]) => ({ payload: value }));

export const loadNeighborsOffers = createAction(Action.LOAD_NEIGHBORS_OFFERS, (value: Offer[]) => ({ payload: value }));

export const requireAuthorization = createAction(Action.AUTHORIZATION, (value: initialStateType['authorizationStatus']) => ({ payload: value }));
