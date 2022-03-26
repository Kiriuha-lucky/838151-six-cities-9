import { Navigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { OfferImage } from '../offer-image';
import { OfferInsideItem } from '../offer-inside-item/offer-inside-item';
import { RatingStars } from '../rating-stars/rating-stars';
import { ReviewForm } from '../review-form/review-form';
import { OffersList } from '../offers-list/offers-list';
import { Map } from '../map/map';
import { ReviewsList } from '../reviews-list/reviews-list';
import { Header } from '../header/header';
import { fetchOfferAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Spinner } from '../spinner/spinner';
import { useEffect } from 'react';
import { dataLoaded } from '../../store/action';
import { AuthorizationStatus } from '../../types/authorization.types';

const IMG_COUNT_ON_OFFER_PAGE = 6;

export function Property(): JSX.Element {
  const offerId = Number(useParams().id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dataLoaded(false));
    dispatch(fetchOfferAction(offerId));
  }, [offerId, dispatch]);

  const { isDataLoaded, authorizationStatus } = useAppSelector((st) => st);
  const { currentOffer, reviews, neighborsOffers } = useAppSelector((st) => st.offer);

  if (!isDataLoaded) {
    return (
      <Spinner />
    );
  }

  if (!currentOffer.id) {
    return (<Navigate to={AppRoutes.NotFound} />);
  }

  return (
    <div className="page" >
      <Header />
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
                {currentOffer.isFavorite ? (
                  <button className='property__bookmark-button property__bookmark-button--active button' type="button">
                    <svg className="property__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">In bookmarks</span>
                  </button>
                ) : (
                  <button className='property__bookmark-button button' type="button">
                    <svg className="property__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                )}
              </div>
              <div className="property__rating rating">
                <RatingStars rating={currentOffer.rating} className='property'>
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
              {reviews.length !== 0 ? (
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews · <span className="reviews__amount">{reviews.length}</span>
                  </h2>
                  <ReviewsList reviews={reviews} />
                  {authorizationStatus === AuthorizationStatus.Auth ? (
                    <ReviewForm />
                  ) : (<div></div>)}
                </section>
              ) : (
                <div></div>
              )}

            </div>
          </div>
          <section className="property__map map">
            <Map offers={neighborsOffers} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList offers={neighborsOffers} className='near-places' />
          </section>
        </div>
      </main>
    </div >
  );
}

