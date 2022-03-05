import { Link, Navigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { OfferImage } from '../offer-image';
import { Offer, ReviewType } from '../app/app';
import { OfferInsideItem } from '../offer-inside-item/offer-inside-item';
import { RatingStars } from '../rating-stars/rating-stars';
import { ReviewForm } from '../review-form/review-form';
import { Review } from '../review/review';
import { OffersList } from '../offers-list/offers-list';
import { Map } from '../map/map';
interface PropertyProps {
  offers: Offer[],
  reviews: ReviewType[]
}

const IMG_COUNT_ON_OFFER_PAGE = 6;

export function Property({ offers, reviews }: PropertyProps): JSX.Element {
  const offerId = useParams().id;
  const currentOffer = offers.find((offer) => offer.id === Number(offerId));

  if (!currentOffer) {
    return (<Navigate to={AppRoutes.NotFound} />);
  }
  return (
    <div className="page" >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer.images.slice(0, IMG_COUNT_ON_OFFER_PAGE).map((image) => <OfferImage key={image} imageSrc={image} />)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <RatingStars rating={currentOffer.rating} componentClassName='property'>
                  <span className="property__rating-value rating__value">{currentOffer.rating}</span>
                </RatingStars>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${currentOffer.bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${currentOffer.maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">{`€${currentOffer.price}`}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentOffer.goods.map((good) => <OfferInsideItem key={good} goodName={good} />)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={`${currentOffer.host.avatarUrl}`}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro &&
                    <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ul className="reviews__list">
                  {reviews.map((review) => (<li key={review.id} className="reviews__item"><Review {...review} /></li>))}
                </ul>
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map offers={offers.filter((offer) => offer.city.name === currentOffer.city.name).slice(0, 3)} componentClassName='property' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList offers={offers.filter((offer) => offer.city.name === currentOffer.city.name).slice(0, 3)} componentClassName='near-places' />
          </section>
        </div>
      </main>
    </div >
  );
}

