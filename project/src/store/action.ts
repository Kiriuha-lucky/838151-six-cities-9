import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../components/app/app';
import { initialStateType } from './reducer';

export const Action = {
  GET_CURRENT_CITY: 'GET_CURRENT_CITY',
  SELECTED_OFFER_ID: 'SELECTED_OFFER_ID',
  OFFERS_SORT: 'OFFERS_SORT',
  LOAD_OFFERS: 'LOAD_OFFERS',
  DATA_LOADED: 'DATA_LOADED',
};

export const getCurrentCity = createAction(Action.GET_CURRENT_CITY, (value: initialStateType['currentCity']) => ({ payload: value }),
);

export const selectedOfferId = createAction(Action.SELECTED_OFFER_ID, (value: initialStateType['selectedOfferId']) => ({ payload: value }),
);

export const offersSort = createAction(Action.OFFERS_SORT, (value: initialStateType['offersSortingType']) => ({ payload: value }),
);

export const loadOffers = createAction(Action.LOAD_OFFERS, (value: Offer[]) => ({ payload: value }),
);

export const dataLoaded = createAction(Action.DATA_LOADED, (value: initialStateType['isDataLoaded']) => ({ payload: value }),
);
