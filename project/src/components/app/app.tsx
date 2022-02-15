import {Main} from '../main/main';

interface AppProps {
  offersCount: number
}

export function App({offersCount}: AppProps): JSX.Element {
  return (
    <Main offersCount = {offersCount}/>
  );
}
