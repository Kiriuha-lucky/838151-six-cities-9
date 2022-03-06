import { useState } from 'react';
import { Offer } from '../app/app';
import { PlaceCard } from '../place-card/place-card';

interface OffersListProps {
  offers: Offer[],
  className?: string,
}

export function OffersList({ offers, className: componentClassName}: OffersListProps): JSX.Element {
  /* eslint-disable */
  // after using activeCard variable delete eslint-disabled
  const [activeCard, setActiveCard] = useState<number>();
  /* eslint-enable */

  const listClassName = !componentClassName ? 'cities__places-list' : `${componentClassName}__list`;


  return (
    <ul className={`${listClassName} places__list tabs__content`} style={{ listStyle: 'none' }}>
      {offers.map((offer) => {
        const { id } = offer;
        return <li key={id} onMouseEnter={() => { setActiveCard(id); }}><PlaceCard {...offer} componentClassName={componentClassName} /></li>;
      })}
    </ul>
  );
}
