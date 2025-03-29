import React, { useState } from 'react';

import { Point } from './mapComponents/HeatmapLayer';
import Map from './Map';
import SideBar from './SideBar';

interface WrapperProps {
  mapCenter: Point;
  setMapCenter: (coords: Point) => void;
}

const Wrapper: React.FC<WrapperProps> = ({ mapCenter, setMapCenter }) => {
  const [notifications, setNotifications] = useState([
    'Fire alert in zip code 76006 🚒',
    'Fire risk score 8 at UTA 🚨',
    'Alert: Current risk score is 9 at <300,200> and this is a long notification.',
  ]); // Notification state
  const [showHeatmap, setShowHeatmap] = useState(true); // Heatmap visibility state
  const [clickedZip, setClickedZip] = useState<string | null>(null); // Selected ZIP code state
  const [showZipBorders, setShowZipBorders] = useState(true); // ZIP code borders visibility state

  const removeNotification = (indexToRemove: number) => {
    setNotifications(
      notifications.filter((_, index) => index !== indexToRemove)
    );
  }; // Remove notification

  const handleZipCodeSubmit = (zipCoord: Point, zipCode: string) => {
    setMapCenter(zipCoord);
    setClickedZip(zipCode);
  }; // Handle ZIP code submission

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
      />
    </div>
  );
};

export default Wrapper;
