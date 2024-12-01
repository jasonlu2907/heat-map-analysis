import { useState } from 'react';

import './App.css';
import Map from './components/Map';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Point } from './components/mapComponents/HeatmapLayer';

const App: React.FC = () => {
  // Default to Arlington coordinates
  const [mapCenter, setMapCenter] = useState<Point>([32.7357, -97.1081]);

  const handleZipCodeSubmit = (zipCoords: Point) => {
    setMapCenter(zipCoords);
  };

  return (
    <div className='h-screen relative'>
      <Navbar />
      <SideBar onZipCodeSubmit={handleZipCodeSubmit} />
      <Map position={mapCenter} />
    </div>
  );
};

export default App;
