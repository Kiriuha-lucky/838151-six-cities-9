import { Main } from '../main/main';
import { Login } from '../login/login';
import { Property } from '../property/property';
import { Favorites } from '../favorites/favorites';
import { NotFound } from '../not-found/not-found';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { PrivateRoute } from '../private-route/private-route';
import { useAppSelector } from '../../hooks';

export function App(): JSX.Element {
  const {offers, authorizationStatus } = useAppSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.Main}
          element={<Main offers={offers} />}
        />
        <Route
          path={AppRoutes.Login}
          element={<Login />}
        />
        <Route
          path={AppRoutes.Property}
          element={<Property />}
        />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
