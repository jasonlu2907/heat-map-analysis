import React, { useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet.heat';
import HeatmapLayer, { Point } from './mapComponents/HeatmapLayer';
import ChangeMapView from './mapComponents/ChangeMapView';
import Legend from './mapComponents/Legend';
// import ZipCodeBorderLayer from './mapComponents/ZipCodeBorderLayer';
import BorderLayer from './mapComponents/BorderLayer';
import heatmapDatas from '../../../back-end/heatmapData.ts';
import WeatherOverlay from './mapComponents/WeatherOverlay.tsx';
import GeoGridLayer from './mapComponents/GeoGridLayer';
import ZipCodeBorderLayer from './mapComponents/ZipCodeBorderLayer.tsx';

interface MapProps {
  position: Point;
  clickedZip: string | null;
  setClickedZip: (zip: string | null) => void;
  showHeatmap: boolean;
  showZipBorders: boolean;
}

const Map: React.FC<MapProps> = ({
  position,
  clickedZip,
  setClickedZip,
  showHeatmap,
  showZipBorders,
}) => {
  const animateRef = useRef(true);
  const heatmapData: Point[] = heatmapDatas;

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
        <ChangeMapView position={position} animateRef={animateRef} />
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <ZoomControl position='bottomright' />

        {/* Outer Border Layer */}
        <BorderLayer clickedZip={clickedZip} />

        {/* 🔥 Add GeoGridLayer for Risk Zones */}
        <GeoGridLayer />

        {/* Heatmap Layer - Only render if showHeatmap is true */}
        {showHeatmap && (
          <HeatmapLayer
            points={heatmapData}
            clickedZip={clickedZip}
            showHeatmap={showHeatmap}
          />
        )}

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
