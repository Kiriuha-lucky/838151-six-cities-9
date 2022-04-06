import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toogleFavorites } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/selectors/selectors';
import { AuthorizationStatus } from '../../types/authorization.types';
import { AppRoutes } from '../../types/routes.types';

interface BookmarkProps {
  id: number,
  isFavorite: boolean,
  width: number,
  height: number,
  className: string
}

export function Bookmark({ id, isFavorite, width, height, className }: BookmarkProps): JSX.Element {
  const activeClass = isFavorite ? `${className}__bookmark-button--active` : '';
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loc = useLocation().pathname;

  const toogleBookmark = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      return navigate(AppRoutes.Login);
    }

    return isFavorite ? dispatch(toogleFavorites({ id: id, isFavorite: 0, loc: loc })) : dispatch(toogleFavorites({ id: id, isFavorite: 1, loc: loc }));
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
