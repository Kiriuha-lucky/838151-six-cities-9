export enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  Login = '/login',
  Property = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOWN'
}
