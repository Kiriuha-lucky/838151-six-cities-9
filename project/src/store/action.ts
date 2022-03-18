import { createAction } from '@reduxjs/toolkit';

export const Action = {
  GET_CURRENT_CITY: 'GET_CURRENT_CITY',
  SELECTED_OFFER_ID: 'SELECTED_OFFER_ID',
  OFFERS_SORT: 'OFFERS_SORT',
  LOAD_OFFERS: 'LOAD_OFFERS',
  DATA_LOADED: 'DATA_LOADED',
};

export const getCurrentCity = createAction(Action.GET_CURRENT_CITY, (value) => ({ payload: value }),
);

export const selectedOfferId = createAction(Action.SELECTED_OFFER_ID, (value) => ({ payload: value }),
);

export const offersSort = createAction(Action.OFFERS_SORT, (value) => ({ payload: value }),
);

export const loadOffers = createAction(Action.LOAD_OFFERS, (value) => ({ payload: value }),
);

export const dataLoaded = createAction(Action.DATA_LOADED, (value) => ({ payload: value }),
);
