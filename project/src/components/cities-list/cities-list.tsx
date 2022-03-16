import { useAppDispatch } from '../../hooks';
import { getCurrentCity } from '../../store/action';

interface CitiesListProps {
  cities: string[],
  currentCity: string
}

export function CitiesList({ cities, currentCity }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();


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
}
