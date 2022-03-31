import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { AuthorizationStatus } from '../../types/authorization.types';
import { useAppSelector } from '../../hooks';


type PrivateRouteProps = {
  authorizationStatus: string;
  children: JSX.Element;
}
/*eslint-disable*/
export function PrivateRoute({ children, authorizationStatus }: PrivateRouteProps): JSX.Element {
  const Auth = useAppSelector((store) => store.authorizationStatus)
  console.log(Auth);
  return (
    Auth === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}
