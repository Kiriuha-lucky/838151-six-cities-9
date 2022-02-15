import Main from '../main/main';

interface AppProps {
  offersCount: number
}

function App({offersCount}: AppProps): JSX.Element {
  return (
    <Main offerCount = {offersCount}/>
  );
}

export default App;
