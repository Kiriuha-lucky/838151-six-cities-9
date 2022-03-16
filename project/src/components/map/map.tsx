import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from './useMap';
import { Offer } from '../app/app';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './const';
import { useAppSelector } from '../../hooks';

interface MapProps {
  offers: Offer[],
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
/* eslint-disable */
export function Map({ offers}: MapProps): JSX.Element {
  const city = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const selectedOfferId = Number(useAppSelector((state) => state.selectedOfferId));

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const icon = selectedOfferId !== undefined && offer.id === selectedOfferId ? currentCustomIcon : defaultCustomIcon;
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(icon)
          .addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%' }}
    >
    </div >
  );
}
