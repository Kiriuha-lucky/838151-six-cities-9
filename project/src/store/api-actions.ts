import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Offer } from '../types/offer.types';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { State } from '../types/state';
import { APIRoute } from '../types/api.types';
import { AuthData } from '../types/auth-data.types';
import { AuthorizationStatus } from '../types/authorization.types';
import { Rating } from '../types/rating.types';
import { UserData } from '../types/user-data.types';
import { requireAuthorization } from './auth/auth';
import { setOffers, updateOffers } from './offers-list/offers-list';
import { setNeighborsOffers, setOffer, setReviews } from './property/property';
import { FavoriteType } from '../types/favorite.types';
import { deleteFavoritesOffer, setFavoritesOffers } from './favorites-offers-list/favorites-offers-list';
import { normalize, schema } from 'normalizr';
import { AppDispatch } from '../types/state';
import { store } from './index';
import { clearUser, setUser } from './user/user';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchOffersAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      const offerSchema = new schema.Entity('offers');
      const offerListSchema = new schema.Array(offerSchema);
      const normalizedData = normalize(data, offerListSchema);
      dispatch(setOffers(normalizedData.entities.offers));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchOffersAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      const offerSchema = new schema.Entity('offers');
      const offerListSchema = new schema.Array(offerSchema);
      const normalizedData = normalize(data, offerListSchema);
      dispatch(setFavoritesOffers(normalizedData.entities.offers));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchOfferAction',
  async (id, { dispatch, extra: api }) => {
    function getOffer() {
      return api.get<Offer>(`${APIRoute.Offers}/${id}`);
    }

    function getReviews() {
      return api.get(`${APIRoute.Comments}/${id}`);
    }

    function getNeighborsOffers() {
      return api.get(`${APIRoute.NeighborsOffers}/${id}/nearby`);
    }

    await Promise.all([getOffer(), getReviews(), getNeighborsOffers()])
      .then(axios.spread((d1, d2, d3) => {
        dispatch(setOffer(d1.data));
        dispatch(setReviews(d2.data));
        const offerSchema = new schema.Entity('offers');
        const offerListSchema = new schema.Array(offerSchema);
        const normalizedData = normalize(d3.data, offerListSchema);
        dispatch(setNeighborsOffers(normalizedData.entities.offers));
      }))
      .catch((Error) => {
        errorHandle(Error);
      });
  },
);


export const requireAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'requireAuthAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(clearUser());
  },
);

export const addComment = createAsyncThunk<void, Rating, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'addComment',
  async ({ rating, comment, id }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post(`${APIRoute.Comments}/${id}`, { comment, rating });
      toast.info('Комментарий добавлен');
      dispatch(setReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const toogleFavorites = createAsyncThunk<void, FavoriteType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'inFavorites',
  async ({ id, isFavorite, location }, { dispatch, extra: api }) => {
    try {
      const { data: offer }: AxiosResponse<Offer> = await api.post(`${APIRoute.Favorite}/${id}/${isFavorite}`);
      isFavorite ? toast.info('Добавлен в избранное') : toast.info('Удален из избранного');

      if (location.includes(APIRoute.Offer)) {
        if (id in store.getState().property.neighborsOffers) {
          const neighborsOffers = store.getState().property.neighborsOffers;
          dispatch(setNeighborsOffers({ ...neighborsOffers, [id]: offer }));
          return;
        }
        dispatch(setOffer(offer));
        return;
      }

      if (location.includes(APIRoute.FavoritesOffers)) {
        dispatch(deleteFavoritesOffer(id));
        return;
      }

      dispatch(updateOffers({ id, offer }));
    } catch (error) {
      errorHandle(error);
    }
  },
);
