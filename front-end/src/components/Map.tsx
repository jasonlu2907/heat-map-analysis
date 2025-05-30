import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet.heat';
import { Point } from './mapComponents/HeatmapLayer';
import Legend from './mapComponents/Legend';
// import ZipCodeBorderLayer from './mapComponents/ZipCodeBorderLayer';
import BorderLayer from './mapComponents/BorderLayer';
// import heatmapDatas from '../../../back-end/heatmapData.ts';
import WeatherOverlay from './mapComponents/WeatherOverlay.tsx';
import GeoGridLayer from './mapComponents/GeoGridLayer';
import ZipCodeBorderLayer from './mapComponents/ZipCodeBorderLayer.tsx';
import GeoRiskHeatmap from './mapComponents/GeoRiskHeatmap.tsx';
import SearchControl from './mapComponents/SearchControl';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface MapProps {
  position: Point;
  clickedZip: string | null;
  setClickedZip: (zip: string | null) => void;
  showHeatmap: boolean;
  showGridCells: boolean;
  showZipBorders: boolean;
  gridColors: Record<string, boolean>;
  riskMap: Record<number, number>;
  markerLocation?: Point | null;
  setMarkerLocation: (location: Point | null) => void;
}

const Map: React.FC<MapProps> = ({
  position,
  clickedZip,
  setClickedZip,
  showHeatmap,
  showGridCells,
  showZipBorders,
  gridColors,
  riskMap,
  markerLocation,
  setMarkerLocation,
}) => {
  // const animateRef = useRef(true);
  // const heatmapData: Point[] = heatmapDatas;
  // const [riskMap, setRiskMap] = useState<Record<number, number>>({});

  // useEffect(() => {
  //   fetch('https://heatmap-analysis.onrender.com/get-risks')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const map: Record<number, number> = {};
  //       data.forEach((item: { grid_id: number; predicted_risk: number }) => {
  //         map[item.grid_id] = item.predicted_risk;
  //       });
  //       setRiskMap(map);
  //     })
  //     .catch((error) => console.error('Error fetching risks:', error));
  // }, []);

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
        {/* <ChangeMapView position={position} animateRef={animateRef} /> */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <ZoomControl position='bottomright' />

        {/* Outer Border Layer */}
        <BorderLayer clickedZip={clickedZip} />

        {/* ZIP Code Borders - At the bottom */}
        {showZipBorders && (
          <ZipCodeBorderLayer
            clickedZip={clickedZip}
            setClickedZip={setClickedZip}
          />
        )}

        {/* Heatmap Layer - Only render if showHeatmap is true */}
        {/* {showHeatmap && (
          <HeatmapLayer
            points={heatmapData}
            clickedZip={clickedZip}
            showHeatmap={showHeatmap}
          />
        )} */}
        {showHeatmap && <GeoRiskHeatmap showHeatmap={showHeatmap} />}

        {/* GeoGridLayer - Top */}
        {showGridCells && (
          <GeoGridLayer gridColors={gridColors} riskMap={riskMap} />
        )}

        {markerLocation && (
          <Marker
            position={markerLocation}
            icon={L.icon({
              iconUrl:
                'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
              iconSize: [15, 25],
            })}
          >
            <Popup>
              <div>
                Risk Area
                <br />
                Lat: {markerLocation[0]}
                <br />
                Lng: {markerLocation[1]}
                <br />
                <button
                  onClick={() => setMarkerLocation(null)}
                  className='mt-2 px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600'
                >
                  Remove Me
                </button>
              </div>
            </Popup>
          </Marker>
        )}

        <Legend />
      </MapContainer>
    </div>
  );
};

export default Map;
