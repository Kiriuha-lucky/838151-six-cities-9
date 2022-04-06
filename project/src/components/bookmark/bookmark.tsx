/*eslint-disable*/
import { useAppDispatch } from '../../hooks';
import { toogleFavorites } from '../../store/api-actions';

interface BookmarkProps {
  id: number,
  isFavorite: boolean,
  width: number,
  height: number,
  className: string
}

export function Bookmark({ id, isFavorite, width, height, className }: BookmarkProps): JSX.Element {
  const activeClass = isFavorite ? `${className}__bookmark-button--active` : '';
  const dispatch = useAppDispatch();
  const toogleBookmark = () => {
    isFavorite ? dispatch(toogleFavorites({ id: id, isFavorite: 0 })) : dispatch(toogleFavorites({ id: id, isFavorite: 1 }));
  };

  return (
    <button className={`${className}__bookmark-button ${activeClass} button`} type="button" onClick={toogleBookmark} >
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}
