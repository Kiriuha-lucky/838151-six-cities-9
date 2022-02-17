import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../types/routes.types';
import { AuthorizationStatus } from '../../types/authorization.types';


type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRoute({ children, authorizationStatus }: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
