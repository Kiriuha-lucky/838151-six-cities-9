import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/app';
import { store } from './store';
import { requireAuthAction } from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(requireAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
