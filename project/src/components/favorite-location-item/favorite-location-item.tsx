import { Link } from 'react-router-dom';
import {Offer} from '../../types/offer.types';
import { FavoritePlaceCard } from '../favorite-place-card/favorite-place-card';

interface FavoriteLocationItemProps {
  cityName: string,
  offers: Offer[]
}

export function FavoriteLocationItem({ cityName, offers }: FavoriteLocationItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="/">
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer)=> <FavoritePlaceCard key={offer.id} {...offer}/>)}

      </div>
    </li>
  );
}
