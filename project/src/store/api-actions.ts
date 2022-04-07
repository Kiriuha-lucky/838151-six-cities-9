import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Offer } from '../types/offer.types';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { api } from '../store';
import { store } from '../store';
import { APIRoute } from '../types/api.types';
import { AuthData } from '../types/auth-data.types';
import { AuthorizationStatus } from '../types/authorization.types';
import { Rating } from '../types/rating.types';
import { UserData } from '../types/user-data.types';
import { requireAuthorization } from './auth/auth';
import { setOffers } from './offers-list/offers-list';
import { setNeighborsOffers, setOffer, setReviews } from './property/property';
import { FavoriteType } from '../types/favorite.types';
import { setFavoritesOffers } from './favorites-offers-list/favorites-offers-list';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffersAction',
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(setOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesOffersAction = createAsyncThunk(
  'fetchOffersAction',
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      store.dispatch(setFavoritesOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferAction = createAsyncThunk(
  'fetchOfferAction',
  async (id: number) => {
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
        store.dispatch(setOffer(d1.data));
        store.dispatch(setReviews(d2.data));
        store.dispatch(setNeighborsOffers(d3.data));
      }))
      .catch((Error) => {
        errorHandle(Error);
      });
  },
);


export const requireAuthAction = createAsyncThunk(
  'requireAuthAction',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'login',
  async ({ login: email, password }: AuthData) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'logout',
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const addComment = createAsyncThunk(
  'addComment',
  async ({ rating, comment, id }: Rating, { dispatch }) => {
    try {
      const { data } = await api.post(`${APIRoute.Comments}/${id}`, { comment, rating });
      toast.info('Комментарий добавлен');
      dispatch(setReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const toogleFavorites = createAsyncThunk(
  'inFavorites',
  async ({ id, isFavorite, location }: FavoriteType) => {
    try {
      const { data } = await api.post(`${APIRoute.Favorite}/${id}/${isFavorite}`);
      isFavorite ? toast.info('Добавлен в избранное') : toast.info('Удален из избранного');
      switch (true) {
        case (location.includes(APIRoute.Offer)):
          return store.dispatch(setOffer(data));
        case (location.includes(APIRoute.FavoritesOffers)):
          return store.dispatch(fetchFavoritesOffersAction());
        default:
          return store.dispatch(fetchOffersAction());
      }
    } catch (error) {
      errorHandle(error);
    }
  },
);
