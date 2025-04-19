import React, { useState } from 'react';

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
  const [notifications, setNotifications] = useState([
    'Risk level 0.4 at <32.6017,-97.1008>',
    'Risk level 0.9 at <32.6117,-97.0908>',
    'Risk level 0.2 at <32.6517,-97.1508>',
  ]); // Notification state
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
  }; // Remove notification

  const handleZipCodeSubmit = (zipCoord: Point, zipCode: string) => {
    setMapCenter(zipCoord);
    setClickedZip(zipCode);
  }; // Handle ZIP code submission

  const handleNotificationClick = (notification: string) => {
    // Match "<lat,lon>" pattern
    const match = notification.match(/<([\d.]+),\s*(-?[\d.]+)>/);
    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);
      setMapCenter([lat, lon]);
      setClickedZip(null);
    } else {
      console.warn('No coordinates found in notification:', notification);
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
          showGridCells={showGridCells}
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
