interface RatingStarsProps {
  rating: number,
  children?: JSX.Element,
  component: string
}

export function RatingStars({ rating, children, component }: RatingStarsProps): JSX.Element {
  const MAX_STARS = 5;
  const STYLE_STAR = {
    width: `${rating* 100 / MAX_STARS  }%`,
  };

  return (
    <div className={`${component}__rating rating`}>
      <div className={`${component}__stars rating__stars`}>
        <span style={STYLE_STAR}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
}
