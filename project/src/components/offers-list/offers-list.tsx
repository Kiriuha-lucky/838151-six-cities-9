import { useAppDispatch } from '../../hooks';
import { selectedOfferId } from '../../store/action';
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
      {offers.map((offer) => {
        const { id } = offer;
        return (
          <li key={id}
            onMouseEnter={() => { dispatch(selectedOfferId(id)); }}
            onMouseLeave={() => { dispatch(selectedOfferId(0)); }}
          >
            <PlaceCard {...offer} className={className} />
          </li>);
      })}
    </ul >
  );
}
