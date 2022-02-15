import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const OFFERS_COUNT = 100;

ReactDOM.render(
  <React.StrictMode>
    <App
      offersCount={OFFERS_COUNT}
    />
  </React.StrictMode>,
  document.getElementById('root'));
