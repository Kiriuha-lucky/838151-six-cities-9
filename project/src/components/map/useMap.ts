import { useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';

export type City = {
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  },
  name: string,
}
export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (map) {
      map?.setView({
        lat: city.location.latitude,
        lng: city.location.longitude,
      });
      return;
    }

    const instance = new Map(mapRef.current, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom,
    });

    const layer = new TileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    );
    instance.addLayer(layer);
    setMap(instance);
  }, [map, mapRef, city]);
  return map;
}
