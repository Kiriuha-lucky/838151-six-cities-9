import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from './useMap';
import { Offer } from '../../types/offer.types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './const';
import { useAppSelector } from '../../hooks';

interface MapProps {
  offers: Offer[],
  currentOffer?: Offer,
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

export function Map({ offers, currentOffer }: MapProps): JSX.Element {
  const city = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  let selectedOfferId = 0;
  const selectedOfferFromStore = useAppSelector(({ activeOffer }) => activeOffer);
  if(currentOffer) {
    selectedOfferId = currentOffer.id;
    offers.push(currentOffer);
  } else {
    selectedOfferId = selectedOfferFromStore;
  }

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
