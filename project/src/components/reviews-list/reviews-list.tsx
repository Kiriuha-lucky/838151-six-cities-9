import {ReviewType} from '../app/app';
import { Review } from '../review/review';

interface ReviewsListProps {
  reviews: ReviewType[]
}

export function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (<li key={review.id} className="reviews__item"><Review {...review} /></li>))}
    </ul>
  );
}
