import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesOffersAction } from '../../store/api-actions';
import { FavoriteLocationItem } from '../favorite-location-item/favorite-location-item';
import { Header } from '../header/header';
import { Spinner } from '../spinner/spinner';

export function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const favoritesOffers = Object.values(useAppSelector(({ favoritesOffersList }) => favoritesOffersList));

  const fetchData = async () => {
    await dispatch(fetchFavoritesOffersAction());
    setIsDataLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cityNames = favoritesOffers.reduce((uniqCityNames: string[], offer) => {
    if (!uniqCityNames.includes(offer.city.name)) {
      uniqCityNames.push(offer.city.name);
    }
    return uniqCityNames;
  }, []);

  if (!isDataLoaded) {
    return (
      <Spinner />
    );
  }

  const filteredOffers = (city: string) => favoritesOffers.filter((offer) => offer.city.name === city);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoritesOffers.length ?
            (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {cityNames.map((city) => <FavoriteLocationItem key={city} cityName={city} offers={filteredOffers(city)} />)}
                </ul>
              </section>
            ) : (
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </section>
            )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
