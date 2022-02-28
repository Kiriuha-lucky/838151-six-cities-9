interface RatingStarsProps {
  rating: number,
  children?: JSX.Element,
  componentClassName: string
}

const MAX_STARS = 5;

export function RatingStars({ rating, children, componentClassName }: RatingStarsProps): JSX.Element {
  const styleStar = {
    width: `${rating* 100 / MAX_STARS  }%`,
  };

  return (
    <div className={`${componentClassName}__rating rating`}>
      <div className={`${componentClassName}__stars rating__stars`}>
        <span style={styleStar}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
}
