import { Auth, Control, Property, Offers } from '../../types/state';

export const getAuthorizationStatus = ( state: { offersList: Offers; property:Property; auth: Auth; control: Control; }) => state.auth.authorizationStatus;
