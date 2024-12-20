import { useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { PathOptions } from 'leaflet';

import { zipCodeGeoJSON } from '../../assets/arlington';

const ZipCodeBorderLayer = () => {
  const [hoveredZip, setHoveredZip] = useState<string | null>(null);
  const [clickedZip, setClickedZip] = useState<string | null>(null);

  const style = (zipCode: string): PathOptions => ({
    color: '#03254c',
    weight: hoveredZip === zipCode ? 2 : 1,
    opacity: 1,
    fillOpacity: hoveredZip === zipCode || clickedZip === zipCode ? 0.2 : 0,
    fillColor: '#2a9df4',
  });

  return (
    <div>
      {zipCodeGeoJSON['features'].map((zipEl) => (
        <GeoJSON
          key={zipEl.properties.ZIPCODE}
          data={zipEl as GeoJSON.GeoJsonObject}
          style={() => style(zipEl.properties.ZIPCODE.toString())}
          eventHandlers={{
            mouseover: () => setHoveredZip(zipEl.properties.ZIPCODE.toString()),
            mouseout: () => setHoveredZip(null),
            click: () => {
              if (clickedZip !== zipEl.properties.ZIPCODE.toString())
                setClickedZip(zipEl.properties.ZIPCODE.toString());
              else setClickedZip(null);
            },
          }}
          onEachFeature={(feature, layer) => {
            //  Add popup with zip code
            layer.bindPopup(`Zip Code: ${feature.properties.ZIPCODE}`);

            // Add tooltip that shows on hover
            layer.bindTooltip(`${feature.properties.ZIPCODE}`);

            // Add click handler
            layer.on('click', () => {
              console.log(`Clicked zip code: ${feature.properties.ZIPCODE}`);
            });
          }}
        />
      ))}
    </div>
  );
};

export default ZipCodeBorderLayer;
