import React, { useState, useEffect } from 'react';

import { Point } from './mapComponents/HeatmapLayer';
import Map from './Map';
import SideBar from './SideBar';
import { Arlington_Risks, Feature } from '@/assets/arlington_risks';
import { calculateCentroid } from '@/utils/utilities';

interface WrapperProps {
  mapCenter: Point;
  setMapCenter: (coords: Point) => void;
}

export type GridColor =
  | 'rgba(221, 40, 40, 0.95)'
  | 'rgba(255, 130, 24, 0.95)'
  | 'rgba(245, 245, 29, 0.95)'
  | 'rgba(32, 221, 28, 0.95)'
  | 'rgba(67, 89, 242, 0.95)';

export type GridColorsState = Record<GridColor, boolean>;

const Wrapper: React.FC<WrapperProps> = ({ mapCenter, setMapCenter }) => {
  const [riskMap, setRiskMap] = useState<Record<number, number>>({});
  const [notifications, setNotifications] = useState<string[]>([]);
  const [markerLocation, setMarkerLocation] = useState<Point | null>(null);

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        const [riskRes] = await Promise.all([
          fetch('https://heatmap-analysis.onrender.com/get-risks'),
          // fetch('/src/assets/arlington_grid_no_risk.geojson'),
        ]);
        const risks = await riskRes.json();
        const grid = Arlington_Risks;

        const riskMapFromAPI: Record<number, number> = {};
        const newNotifications: string[] = [];

        risks.forEach((item: { grid_id: number; predicted_risk: number }) => {
          riskMapFromAPI[item.grid_id] = item.predicted_risk;
        });

        grid.features.forEach((feature: Feature) => {
          const risk = riskMapFromAPI[feature.properties.grid_id];
          // Check if risk is above a certain threshold (e.g., 8)
          // preset 6
          if (risk > 6) {
            const coords = feature.geometry.coordinates[0];
            const [lat, lon] = calculateCentroid(coords);
            newNotifications.push(
              `Risk level ${risk.toFixed(1)} at <${lat.toFixed(
                4
              )},${lon.toFixed(4)}>`
            );
          }
        });

        setRiskMap(riskMapFromAPI);
        setNotifications(
          newNotifications.sort((a, b) => {
            const riskA = parseFloat(
              a.match(/Risk level ([\d.]+)/)?.[1] ?? '0'
            );
            const riskB = parseFloat(
              b.match(/Risk level ([\d.]+)/)?.[1] ?? '0'
            );
            return riskB - riskA; // Descending
          })
        );
      } catch (err) {
        console.error('Error fetching risk + grid data:', err);
      }
    };

    fetchRiskData();
  }, []);

  const [showHeatmap, setShowHeatmap] = useState(true); // Heatmap visibility state
  const [showZipBorders, setShowZipBorders] = useState(true); // ZIP code borders visibility state
  const [showGridCells, setShowGridCells] = useState(true); // ZIP code borders visibility state
  const [clickedZip, setClickedZip] = useState<string | null>(null); // Selected ZIP code state
  const [gridColors, setGridColors] = useState<GridColorsState>({
    'rgba(221, 40, 40, 0.95)': true,
    'rgba(255, 130, 24, 0.95)': true,
    'rgba(245, 245, 29, 0.95)': true,
    'rgba(32, 221, 28, 0.95)': true,
    'rgba(67, 89, 242, 0.95)': true,
  });

  const removeNotification = (indexToRemove: number) => {
    setNotifications(
      notifications.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleZipCodeSubmit = (zipCoord: Point, zipCode: string) => {
    setMapCenter(zipCoord);
    setClickedZip(zipCode);
  };

  const handleNotificationClick = (notification: string) => {
    // Match "<lat,lon>" pattern
    const match = notification.match(/<([\d.]+),\s*(-?[\d.]+)>/);
    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);
      setMapCenter([lat, lon]);
      setClickedZip(null);
      setMarkerLocation([lat, lon]);
    } else {
      console.warn('No coordinates found in notification:', notification);
    }
  };

  const DEFAULT_MAP_CENTER: Point = [32.7044, -97.1013];

  const handleReset = () => {
    setClickedZip(null);
    setMapCenter(DEFAULT_MAP_CENTER); // Center the map to the default position
    document.dispatchEvent(new CustomEvent('resetZipCode'));
    setMarkerLocation(null);
  };

  return (
    <div className='relative w-full h-full'>
      {/* Heat Map */}
      <div className='absolute inset-0'>
        <Map
          position={mapCenter}
          clickedZip={clickedZip}
          setClickedZip={setClickedZip}
          showHeatmap={showHeatmap}
          showGridCells={showGridCells}
          showZipBorders={showZipBorders}
          gridColors={gridColors}
          riskMap={riskMap}
          markerLocation={markerLocation}
          setMarkerLocation={setMarkerLocation}
        />
      </div>

      {/* SIDEBAR */}
      <SideBar
        notifications={notifications}
        removeNotification={removeNotification}
        showHeatmap={showHeatmap}
        setShowHeatmap={setShowHeatmap}
        showGridCells={showGridCells}
        setShowGridCells={setShowGridCells}
        showZipBorders={showZipBorders}
        setShowZipBorders={setShowZipBorders}
        onZipCodeSubmit={handleZipCodeSubmit}
        handleReset={handleReset}
        handleNotificationClick={handleNotificationClick}
        gridColors={gridColors}
        setGridColors={setGridColors}
      />
    </div>
  );
};

export default Wrapper;
