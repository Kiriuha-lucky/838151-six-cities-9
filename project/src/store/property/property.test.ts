import { property, setOffer, setReviews, setNeighborsOffers } from './property';
import { OFFERS, OFFER, REVIEWS } from './../../utils/mocks';
import { Offer } from '../../types/offer.types';

describe('Reducer: property', () => {
  it('without additional parameters should return initial state', () => {
    expect(property.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        currentOffer: {} as Offer,
        reviews: [],
        neighborsOffers: {},
      });
  });

  it('download offer', () => {
    const state = {
      currentOffer: {} as Offer,
      reviews: [],
      neighborsOffers: {},
    };

    expect(property.reducer(state, setOffer(OFFER)))
      .toEqual({
        currentOffer: OFFER,
        reviews: [],
        neighborsOffers: {},
      });
  });

  it('download reviews', () => {
    const state = {
      currentOffer: {} as Offer,
      reviews: [],
      neighborsOffers: {},
    };

    expect(property.reducer(state, setReviews(REVIEWS)))
      .toEqual({
        currentOffer: {} as Offer,
        reviews: REVIEWS,
        neighborsOffers: {},
      });
  });

  it('download neighbors offers', () => {
    const state = {
      currentOffer: {} as Offer,
      reviews: [],
      neighborsOffers: {},
    };

    expect(property.reducer(state, setNeighborsOffers(OFFERS)))
      .toEqual({
        currentOffer: {} as Offer,
        reviews: [],
        neighborsOffers: OFFERS,
      });
  });
});
