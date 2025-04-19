import React, { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

// Define a type for heatmap points
type Point = [number, number, number]; // [latitude, longitude, intensity]

interface Feature {
  geometry: {
    coordinates: number[][][];
  };
  properties: {
    risk: number;
  };
}

interface Risk {
  grid_id: number;
  predicted_risk: number;
}

interface HeatmapLayerProps {
  // clickedZip: string | null;
  showHeatmap: boolean;
}

// Function to calculate the centroid (center) of a polygon
const calculateCentroid = (coordinates: number[][]): [number, number] => {
  let latSum = 0,
    lonSum = 0;
  const count = coordinates.length;
  coordinates.forEach(([lon, lat]) => {
    latSum += lat;
    lonSum += lon;
  });
  const centroid: [number, number] = [latSum / count, lonSum / count];

  return centroid;
};

const GeoRiskHeatmap: React.FC<HeatmapLayerProps> = (showHeatmap) => {
  const [heatmapData, setHeatmapData] = useState<Point[]>([]);
  const map = useMap();
  const heatLayerRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gridResponse, riskResponse] = await Promise.all([
          fetch('/src/assets/arlington_grid_no_risk.geojson'),
          fetch('https://heatmap-analysis.onrender.com/get-risks'),
        ]);

        const gridJson = await gridResponse.json();
        const riskJson: Risk[] = await riskResponse.json();
        console.log(riskJson);
        // Filter out zero-risk areas and create features with risk values
        const heatPoints: Point[] = gridJson.features
          .map((feature: Feature, index: number) => {
            const coords = feature.geometry.coordinates[0]; // Get polygon outline
            const [lat, lon] = calculateCentroid(coords); // Compute centroid
            const intensity = riskJson[index].predicted_risk || 0; // Assign risk value
            return [lat, lon, intensity]; // Convert to [latitude, longitude, intensity]

            // return {
            //   ...feature,
            //   centroid: [lat, lon, intensity],
            //   properties: { risk: riskJson[index].predicted_risk || 0 },
            // };
          })
          .filter((point: Point) => point[2] > 0);

        setHeatmapData(heatPoints);
      } catch (error) {
        console.error('Heatmap Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!map || heatmapData.length === 0) return;

    if (!showHeatmap) {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
        heatLayerRef.current = null;
      }
      return;
    }

    // Create the heatmap layer
    const heatLayer = L.heatLayer(heatmapData, {
      radius: 30, // Reduce radius to make hotspots clearer
      blur: 20, // Reduce blur to prevent over-smoothing
      maxZoom: 10, // Limit max zoom intensity
      minOpacity: 0.3, // Ensure heatmap stays visible
      max: 9.0, // Keep max intensity at 1
    });

    heatLayer.addTo(map);

    return () => {
      heatLayer.remove(); // Remove heatmap layer when unmounting
    };
  }, [map, heatmapData, showHeatmap]);

  return null; // No direct rendering needed
};

export default GeoRiskHeatmap;
