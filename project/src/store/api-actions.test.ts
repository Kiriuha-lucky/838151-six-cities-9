import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { APIRoute } from '../types/api.types';
import { addComment, fetchFavoritesOffersAction, fetchOffersAction, loginAction, logoutAction, requireAuthAction, toogleFavorites } from './api-actions';
import { requireAuthorization } from './auth/auth';
import { AuthData } from '../types/auth-data.types';
import { OFFER, OFFERS, REVIEWS } from './../utils/mocks';
import { setOffers, updateOffers } from './offers-list/offers-list';
import { deleteFavoritesOffer, setFavoritesOffers } from './favorites-offers-list/favorites-offers-list';
import { setOffer, setReviews } from './property/property';
import { Rating } from '../types/rating.types';
import { FavoriteType } from '../types/favorite.types';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requireAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-sities', 'secret');
  });

  it('should dispatch Logout DELETE /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);


    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-sities');
  });

  it('download offers when GET /offers', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, OFFERS);


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(setOffers.toString());
  });

  it('download favorites offers when GET /favorites', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, OFFERS);


    const store = mockStore();

    await store.dispatch(fetchFavoritesOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(setFavoritesOffers.toString());
  });

  it('add comment POST /comments/id', async () => {
    const newComment: Rating = { comment: 'Some text', rating: 5, id: 5 };
    mockAPI
      .onPost(`${APIRoute.Comments}/5`)
      .reply(200, REVIEWS);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(addComment(newComment));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(setReviews.toString());
  });

  it('add favorite offer POST /favorites/id/status from Property page', async () => {
    const favorite: FavoriteType = { id: 5, isFavorite: 1, location: APIRoute.Offer };
    mockAPI
      .onPost(`${APIRoute.Favorite}/${favorite.id}/${favorite.isFavorite}`)
      .reply(200, OFFER);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(toogleFavorites(favorite));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(setOffer.toString());
  });

  it('add favorite offer POST /favorites/id/status from Main page', async () => {
    const favorite: FavoriteType = { id: 5, isFavorite: 1, location: '/' };
    mockAPI
      .onPost(`${APIRoute.Favorite}/${favorite.id}/${favorite.isFavorite}`)
      .reply(200, OFFER);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(toogleFavorites(favorite));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(updateOffers.toString());
  });

  it('delete favorite offer POST /favorites/id/status from favorites page', async () => {
    const favorite: FavoriteType = { id: 5, isFavorite: 0, location: APIRoute.FavoritesOffers };
    mockAPI
      .onPost(`${APIRoute.Favorite}/${favorite.id}/${favorite.isFavorite}`)
      .reply(200, OFFER);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(toogleFavorites(favorite));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(deleteFavoritesOffer.toString());
  });
});
