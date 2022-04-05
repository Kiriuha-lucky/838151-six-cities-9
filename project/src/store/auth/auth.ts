import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../types/authorization.types';
import { Auth } from '../../types/state';

const initialState: Auth = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { requireAuthorization } = auth.actions;
