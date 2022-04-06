import { memo } from 'react';
import { useAppDispatch } from '../../hooks';
import { setCurrentCity } from '../../store/current-city/current-city';
import { CITIES } from './cities';

interface CitiesListProps {
  currentCity: string
}

export const CitiesList = memo(({ currentCity }: CitiesListProps): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city: string) => {
        const locationClassName = currentCity === city ? 'tabs__item--active' : '';
        return (
          <li className="locations__item" key={city}>
            <a className={`locations__item-link tabs__item ${locationClassName}`} href="/"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(setCurrentCity(city));
              }}
            >
              <span>{city}</span>
            </a>
          </li>);
      },
      )}
    </ul>
  );
});

CitiesList.displayName = 'CitiesList';
