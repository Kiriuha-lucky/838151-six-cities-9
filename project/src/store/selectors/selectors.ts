import { AuthorizationStatus } from '../../types/authorization.types';
import { Control, Property, Offers } from '../../types/state';

export const getAuthorizationStatus = ( state: { offersList: Offers; property:Property; auth: AuthorizationStatus; control: Control; }) => state.auth;
