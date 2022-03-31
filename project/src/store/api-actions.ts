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
import { loadNeighborsOffers, loadOffer, loadOffers, loadReviews, requireAuthorization } from './action';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffersAction',
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferAction = createAsyncThunk(
  'fetchOfferAction',
  async (id: number) => {
    function getOffer() {
      return api.get<Offer>(`${APIRoute.Offer}/${id}`);
    }

    function getReviews() {
      return api.get(`${APIRoute.Comments}/${id}`);
    }

    function getNeighborsOffers() {
      return api.get(`${APIRoute.NeighborsOffers}/${id}/nearby`);
    }

    await Promise.all([getOffer(), getReviews(), getNeighborsOffers()])
      .then(axios.spread((d1, d2, d3) => {
        store.dispatch(loadOffer(d1.data));
        store.dispatch(loadReviews(d2.data));
        store.dispatch(loadNeighborsOffers(d3.data));
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
  async ({ rating, comment, id }: Rating) => {
    try {
      const { data } = await api.post(`${APIRoute.Comments}/${id}`, { comment, rating });
      toast.info('Комментарий добавлен');
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
