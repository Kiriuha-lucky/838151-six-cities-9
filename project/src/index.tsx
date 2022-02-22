import React from 'react';
import ReactDOM from 'react-dom';
import { App} from './components/app/app';
import { OFFERS } from './mocks/offers';

const OFFERS_COUNT = 100;

ReactDOM.render(
  <React.StrictMode>
    <App
      offersCount={OFFERS_COUNT}
      offers={OFFERS}
    />
  </React.StrictMode>,
  document.getElementById('root'));
