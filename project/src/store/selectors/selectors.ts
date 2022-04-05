import { Auth, Control, Data } from '../../types/state';

export const getAuthorizationStatus = ( state: { data: Data; auth: Auth; control: Control; }) => state.auth.authorizationStatus;
