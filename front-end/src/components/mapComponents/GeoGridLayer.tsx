import React, { useEffect, useState } from "react";
import { Polygon, Popup, useMap } from "react-leaflet";

// Function to determine color based on risk score
const getColor = (risk: number) => {
  return risk > 0.8 ? "rgba(221, 40, 40, 0.95)" :
         risk > 0.6 ? "rgba(255, 130, 24, 0.95)" :
         risk > 0.4 ? "rgba(245, 245, 29, 0.95)" :
         risk > 0.2 ? "rgba(32, 221, 28, 0.95)" :
         risk > 0.1 ? "rgba(67, 89, 242, 0.95)" : 
                      "rgba(0, 0, 0, 0)";
};

interface GeoGridLayerProps {
  gridColors: Record<string, boolean>;
}

const GeoGridLayer: React.FC<GeoGridLayerProps> = ({gridColors}) => {
  
  const [gridData, setGridData] = useState<any[]>([]);
  const [riskValues, setRiskValues] = useState<number[]>([]);
  const [selectedPolygon, setSelectedPolygon] = useState<number | null>(null); // Track clicked polygon

  const map = useMap();

  useEffect(() => {
    fetch("/src/assets/arlington_grid_no_risk.geojson") 
      .then((response) => response.json())
      .then((data) => {
        setGridData(data.features);
        console.log("Loaded GeoJSON Data:", data);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));

    // Fetch the predicted risk values
    fetch("/predicted_risk_values.json")
    .then((response) => response.json())
    .then((data) => {
      setRiskValues(data);
      console.log("Loaded Risk Values:", data);
    })
    .catch((error) => console.error("Error loading risk values:", error));
  }, []);

  useEffect(() => {
    console.log("GRID COLORS UPDATED:", gridColors);
  }, [gridColors]);

  return (
    <>
      {gridData.map((feature, index) => {
        const risk = riskValues[index] || 0; // Assign risk based on index
        const color = getColor(risk);
        const coordinates = feature.geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]); // Swap [lon, lat] -> [lat, lon]
        
        const isVisible = gridColors[color] ?? true;
        return (
          <Polygon
            key={index}
            positions={coordinates}
            pathOptions={{ color: color, fillOpacity: isVisible? 0.6 : 0, opacity: isVisible ? 1 : 0 }}
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