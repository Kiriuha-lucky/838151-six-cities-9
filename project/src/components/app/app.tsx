import { Main } from '../main/main';
import { Login } from '../login/login';
import { Property } from '../property/property';
import { Favorites } from '../favorites/favorites';
import { NotFound } from '../not-found/not-found';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { AuthorizationStatus } from '../../types/authorization.types';
import { PrivateRoute } from '../private-route/private-route';

interface AppProps {
  offersCount: number,
  offers: Offer[]
}

export interface Offer {
  id: number,
  mark: boolean,
  previewImageSrc: string,
  price: number,
  rating: number,
  name: string,
  type: string,
}

export function App({ offersCount, offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.Main}
          element={<Main offersCount={offersCount} offers={offers} />}
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
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites />
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
