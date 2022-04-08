import { sort, setOffersSort } from './sort';

describe('Reducer: activeOffer', () => {
  it('without additional parameters should return initial state', () => {
    expect(sort.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual('Popular');
  });

  it('chahnge sort type to "Price: low to high"', () => {
    const state = 'Popular';

    expect(sort.reducer(state, setOffersSort('Price: low to high')))
      .toEqual('Price: low to high');
  });
});
