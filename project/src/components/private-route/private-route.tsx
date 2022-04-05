import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { AuthorizationStatus } from '../../types/authorization.types';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from './../../store/selectors/selectors';


type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}
