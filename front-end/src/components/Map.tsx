import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet.heat';

import HeatmapLayer, { Point } from './mapComponents/HeatmapLayer';
import ChangeMapView from './mapComponents/ChangeMapView';
import Legend from './mapComponents/Legend';
import ZipCodeBorderLayer from './mapComponents/ZipCodeBorderLayer';

interface MapProps {
  heatOpacity: number;
  position: Point;
}

const Map: React.FC<MapProps> = ({ heatOpacity, position }) => {
  const animateRef = useRef(true);

  // Large, predefined dataset for the heatmap
  const heatmapData: Point[] = [
    [32.7357, -97.1081, 0.8],
    [32.7362, -97.11, 0.6],
    [32.7353, -97.1075, 0.7],
    [32.7345, -97.109, 0.9],
    [32.738, -97.1065, 0.4],
    [32.737, -97.1055, 0.6],
    [32.7367, -97.1085, 0.8],
    [32.7381, -97.1078, 0.5],
    [32.7359, -97.1042, 0.6],
    [32.7342, -97.1082, 0.9],
    [32.739, -97.1102, 0.5],
    [32.7375, -97.1095, 0.7],
    [32.7337, -97.1089, 0.4],
    [32.736, -97.1068, 0.8],
    [32.7351, -97.1108, 0.6],
    [32.7385, -97.1098, 0.7],
    [32.7354, -97.105, 0.9],
    [32.7346, -97.1076, 0.5],
    [32.7368, -97.1103, 0.7],
    [32.7373, -97.1083, 0.6],
    [32.7365, -97.1072, 0.9],
    [32.7383, -97.1057, 0.5],
    [32.7339, -97.1069, 0.4],
    [32.7356, -97.1048, 0.8],
    [32.7378, -97.1071, 0.9],
    [32.7395, -97.1084, 0.7],
    [32.7347, -97.1065, 0.6],
    [32.7387, -97.1062, 0.5],
    [32.7374, -97.1091, 0.8],
    [32.735, -97.107, 0.9],
    [32.7343, -97.1054, 0.6],
    [32.7361, -97.1084, 0.7],
    [32.7379, -97.1045, 0.5],
    [32.7391, -97.1077, 0.6],
    [32.7352, -97.1097, 0.8],
    [32.7382, -97.1066, 0.4],
    [32.7363, -97.1059, 0.9],
    [32.7377, -97.1088, 0.6],
    [32.7338, -97.1093, 0.7],
    [32.7355, -97.1077, 0.5],
    [32.7364, -97.109, 0.9],
    [32.7349, -97.1058, 0.8],
    [32.7386, -97.1049, 0.6],
    [32.7344, -97.1063, 0.7],
    [32.7392, -97.1074, 0.5],
    [32.7358, -97.1087, 0.4],
    [32.7366, -97.1047, 0.8],
    [32.7376, -97.106, 0.9],
    [32.7335, -97.1055, 0.7],
    [32.7388, -97.1092, 0.6],
    [32.7348, -97.1105, 0.5],
  ];

  return (
    <div>
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%', zIndex: 10 }}
      >
        <ChangeMapView position={position} animateRef={animateRef} />
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        {/* Heatmap Layer */}
        <HeatmapLayer points={heatmapData} opacity={heatOpacity} />

        {/* Border Layer */}
        <ZipCodeBorderLayer />

        <Legend />
      </MapContainer>
    </div>
  );
};

export default Map;
