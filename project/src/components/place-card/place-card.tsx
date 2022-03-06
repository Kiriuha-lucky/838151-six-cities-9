import { Offer } from '../app/app';
import { Link } from 'react-router-dom';
import { RatingStars } from '../rating-stars/rating-stars';

type PlaceCardProps = Offer & {
  className?: string
}

export function PlaceCard({ id, isPremium, previewImage, price, rating, title, type, className}: PlaceCardProps): JSX.Element {
  return (
    <article className={` ${!className ? 'cities__place-card' : `${className}__card`} place-card`}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={` ${!className ? 'cities__image-wrapper' : `${className}__image-wrapper`} place-card__image-wrapper`}>
        <a href="/">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
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
          <RatingStars rating={rating} className='place-card' />
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
