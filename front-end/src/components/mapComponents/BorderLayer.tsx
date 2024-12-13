// import React from 'react';
// import { useEffect, useState } from 'react';
import { arlingtonGeoJSON } from '../../assets/arlington';
import { GeoJSON } from 'react-leaflet';

const BorderLayer = () => {
  return (
    <GeoJSON
      data={arlingtonGeoJSON as GeoJSON.GeoJsonObject}
      style={{
        color: 'black',
        weight: 2,
        fill: false,
      }}
      // unknown purpose of this
      onEachFeature={(feature, layer) => {
        if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent);
        }
      }}
    />
  );
};

export default BorderLayer;
