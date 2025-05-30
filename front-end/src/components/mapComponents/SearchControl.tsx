import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';
import './SearchControl.css';

// Fix for marker icons in production
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const SearchControl = () => {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        countrycodes: 'us',
        limit: 5,
        addressdetails: 1,
        'accept-language': 'en',
        bounded: 1,
        viewbox: '-125.0, 49.0, -66.9, 24.0',
      },
    });

    const searchControl = GeoSearchControl({
      provider,
      style: 'bar',
      autoClose: true,
      showMarker: true,
      keepResult: true,
      marker: {
        icon: customIcon,
        draggable: false,
      },
      searchLabel: 'Enter an address...',
      notFoundMessage: "Sorry, we couldn't find that location.",
      animateZoom: true,
      retainZoomLevel: false,
    });

    map.addControl(searchControl);

    // Listen for the result event to track the created marker
    map.on('geosearch/showlocation', (e: any) => {
      // Store the marker created by the search control
      if (e.marker) {
        markerRef.current = e.marker;
      }
    });

    // MutationObserver to detect clear button click
    const searchBox = document.querySelector('.leaflet-control-geosearch form');
    const observer = new MutationObserver(() => {
      const input = document.querySelector(
        '.leaflet-control-geosearch input'
      ) as HTMLInputElement;
      if (input && input.value === '' && markerRef.current) {
        map.removeLayer(markerRef.current); // remove the marker from the map
        markerRef.current = null;
      }
    });

    if (searchBox) {
      observer.observe(searchBox, { childList: true, subtree: true });
    }

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation');
      observer.disconnect();
    };
  }, [map]);

  return null;
};

export default SearchControl;
