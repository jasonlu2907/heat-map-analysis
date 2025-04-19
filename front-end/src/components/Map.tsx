import React, { useRef,useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet.heat';
import { Point } from './mapComponents/HeatmapLayer';
import ChangeMapView from './mapComponents/ChangeMapView';
import Legend from './mapComponents/Legend';
// import ZipCodeBorderLayer from './mapComponents/ZipCodeBorderLayer';
import BorderLayer from './mapComponents/BorderLayer';
// import heatmapDatas from '../../../back-end/heatmapData.ts';
import WeatherOverlay from './mapComponents/WeatherOverlay.tsx';
import GeoGridLayer from './mapComponents/GeoGridLayer';
import ZipCodeBorderLayer from './mapComponents/ZipCodeBorderLayer.tsx';
import GeoRiskHeatmap from './mapComponents/GeoRiskHeatmap.tsx';
import SearchControl from './mapComponents/SearchControl'; 

interface MapProps {
  position: Point;
  clickedZip: string | null;
  setClickedZip: (zip: string | null) => void;
  showHeatmap: boolean;
  showZipBorders: boolean;
  gridColors: Record<string, boolean>;
}

const Map: React.FC<MapProps> = ({
  position,
  clickedZip,
  setClickedZip,
  showHeatmap,
  showZipBorders,
  gridColors,
}) => {
  const animateRef = useRef(true);
  // const heatmapData: Point[] = heatmapDatas;
  const [riskMap, setRiskMap] = useState<Record<number, number>>({});

  useEffect(() => {
    fetch("https://heatmap-analysis.onrender.com/get-risks")
      .then((response) => response.json())
      .then((data) => {
        const map: Record<number, number> = {};
        data.forEach((item: { grid_id: number, predicted_risk: number }) => {
          map[item.grid_id] = item.predicted_risk;
        });
        setRiskMap(map);
        console.log("Fetched Risk Map:", map);
      })
      .catch((error) => console.error("Error fetching risks:", error));
  }, []);

  return (
    <div>
      <WeatherOverlay />
      
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100vh', width: '100%', zIndex: 10 }}
        key={position.toString()} // Add key to force re-render on position change
      >
        <SearchControl />
        <ChangeMapView position={position} animateRef={animateRef} />
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <ZoomControl position='bottomright' />

        {/* Outer Border Layer */}
        <BorderLayer clickedZip={clickedZip} />

        {/* Add GeoGridLayer for Risk Zones */}
        <GeoGridLayer gridColors={gridColors} riskMap={riskMap} />

        {/* Heatmap Layer - Only render if showHeatmap is true */}
        {/* {showHeatmap && (
          <HeatmapLayer
            points={heatmapData}
            clickedZip={clickedZip}
            showHeatmap={showHeatmap}
          />
        )} */}
        {showHeatmap && <GeoRiskHeatmap showHeatmap={showHeatmap} />}

        {/* ZIP Code Borders - Only render if showZipBorders is true */}
        {showZipBorders && (
          <ZipCodeBorderLayer
            clickedZip={clickedZip}
            setClickedZip={setClickedZip}
          />
        )}

        <Legend />
      </MapContainer>
    </div>
  );
};

export default Map;
