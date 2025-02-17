import React from 'react';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

// Define the type for points array and the HeatmapLayerProps
export type Point = [number, number, number?]; // [latitude, longitude, optional intensity]
interface HeatmapLayerProps {
  points: Point[];
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    // Initialize the heat layer with data points and options
    const heatLayer = L.heatLayer(points, {
      radius: 20,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    // Cleanup: Remove the heat layer on unmount or when options change
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

export default HeatmapLayer;
