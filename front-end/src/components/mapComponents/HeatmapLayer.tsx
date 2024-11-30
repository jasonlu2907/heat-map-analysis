import React from 'react';
import { useMap, GeoJSON } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import { arlingtonGeoJSON } from '../../assets/arlington';

// Define the type for points array and the HeatmapLayerProps
export type Point = [number, number, number?]; // [latitude, longitude, optional intensity]
interface HeatmapLayerProps {
  points: Point[];
  opacity: number;
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ points, opacity }) => {
  const map = useMap();

  useEffect(() => {
    // Initialize the heat layer with data points and options
    const heatLayer = L.heatLayer(points, {
      radius: 20,
      blur: 15,
      maxZoom: 17,
      opacity: opacity,
    }).addTo(map);

    // TODO: make this geoJSON a component
    const borderLayer = L.geoJSON(arlingtonGeoJSON as GeoJSON.GeoJsonObject, {
      style: {
        color: 'black',
        weight: 1.5,
        opacity: 0.4,
      },
    }).addTo(map);

    // Cleanup: Remove the heat layer on unmount or when options change
    return () => {
      map.removeLayer(heatLayer);
      map.removeLayer(borderLayer);
    };
  }, [map, points, opacity]);

  return null;
  // return <GeoJSON data={arlingtonGeoJSON as GeoJSON.GeoJsonObject} />;
};

export default HeatmapLayer;
