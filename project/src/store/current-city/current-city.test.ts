import { currentCity, setCurrentCity } from './current-city';

describe('Reducer: currentCity', () => {
  it('without additional parameters should return initial state', () => {
    expect(currentCity.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual('Paris');
  });

  it('should change current city to "Amsterdam"', () => {
    const state = 'Paris';

    expect(currentCity.reducer(state, setCurrentCity('Amsterdam')))
      .toEqual('Amsterdam');
  });
});
