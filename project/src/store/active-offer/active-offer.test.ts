import { activeOffer, selectedOfferId } from './active-offer';

describe('Reducer: activeOffer', () => {
  it('without additional parameters should return initial state', () => {
    expect(activeOffer.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(0);
  });

  it('should change selected offer to "1"', () => {
    const state = 0;

    expect(activeOffer.reducer(state, selectedOfferId(1)))
      .toEqual(1);
  });
});
