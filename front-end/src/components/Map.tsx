import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = () => {
  const position = [32.7357, -97.1081]; // Arlington coordinates
  return (
    <MapContainer
      center={[position[0], position[1]]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100vh', width: '100%', zIndex: 10 }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[position[0], position[1]]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
