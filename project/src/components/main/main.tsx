import { Offer } from '../app/app';
import { Link } from 'react-router-dom';
import { OffersList } from '../offers-list/offers-list';
import { Map } from '../map/map';
import { useAppSelector } from '../../hooks';
import { CitiesList } from '../cities-list/cities-list';
import { OffersSort } from '../offers-sort/offers-sort';

interface MainProps {
  offers: Offer[],
}

function getOffersSortingFunction(sortType: 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first') {
  switch (sortType) {
    case 'Popular':
      return;
    case 'Price: low to high':
      return function (a: Offer, b: Offer) { return a.price - b.price; };
    case 'Price: high to low':
      return function (a: Offer, b: Offer) { return b.price - a.price; };
    case 'Top rated first':
      return function (a: Offer, b: Offer) { return b.rating - a.rating; };
  }
}

export function Main({ offers }: MainProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  const cities: string[] = useAppSelector((state) => state.cities);
  const offersSort = useAppSelector((state) => state.offersSort);

  const currentOffers = offers.filter((offer) => offer.city.name === currentCity).sort(getOffersSortingFunction(offersSort));
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="mailto:Oliver.conner@gmail.com">
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

      <main className={`page__main page__main--index ${!currentOffers.length ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities} currentCity={currentCity} />
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
