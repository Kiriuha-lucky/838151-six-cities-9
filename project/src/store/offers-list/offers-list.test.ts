import { offersList, setOffers, updateOffers } from './offers-list';
import { OFFERS, OFFER } from './../../utils/mocks';

describe('Reducer: offersList', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersList.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({});
  });

  it('download offers', () => {
    const state = {};

    expect(offersList.reducer(state, setOffers(OFFERS)))
      .toEqual(OFFERS);
  });

  it('update offer in offers', () => {
    const state = OFFERS;
    const newOffers = { ...state, [OFFER.id]: OFFER };

    expect(offersList.reducer(state, updateOffers({id: OFFER.id, offer: OFFER})))
      .toEqual(newOffers);
  });
});
