import { GeoJSON } from 'react-leaflet';
import { useState } from 'react';
import { PathOptions } from 'leaflet';

import { arlingtonGeoJSON } from '../../assets/arlington';


interface BorderLayerProps {
  clickedZip: string | null; // Pass the currently selected ZIP code
}

const BorderLayer: React.FC<BorderLayerProps> = ({ clickedZip }) => {
  const style = (): PathOptions => ({
    color: '#03254c', // Border color
    weight: clickedZip ? 0 : 2, // Hide the Arlington border if a ZIP code is selected
    opacity: clickedZip ? 0 : 0.8, // Hide the Arlington border if a ZIP code is selected
    fillOpacity: 0, // Keep the inside of the border transparent
  })

  // const eventHandlers = {
  //   mouseover: () => {
  //     setIsHovered(true);
  //   },
  //   mouseout: () => {
  //     setIsHovered(false);
  //   },
  // };

  return (
    <GeoJSON
      data={arlingtonGeoJSON as GeoJSON.GeoJsonObject}
      style={style}
      // eventHandlers={eventHandlers}
      // onEachFeature={(feature, layer) => {
      //   if (feature.properties && feature.properties.popupContent) {
      //     layer.bindPopup(feature.properties.popupContent);
      //   }
      // }}
    />
  );
};

export default BorderLayer;
