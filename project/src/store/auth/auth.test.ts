import { AuthorizationStatus } from '../../types/authorization.types';
import { auth, requireAuthorization } from './auth';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(auth.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(AuthorizationStatus.Unknown);
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = AuthorizationStatus.NoAuth;

    expect(auth.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual(AuthorizationStatus.Auth);
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = AuthorizationStatus.NoAuth;

    expect(auth.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual(AuthorizationStatus.NoAuth);
  });
});
