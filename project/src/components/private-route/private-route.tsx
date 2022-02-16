import { Navigate, RouteProps } from 'react-router-dom';
import { AppRoute } from '../../types/routes.types';
import { AuthorizationStatus } from '../../types/authorization.types';


type PrivateRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
