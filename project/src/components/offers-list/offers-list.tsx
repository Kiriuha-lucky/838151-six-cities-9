import { useAppDispatch } from '../../hooks';
import { selectedOfferId } from '../../store/active-offer/active-offer';
import { Offer } from '../../types/offer.types';
import { PlaceCard } from '../place-card/place-card';

interface OffersListProps {
  offers: Offer[],
  className?: 'near-places',
}

export function OffersList({ offers, className }: OffersListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const listClassName = !className ? 'cities__places-list' : `${className}__list`;

  return (
    <ul className={`${listClassName} places__list tabs__content`} style={{ listStyle: 'none' }}>
      {offers.map((offer) => className === 'near-places' ? (
        <li key={offer.id}>
          <PlaceCard {...offer} className={className} />
        </li>
      ) : (
        <li key={offer.id}
          onMouseEnter={() => { dispatch(selectedOfferId(offer.id)); }}
          onMouseLeave={() => { dispatch(selectedOfferId(0)); }}
        >
          <PlaceCard {...offer} className={className} />
        </li>
      ))}
    </ul>
  );
}


