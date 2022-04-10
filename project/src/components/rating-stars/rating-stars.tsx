import { memo } from 'react';

interface RatingStarsProps {
  rating: number,
  children?: JSX.Element,
  className: 'reviews' | 'property' | 'place-card'
}

const MAX_STARS = 5;

export const RatingStars = memo(({ rating, children, className }: RatingStarsProps): JSX.Element => {
  const styleStar = {
    width: `${Math.round(rating) * 100 / MAX_STARS}%`,
  };

  return (
    <div className={`${className}__rating rating`}>
      <div className={`${className}__stars rating__stars`}>
        <span style={styleStar}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
}, (prevProps, nextProps)=> prevProps.rating === nextProps.rating);

RatingStars.displayName = 'RatingStars';
