import { GeoJSON } from 'react-leaflet';
import { useState } from 'react';
import { PathOptions } from 'leaflet';

import { arlingtonGeoJSON } from '../../assets/arlington';

const BorderLayer = () => {
  const [isHovered, setIsHovered] = useState(false);

  const style = (): PathOptions => ({
    color: 'black', // #187bcd #2a9df4
    weight: isHovered ? 2 : 1,
    opacity: 1,
    // fillOpacity: isHovered ? 0.7 : 0.55,
  });

  const eventHandlers = {
    mouseover: () => {
      setIsHovered(true);
    },
    mouseout: () => {
      setIsHovered(false);
    },
  };

  return (
    <GeoJSON
      data={arlingtonGeoJSON as GeoJSON.GeoJsonObject}
      style={style}
      eventHandlers={eventHandlers}
      onEachFeature={(feature, layer) => {
        if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent);
        }
      }}
    />
  );
};

export default BorderLayer;
