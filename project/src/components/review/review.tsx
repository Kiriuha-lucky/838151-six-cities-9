import { ReviewType } from '../../types/review.types';
import { RatingStars } from '../rating-stars/rating-stars';

export function Review({ user, comment, date, rating }: ReviewType): JSX.Element {
  const reviewDate = new Date(date);
  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <RatingStars rating={rating} className='reviews' />
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>
          {reviewDate.toLocaleString('EN', { month: 'long' })} {reviewDate.getFullYear()}
        </time>
      </div>
    </>
  );
}
