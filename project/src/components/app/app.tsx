import { Main } from '../main/main';

interface AppProps {
  offersCount: number,
  offers: {
    id: number,
    mark: boolean,
    previewImage: string,
    price: number,
    rating: number,
    name: string,
    type: string,
  }[]
}

export function App({ offersCount, offers }: AppProps): JSX.Element {
  return (
    <Main offersCount={offersCount} offers={offers} />
  );
}
