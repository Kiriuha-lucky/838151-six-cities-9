import { useState } from 'react';
import { Offer } from '../app/app';
import { PlaceCard } from '../place-card/place-card';

interface OffersListProps {
  offers: Offer[]
}

export function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(0);

  const cardEnterHandle = (id: number) => {
    setActiveCard(id);
  };

  return (
    <ul className="cities__places-list places__list tabs__content">
      {offers.map((offer) => {
        const { id } = offer;
        return <li key={id}>{activeCard}<PlaceCard {...offer} setActiveCard={cardEnterHandle} /></li>;
      })}
    </ul>
  );
}
