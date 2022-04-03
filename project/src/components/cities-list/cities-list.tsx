/*eslint-disable*/
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentCity } from '../../store/action';

interface CitiesListProps {
  currentCity: string
}

export const CitiesList = memo(({ currentCity }: CitiesListProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.cities);


  return (
    <ul className="locations__list tabs__list">
      {cities.map((city: string) => {
        const locationClassName = currentCity === city ? 'tabs__item--active' : '';
        return (
          <li className="locations__item" key={city}>
            <a className={`locations__item-link tabs__item ${locationClassName}`} href="/"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(getCurrentCity(city));
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
