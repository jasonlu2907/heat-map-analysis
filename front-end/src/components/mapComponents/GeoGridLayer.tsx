import React, { useEffect, useState } from "react";
import { Polygon, Tooltip, useMap } from "react-leaflet";

// Function to determine color based on risk score
const getColor = (risk: number) => {
  return risk > 0.8 ? "red" :
         risk > 0.6 ? "orange" :
         risk > 0.4 ? "yellow":
         risk > 0.2 ? "green" : "blue";
};

const GeoGridLayer: React.FC = () => {
  const [gridData, setGridData] = useState<any[]>([]);
  const [riskValues, setRiskValues] = useState<number[]>([]);
  const map = useMap();

  useEffect(() => {
    fetch("/arlington_grid_no_risk.geojson") 
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

  return (
    <>
      {gridData.map((feature, index) => {
        const risk = riskValues[index] || 0; // Assign risk based on index
        const coordinates = feature.geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]); // Swap [lon, lat] -> [lat, lon]

        return (
          <Polygon
            key={index}
            positions={coordinates}
            pathOptions={{ color: getColor(risk), fillOpacity: 0.6 }}
          >
            <Tooltip sticky>
              <strong>Risk Score:</strong> {risk.toFixed(2)}
            </Tooltip>
          </Polygon>
        );
      })}
    </>
  );
};

export default GeoGridLayer;