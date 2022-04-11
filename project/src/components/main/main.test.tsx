/*eslint-disable*/
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getByText, queryByText, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Main } from './main';
import { OFFERS } from './../../utils/mocks';
import { HistoryRouter } from '../history-route/history-route';
import * as Redux from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Login } from '../login/login';

const mockStore = configureMockStore();

describe('Component: Main', () => {
  it('should render correctly', async () => {
    const dispatch = jest.fn();

    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const history = createMemoryHistory();
    history.push('/');
    const store = mockStore({
      offersList: OFFERS,
      auth: 'UNKNOWN',
      sort: 'Popular',
      currentCity: 'Paris'
    })

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText(/Tile House/i)[0]).toBeInTheDocument();
    });
  });

  it('should render correctly', async () => {
    const dispatch = jest.fn();

    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const history = createMemoryHistory();
    history.push('/');
    const store = mockStore({
      offersList: OFFERS,
      auth: 'UNKNOWN',
      sort: 'Popular',
      currentCity: 'Paris'
    })

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/'}
              element={<Main />}
            />
            <Route
              path={'login'}
              element={<Login />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/Password/i)).not.toBeInTheDocument();

      userEvent.click(screen.getByText('Sign in'));

      expect(screen.getByText(/Password/i)).toBeInTheDocument();
    });
  });
});
