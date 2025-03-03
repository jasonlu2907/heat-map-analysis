import React, { useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet.heat';
import HeatmapLayer, { Point } from './mapComponents/HeatmapLayer';
import ChangeMapView from './mapComponents/ChangeMapView';
import Legend from './mapComponents/Legend';
import ZipCodeBorderLayer from './mapComponents/ZipCodeBorderLayer';
import BorderLayer from './mapComponents/BorderLayer';
import heatmapDatas from '../../../back-end/heatmapData.ts'
import WeatherOverlay from './mapComponents/WeatherOverlay.tsx';

interface MapProps {
  heatOpacity: number;
  position: Point;
  clickedZip: string | null;
  setClickedZip: (zip: string | null) => void;
}

const Map: React.FC<MapProps> = ({ position,clickedZip,setClickedZip }) => {
  const animateRef = useRef(true);

  // Large, predefined dataset for the heatmap
  
  const heatmapData: Point[] = heatmapDatas;
    

  return (
    <div>
      <WeatherOverlay />
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={true}
        zoomControl = {false} 
        style={{ height: '100vh', width: '100%', zIndex: 10 }}
      >
        <ChangeMapView position={position} animateRef={animateRef} />
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {/* Custom Zoom Control in Bottom Right */}
        <ZoomControl position="bottomright" />


        {/* Outer Border Layer */}
        <BorderLayer clickedZip={clickedZip} />

        {/* Zipcode Border Layer */}
        <ZipCodeBorderLayer clickedZip={clickedZip} setClickedZip={setClickedZip} />

        {/* Heatmap Layer */}
        <HeatmapLayer points={heatmapData} /> 
        
        <Legend />
      </MapContainer>
    </div>
  );
};

export default Map;
