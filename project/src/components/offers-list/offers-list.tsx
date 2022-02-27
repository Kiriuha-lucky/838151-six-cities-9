import { useState } from 'react';
import { Offer } from '../app/app';
import { PlaceCard } from '../place-card/place-card';

interface OffersListProps {
  offers: Offer[]
}

export function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<number>();

  return (
    <ul className="cities__places-list places__list tabs__content">
      {offers.map((offer) => {
        const { id } = offer;
        return <li key={id} onMouseEnter={() => { setActiveCard(id); }}>{activeCard}<PlaceCard {...offer} /></li>;
      })}
    </ul>
  );
}
