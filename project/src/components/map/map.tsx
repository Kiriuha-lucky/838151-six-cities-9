import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from './useMap';
import { Offer } from '../app/app';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

interface MapProps {
  offers: Offer[]
}

export function Map({ offers }: MapProps) {
  const city = offers[0].city.location;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  /* eslint-disable*/
  //eslint-disable before use currentCustomIcon
  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  /* eslint-enable*/

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.city.location.latitude,
            lng: offer.city.location.longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers]);

  return (
    <section className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}
