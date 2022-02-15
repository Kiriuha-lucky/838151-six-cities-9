import Main from '../main/main';

type AppScreenProps = {
  offerCount: number;
};

function App({offerCount}: AppScreenProps): JSX.Element {
  return (
    <Main offerCount = {offerCount}/>
  );
}

export default App;
