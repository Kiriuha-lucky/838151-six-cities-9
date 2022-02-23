interface RatingStarsProps {
  rating: number
}

export function RatingStars({ rating }: RatingStarsProps): JSX.Element {
  const MAX_STARS = 5;
  const STYLE_STAR = {
    width: rating * 100 / MAX_STARS,
  };

  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={STYLE_STAR}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
