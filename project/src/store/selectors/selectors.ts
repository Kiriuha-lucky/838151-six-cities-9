import {State} from '../../types/state';

export const getAuthorizationStatus = ( state: State) => state.auth;

export const getOffers = ( state: State) => Object.values(state.offersList);
