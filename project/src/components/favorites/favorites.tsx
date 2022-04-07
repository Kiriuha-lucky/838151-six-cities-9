import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesOffersAction } from '../../store/api-actions';
import { FavoriteLocationItem } from '../favorite-location-item/favorite-location-item';
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

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoritesOffers.length ?
            (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {cityNames.map((city) => <FavoriteLocationItem key={city} cityName={city} offers={favoritesOffers.filter((offer) => offer.city.name === city)} />)}
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
