import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../types/authorization.types';
import { logoutAction } from '../../store/api-actions';
import { memo } from 'react';
import { getAuthorizationStatus } from './../../store/selectors/selectors';
import { APIRoute } from '../../types/api.types';

export const Header = memo((): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(({ user }) => user);
  const isAuthorized = authorizationStatus !== AuthorizationStatus.Auth;

  const logout = function (evt: React.SyntheticEvent) {
    evt.preventDefault();

    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {isAuthorized ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to='/login'>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={APIRoute.FavoritesOffers}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img src={currentUser.avatarUrl} alt="avatar" />
                    </div>
                    <span className="header__user-name user__name">{currentUser.email}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" onClick={logout} href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header >
  );
});

Header.displayName = 'Header';
