import { useState } from 'react';

import './App.css';
import Map from './components/Map';
import { SidebarProvider } from './components/ui/sidebar';
import SideBar from './components/SideBar';
import { Point } from './components/mapComponents/HeatmapLayer';

const App: React.FC = () => {
  // Default to Arlington coordinates
  const [mapCenter, setMapCenter] = useState<Point>([32.7357, -97.1081]);
  const [heatOpacity, setHeatOpacity] = useState(0.6);

  const handleZipCodeSubmit = (zipCoord: Point) => {
    setMapCenter(zipCoord);
  };

  return (
    <SidebarProvider>
      <SideBar
        heatOpacity={heatOpacity}
        setHeatOpacity={setHeatOpacity}
        onZipCodeSubmit={handleZipCodeSubmit}
      />
      <div className='flex-grow relative'>
        <Map heatOpacity={heatOpacity} position={mapCenter} />
      </div>
    </SidebarProvider>
  );
};
export default App;
