import React, { useState } from 'react';
import './App.css';
import FilterSidebarWrapper from './components/FilterSideBar';
import { Point } from './components/mapComponents/HeatmapLayer';

const App: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<Point>([32.7357, -97.1081]);
  const [heatOpacity, setHeatOpacity] = useState(0.6);

  return (
    <FilterSidebarWrapper
      mapCenter={mapCenter}
      setMapCenter={setMapCenter}
      heatOpacity={heatOpacity}
      setHeatOpacity={setHeatOpacity}
    />
  );
};

export default App;
