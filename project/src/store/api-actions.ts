import {createAsyncThunk} from '@reduxjs/toolkit';
import { Offer } from '../components/app/app';
import {api} from '../store';
import {store} from '../store';
import {APIRoute} from '../types/api.types';
import { dataLoaded, loadOffers } from './action';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffersAction',
  async () => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    store.dispatch(loadOffers(data));
    store.dispatch(dataLoaded(true));
  },
);
