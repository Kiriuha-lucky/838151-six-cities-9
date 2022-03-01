import { useState } from 'react';
import { Offer } from '../app/app';
import { PlaceCard } from '../place-card/place-card';

interface OffersListProps {
  offers: Offer[]
}

export function OffersList({ offers }: OffersListProps): JSX.Element {
  /* eslint-disable */
  // after using activeCard variable delete eslint-disabled
  const [activeCard, setActiveCard] = useState<number>();
  /* eslint-enable */


  return (
    <ul className="cities__places-list places__list tabs__content" style={{ listStyle: 'none' }}>
      {offers.map((offer) => {
        const { id } = offer;
        return <li key={id} onMouseEnter={() => { setActiveCard(id); }}><PlaceCard {...offer} /></li>;
      })}
    </ul>
  );
}
