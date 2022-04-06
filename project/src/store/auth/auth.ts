import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../types/authorization.types';

export const auth = createSlice({
  name: 'auth',
  initialState: AuthorizationStatus.Unknown,
  reducers: {
    requireAuthorization: (state, action) => action.payload,
  },
});

export const { requireAuthorization } = auth.actions;
