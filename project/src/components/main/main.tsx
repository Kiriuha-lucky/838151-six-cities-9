import { OffersList } from '../offers-list/offers-list';
import { Map } from '../map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CitiesList } from '../cities-list/cities-list';
import { OffersSort } from '../offers-sort/offers-sort';
import { getCurrentOffers } from './main.utils';
import { Header } from '../header/header';
import { fetchOffersAction } from '../../store/api-actions';
import { useEffect, useState } from 'react';
import { AuthorizationStatus } from '../../types/authorization.types';
import { Spinner } from '../spinner/spinner';
import { getAuthorizationStatus } from './../../store/selectors/selectors';

export function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { offers } = useAppSelector(({ data }) => data);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { currentCity, offersSortingType } = useAppSelector(({ control }) => control);

  const fetchData = async () => {
    await dispatch(fetchOffersAction());
    setIsDataLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentOffers = getCurrentOffers(offers, currentCity, offersSortingType);

  if (authorizationStatus === AuthorizationStatus.Unknown || !isDataLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${!currentOffers.length ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCity={currentCity} />
          </section>
        </div>
        <div className="cities">
          {!currentOffers.length ?
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div> : (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{currentOffers.length} places to stay in {currentCity}</b>
                  <OffersSort />
                  <OffersList offers={currentOffers} />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map offers={currentOffers} />
                  </section>
                </div>
              </div>
            )}
        </div>
      </main >
    </div >
  );
}
