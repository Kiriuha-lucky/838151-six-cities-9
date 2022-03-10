import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from './useMap';
import { Offer } from '../app/app';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './const';

interface MapProps {
  offers: Offer[],
  selectedOfferId?: number
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
/* eslint-disable*/
//eslint-disable before use currentCustomIcon
const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
/* eslint-enable*/

export function Map({ offers, selectedOfferId }: MapProps): JSX.Element {
  const city = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

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
