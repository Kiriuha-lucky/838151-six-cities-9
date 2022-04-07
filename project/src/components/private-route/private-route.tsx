import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { AuthorizationStatus } from '../../types/authorization.types';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from './../../store/selectors/selectors';
import { Spinner } from './../spinner/spinner';


type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}
