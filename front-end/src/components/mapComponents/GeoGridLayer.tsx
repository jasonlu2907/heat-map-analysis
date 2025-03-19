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
  const map = useMap();

  useEffect(() => {
    fetch("/arlington_grid_dummy.geojson") // Adjust path if needed
      .then((response) => response.json())
      .then((data) => {
        setGridData(data.features);
        console.log("Loaded GeoJSON Data:", data);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  return (
    <>
      {gridData.map((feature, index) => {
        const risk = feature.properties.predicted_risk;
        const coordinates = feature.geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]); // Swap [lon, lat] -> [lat, lon]

        return (
          <Polygon
            key={index}
            positions={coordinates}
            pathOptions={{ color: getColor(risk), fillOpacity: 0.3 }}
          >
            <Tooltip sticky>
              <strong>Risk Score:</strong> {risk}
            </Tooltip>
          </Polygon>
        );
      })}
    </>
  );
};

export default GeoGridLayer;
