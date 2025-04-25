import React, { useState } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import { Point } from './components/mapComponents/HeatmapLayer';

const App: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<Point>([32.7044, -97.1013]);

  return <Wrapper mapCenter={mapCenter} setMapCenter={setMapCenter} />;
};

export default App;
