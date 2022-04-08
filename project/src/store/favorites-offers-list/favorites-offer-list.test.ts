import { favoritesOffersList, setFavoritesOffers, deleteFavoritesOffer } from './favorites-offers-list';
import { OFFERS } from './../../utils/mocks';

describe('Reducer: favoritesOffersList', () => {
  it('without additional parameters should return initial state', () => {
    expect(favoritesOffersList.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({});
  });

  it('download favorites offers', () => {
    const state = {};

    expect(favoritesOffersList.reducer(state, setFavoritesOffers(OFFERS)))
      .toEqual(OFFERS);
  });

  it('delete offer with id 2 from favorites', () => {
    const state = OFFERS;
    const {[2]: deleteOffer, ...offersWithoutSecond} = OFFERS;

    expect(favoritesOffersList.reducer(state, deleteFavoritesOffer(2)))
      .toEqual(offersWithoutSecond);
  });
});
