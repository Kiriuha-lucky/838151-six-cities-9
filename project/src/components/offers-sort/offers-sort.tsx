import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { offersSort } from '../../store/action';
import { SORT_TYPES } from '../../types/sort-type';
/* eslint-disable*/
export function OffersSort(): JSX.Element {
  const [open, setOpen] = useState(false);

  const sortClassName = open ? 'places__options--opened' : '';
  const dispatch = useAppDispatch();
  const offersSortActive = useAppSelector((state) => state.offersSort);



  const arrowStyle = {
    transform: 'rotate(180deg)',
  }

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => setOpen(!open)}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {offersSortActive}
        <svg className="places__sorting-arrow" style={open ? arrowStyle : {}} width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortClassName}`} >
        {SORT_TYPES.map((sortType) => <li key={sortType} className={`places__option ${sortType === offersSortActive ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => { dispatch(offersSort(sortType)); }}>{sortType}</li>)}
      </ul>
    </form>
  );
}
