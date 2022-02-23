import { Link } from 'react-router-dom';
import {Offer} from '../app/app';
import { FavoritePlaceCard } from '../favorite-place-card/favorite-place-card';

interface FavoriteLocationItemProps {
  city: string,
  offers: Offer[]
}

export function FavoriteLocationItem({ city, offers }: FavoriteLocationItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="/">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer)=> <FavoritePlaceCard key={offer.id} {...offer}/>)}

      </div>
    </li>
  );
}
