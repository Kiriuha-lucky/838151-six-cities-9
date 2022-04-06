import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer.types';
import { Bookmark } from '../bookmark/bookmark';
import { RatingStars } from '../rating-stars/rating-stars';

export function FavoritePlaceCard({ id, isPremium, isFavorite, previewImage, price, type, title, rating }: Offer): JSX.Element {
  return (
    <article className="favorites__card place-card">
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="/">
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place" />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark id={id} className='place-card' width={18} height={19} isFavorite={isFavorite} />
        </div>
        <RatingStars rating={rating} className='place-card' />
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
