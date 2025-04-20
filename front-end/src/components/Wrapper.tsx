import React, { useState,useEffect } from 'react';

import { Point } from './mapComponents/HeatmapLayer';
import Map from './Map';
import SideBar from './SideBar';

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
  const [notifications, setNotifications] = useState<string[]>([]);
  const [gridCentroids, setGridCentroids] = useState<Record<number, Point>>({});
  const [showHeatmap, setShowHeatmap] = useState(true); // Heatmap visibility state
  const [clickedZip, setClickedZip] = useState<string | null>(null); // Selected ZIP code state
  const [showZipBorders, setShowZipBorders] = useState(true); // ZIP code borders visibility state
  const [riskMap, setRiskMap] = useState<Record<number, number>>({});
  const [gridColors, setGridColors] = useState<GridColorsState>({
    'rgba(221, 40, 40, 0.95)': true,
    'rgba(255, 130, 24, 0.95)': true,
    'rgba(245, 245, 29, 0.95)': true,
    'rgba(32, 221, 28, 0.95)': true,
    'rgba(67, 89, 242, 0.95)': true,
  });
  useEffect(() => {
    fetch('/arlington_grid_no_risk.geojson')
      .then((res) => res.json())
      .then((geoData) => {
        const centroids: Record<number, Point> = {};
  
        geoData.features.forEach((feature: any) => {
          const gridId = feature.properties?.grid_id;
  
          if (typeof gridId === 'number') {
            const coords = feature.geometry.coordinates[0];
            const lat = coords.reduce((sum: number, c: number[]) => sum + c[1], 0) / coords.length;
            const lon = coords.reduce((sum: number, c: number[]) => sum + c[0], 0) / coords.length;
            centroids[gridId] = [lat, lon];
          }
        });
  
        console.log("✅ Loaded centroids:", centroids); // optional debug
        setGridCentroids(centroids);
      });
  }, []);
  
  // Fetch risk data and create notifications
  useEffect(() => {
    const fetchHighRiskData = async () => {
      try {
        const res = await fetch('https://heatmap-analysis.onrender.com/get-risks');
        const data = await res.json();

        const riskMapData: Record<number, number> = {};
        const highRisk = data
          .filter((cell: { predicted_risk: number }) => cell.predicted_risk >= 6)
          .map((cell: { grid_id: number; predicted_risk: number }) => {
            riskMapData[cell.grid_id] = cell.predicted_risk;
            return `Risk level ${cell.predicted_risk.toFixed(1)} at cell ${cell.grid_id}`;
          });

        setRiskMap(riskMapData);
        setNotifications(highRisk); // Or [...highRisk, ...prev] if you want to preserve previous
      } catch (err) {
        console.error('Failed to fetch risk data:', err);
      }
    };
    fetchHighRiskData();
  }, []);
  const removeNotification = (indexToRemove: number) => {
    setNotifications(
      notifications.filter((_, index) => index !== indexToRemove)
    );
  }; // Remove notification

  const handleZipCodeSubmit = (zipCoord: Point, zipCode: string) => {
    setMapCenter(zipCoord);
    setClickedZip(zipCode);
  }; // Handle ZIP code submission

  const handleNotificationClick = (notification: string) => {
    const match = notification.match(/cell\s+(\d+)/i);
    if (match) {
      const gridId = parseInt(match[1]);
      const coords = gridCentroids[gridId];

      if (coords) {
        setMapCenter(coords); // this will trigger ChangeMapView
        setClickedZip(null);
      } else {
        console.warn(`No coordinates found for grid_id ${gridId}`);
      }
    }
  };

  const DEFAULT_MAP_CENTER: Point = [32.7357, -97.1081]; // Example: Arlington, TX coordinates

  const handleReset = () => {
    setClickedZip(null);
    setMapCenter(DEFAULT_MAP_CENTER); // Center the map to the default position
    document.dispatchEvent(new CustomEvent('resetZipCode'));
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
          showZipBorders={showZipBorders}
          gridColors={gridColors}
        />
      </div>

      {/* SIDEBAR */}
      <SideBar
        notifications={notifications}
        removeNotification={removeNotification}
        showHeatmap={showHeatmap}
        setShowHeatmap={setShowHeatmap}
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
