import { createAction } from '@reduxjs/toolkit';

export const Action = {
  GET_CURRENT_CITY: 'GET_CURRENT_CITY',
  SELECTED_OFFER_ID: 'SELECTED_OFFER_ID',
};

export const getCurrentCity = createAction(Action.GET_CURRENT_CITY, (value) => ({ payload: value }),
);

export const selectedOfferId = createAction(Action.SELECTED_OFFER_ID, (value) => ({ payload: value }),
);
