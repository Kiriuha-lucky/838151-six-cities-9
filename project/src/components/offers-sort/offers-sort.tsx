import { memo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector, useOnClickOutside } from '../../hooks';
import { offersSort } from '../../store/control/control';
import { OffersSortingType } from '../../types/state';
import { SORT_TYPES } from '../../types/sort-type';
import './offers-sort.css';

export const OffersSort = memo((): JSX.Element => {
  const [open, setOpen] = useState(false);
  const sortClassName = open ? 'places__options--opened' : '';
  const arrowClassName = open ? 'places__sorting-arrow places__sorting-arrow--open' : 'places__sorting-arrow';
  const dispatch = useAppDispatch();
  const offersSortActive = useAppSelector(({ control }) => control.offersSortingType);

  function handleSortClick(sortType: OffersSortingType) {
    dispatch(offersSort(sortType));
  }

  function handleOpenClick() {
    setOpen(!open);
  }

  const formRef = useRef(null);

  useOnClickOutside(formRef, () => setOpen(false));

  return (
    <form className="places__sorting" action="#" method="get" ref={formRef}>
      <span className="places__sorting-caption" onClick={handleOpenClick}>Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleOpenClick}>
        {offersSortActive}
        <svg className={arrowClassName} width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortClassName}`} onClick={handleOpenClick}>
        {SORT_TYPES.map((sortType) => <li key={sortType} className={`places__option ${sortType === offersSortActive ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => handleSortClick(sortType)}>{sortType}</li>)}
      </ul>
    </form>
  );
});

OffersSort.displayName = 'OffersSort';

