import React, { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { Arlington_Risks, Feature } from '@/assets/arlington_risks';
import { calculateCentroid } from '@/utils/utilities';

declare global {
  interface Window {
    // global object registered by heatmap.js. Used to create heapmap instances
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h337: any; // must for TypeScript (TypeError)
  }
}

// Define a type for heatmap points
type Point = [number, number, number]; // [latitude, longitude, intensity]

interface Risk {
  grid_id: number;
  predicted_risk: number;
}

interface HeatmapLayerProps {
  showHeatmap: boolean;
}

const GeoRiskHeatmap: React.FC<HeatmapLayerProps> = ({ showHeatmap }) => {
  const [heatmapData, setHeatmapData] = useState<Point[]>([]);
  const map = useMap();
  const overlayRef = useRef<L.ImageOverlay | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gridResponse = Arlington_Risks;
        const [riskResponse] = await Promise.all([
          // fetch('/src/assets/arlington_grid_no_risk.geojson'),
          fetch('https://heatmap-analysis.onrender.com/get-risks'),
        ]);

        // const gridJson = await gridResponse.json();
        const riskJson: Risk[] = await riskResponse.json();

        const heatPoints: Point[] = gridResponse.features
          .map((feature: Feature, index: number) => {
            const coords = feature.geometry.coordinates[0];
            const [lat, lon] = calculateCentroid(coords);
            const intensity = riskJson[index]?.predicted_risk || 0;
            return [lat, lon, intensity] as Point;
          })
          .filter((point) => point[2] > 1);

        setHeatmapData(heatPoints);
      } catch (error) {
        console.error('Error fetching HeatmapData:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!showHeatmap || !heatmapData.length) return;

    (async () => {
      // await loadScript(heatmapScript);

      if (!window.h337 || typeof window.h337.create !== 'function') {
        console.error('heatmap.js failed to load or is unavailable.');
        return;
      }

      // Get map container size
      const mapSize = map.getSize();

      // Create container with map dimensions
      const container = document.createElement('div');
      container.style.width = `${mapSize.x}px`;
      container.style.height = `${mapSize.y}px`;
      container.style.position = 'absolute';
      container.style.visibility = 'hidden';
      document.body.appendChild(container);

      const heatmap = window.h337.create({
        container,
        // radius: 0.055 * Math.min(mapSize.x, mapSize.y), // Relative to map size
        radius: 37,
        maxOpacity: 0.8,
        minOpacity: 0.3,
        blur: 0.85,
        gradient: {
          0.0: 'blue',
          0.4: 'cyan',
          0.6: 'lime',
          0.8: 'yellow',
          1.0: 'red',
        },
      });

      const bounds = map.getBounds();
      const projected = heatmapData.map((p) => {
        // Convert lat/lng to pixel coordinates
        const point = map.latLngToContainerPoint([p[0], p[1]]);
        return {
          x: point.x,
          y: point.y,
          value: p[2],
        };
      });

      // Find max value for proper scaling
      const maxValue = Math.max(...projected.map((p) => p.value));

      heatmap.setData({
        max: maxValue,
        data: projected,
      });

      try {
        const canvas = heatmap._renderer.canvas;
        const url = canvas.toDataURL();

        if (overlayRef.current) {
          map.removeLayer(overlayRef.current);
        }

        const overlay = L.imageOverlay(url, bounds, {
          opacity: 0.6,
          interactive: false,
        });
        overlayRef.current = overlay;
        overlay.addTo(map);
      } catch (error) {
        console.error('Error creating heatmap overlay:', error);
      }

      // Cleanup
      container.remove();
    })();

    // Cleanup on unmount or when showHeatmap changes
    return () => {
      if (overlayRef.current) {
        map.removeLayer(overlayRef.current);
        overlayRef.current = null;
      }
    };
  }, [heatmapData, map, showHeatmap]);

  return null; // No direct rendering needed
};

export default GeoRiskHeatmap;
