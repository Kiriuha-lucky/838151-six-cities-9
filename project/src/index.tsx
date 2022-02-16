import React from 'react';
import ReactDOM from 'react-dom';
import { App, Offer } from './components/app/app';

const OFFERS_COUNT = 100;

const OFFERS: Offer[] = [
  {
    id: 1,
    mark: true,
    previewImageSrc: 'img/apartment-01.jpg',
    price: 120,
    rating: 80,
    name: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    id: 2,
    mark: false,
    previewImageSrc: 'img/room.jpg',
    price: 80,
    rating: 80,
    name: 'Wood and stone place',
    type: 'Private room',
  },
  {
    id: 3,
    mark: false,
    previewImageSrc: 'img/apartment-02.jpg',
    price: 132,
    rating: 80,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    id: 4,
    mark: false,
    previewImageSrc: 'img/apartment-03.jpg',
    price: 180,
    rating: 100,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
  {
    id: 5,
    mark: false,
    previewImageSrc: 'img/room.jpg',
    price: 80,
    rating: 80,
    name: 'Wood and stone place',
    type: 'Private room',
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App
      offersCount={OFFERS_COUNT}
      offers={OFFERS}
    />
  </React.StrictMode>,
  document.getElementById('root'));
