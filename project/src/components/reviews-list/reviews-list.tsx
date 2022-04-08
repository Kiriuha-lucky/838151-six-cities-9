import { ReviewType } from '../../types/review.types';
import { Review } from '../review/review';

interface ReviewsListProps {
  reviews: ReviewType[]
}

export function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const MAX_RIVIEWS_ON_PAGE = 10;

  return (
    <ul className="reviews__list">
      {reviews.slice(0, MAX_RIVIEWS_ON_PAGE).map((review) => (<li key={review.id} className="reviews__item"><Review {...review} /></li>))}
    </ul>
  );
}
