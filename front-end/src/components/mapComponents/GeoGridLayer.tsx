import { geoJson } from '@/assets/arlington_risks';
import React, { useEffect, useState } from 'react';
import { Polygon, Popup } from 'react-leaflet';

// Function to determine color based on risk score
const getColor = (risk: number) => {
  return risk > 8
    ? 'rgba(221, 40, 40, 0.95)'
    : risk > 6
    ? 'rgba(255, 130, 24, 0.95)'
    : risk > 4
    ? 'rgba(245, 245, 29, 0.95)'
    : risk > 2
    ? 'rgba(32, 221, 28, 0.95)'
    : risk > 1
    ? 'rgba(67, 89, 242, 0.95)'
    : 'rgba(0, 0, 0, 0)';
};

interface GeoGridLayerProps {
  gridColors: Record<string, boolean>;
  riskMap: Record<number, number>;
}

const GeoGridLayer: React.FC<GeoGridLayerProps> = ({ gridColors, riskMap }) => {
  const [gridData, setGridData] = useState<any[]>([]);
  const [selectedPolygon, setSelectedPolygon] = useState<number | null>(null); // Track clicked polygon

  useEffect(() => {
    fetch('/src/assets/arlington_grid_no_risk.geojson')
      .then((response) => response.json())
      .then((data) => {
        setGridData(data.features);
      })
      .catch((error) => console.error('Error loading GeoJSON:', error));
  }, []);

  return (
    <>
      {gridData.map((feature, index) => {
        const gridId = feature.properties.grid_id;
        const risk = riskMap[gridId] ?? 0;
        const color = getColor(risk);
        const coordinates = feature.geometry.coordinates[0].map(
          (coord: number[]) => [coord[1], coord[0]]
        ); // Swap [lon, lat] -> [lat, lon]
        const isVisible = gridColors[color] ?? true;

        return (
          <Polygon
            key={index}
            positions={coordinates}
            pathOptions={{
              color: color,
              fillOpacity: isVisible ? 0.6 : 0,
              opacity: isVisible ? 1 : 0,
            }}
            eventHandlers={{
              click: () => setSelectedPolygon(index), // Set the clicked polygon
            }}
          >
            {selectedPolygon === index && (
              <Popup>
                <strong>Risk Score:</strong> {risk.toFixed(2)}
              </Popup>
            )}
          </Polygon>
        );
      })}
    </>
  );
};

export default GeoGridLayer;
