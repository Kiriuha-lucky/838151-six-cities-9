import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const OFFER_COUNT = 100;

ReactDOM.render(
  <React.StrictMode>
    <App
      offerCount={OFFER_COUNT}
    />
  </React.StrictMode>,
  document.getElementById('root'));
