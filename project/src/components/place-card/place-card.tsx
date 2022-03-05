import { Offer } from '../app/app';
import { Link } from 'react-router-dom';
import { RatingStars } from '../rating-stars/rating-stars';

type PlaceCardProps = Offer & {
  componentClassName?: string
}

export function PlaceCard({ id, isFavorite, previewImage, price, rating, title, type, componentClassName }: PlaceCardProps): JSX.Element {
  return (
    <article className={` ${!componentClassName ? 'cities__place-card' : `${componentClassName}__card`} place-card`}>
      {isFavorite &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={` ${!componentClassName ? 'cities__image-wrapper' : `${componentClassName}__image-wrapper`} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <RatingStars rating={rating} componentClassName='place-card' />
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
