import { Main } from '../main/main';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

interface AppProps {
  offersCount: number,
  offers: Offer[]
}

export interface Offer {
  id: number,
  mark: boolean,
  previewImageSrc: string,
  price: number,
  rating: number,
  name: string,
  type: string,
}

export function App({ offersCount, offers }: AppProps): JSX.Element {
  return (
    <Main offersCount={offersCount} offers={offers} />
  );
}
