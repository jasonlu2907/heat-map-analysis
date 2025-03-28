import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

// Define a type for heatmap points
type Point = [number, number, number?]; // [latitude, longitude, intensity]

// Function to calculate the centroid (center) of a polygon
const calculateCentroid = (coordinates: number[][]): [number, number] => {
    let latSum = 0, lonSum = 0, count = coordinates.length;
    coordinates.forEach(([lon, lat]) => {
      latSum += lat;
      lonSum += lon;
    });
    const centroid: [number, number] = [latSum / count, lonSum / count];
    
    console.log("Centroid:", centroid); 
    
    return centroid;
  };
  
const GeoRiskHeatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<Point[]>([]);
  const map = useMap();

  useEffect(() => {
    fetch("/arlington_grid_no_risk.geojson")
      .then((res) => res.json())
      .then((geoData) => {
        fetch("/predicted_risk_values.json")
          .then((res) => res.json())
          .then((riskData: number[]) => {
            const features = geoData.features;
            const heatPoints: Point[] = features.map((feature: any, index: number) => {
              const coords = feature.geometry.coordinates[0]; // Get polygon outline
              const [lat, lon] = calculateCentroid(coords); // Compute centroid
              const intensity = riskData[index] ?? 0; // Assign risk value
              return [lat, lon, intensity]; // Convert to [latitude, longitude, intensity]
            });

            setHeatmapData(heatPoints);
          });
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  useEffect(() => {
    if (!map || heatmapData.length === 0) return;

    // Create the heatmap layer
    const heatLayer = L.heatLayer(heatmapData, {
        radius: 18,  // Reduce radius to make hotspots clearer
        blur: 12,    // Reduce blur to prevent over-smoothing
        maxZoom: 15, // Limit max zoom intensity
        minOpacity: 0.3, // Ensure heatmap stays visible
        max: 1.0     // Keep max intensity at 1
      });      

    heatLayer.addTo(map);

    return () => {
      heatLayer.remove(); // Remove heatmap layer when unmounting
    };
  }, [map, heatmapData]);

  return null; // No direct rendering needed
};

export default GeoRiskHeatmap;
