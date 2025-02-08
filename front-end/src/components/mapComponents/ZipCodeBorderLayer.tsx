import { useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { PathOptions } from 'leaflet';

import {zipCodeGeoJSON} from '../../assets/arlington';

interface ZipCodeBorderLayerProps {
  clickedZip: string | null;
  setClickedZip: (zip: string | null) => void;
}

const ZipCodeBorderLayer: React.FC<ZipCodeBorderLayerProps> = ({clickedZip,setClickedZip}) => {
  const [hoveredZip, setHoveredZip] = useState<string | null>(null);

  const style = (zipCode: string): PathOptions => ({
    color: '#03254c',
    weight: clickedZip === zipCode ? 2.5 : 1.5,
    opacity: clickedZip === zipCode ? 1 : 0.2,
    fillOpacity: clickedZip === zipCode ? 0.5 : 0,
    fillColor: clickedZip == zipCode ? '#5d5d5d' : 'transparent',  
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
              const zip = zipEl.properties.ZIPCODE.toString();
              setClickedZip(clickedZip === zip ? null : zip); // Toggle clicked ZIP code
            },
          }}
          // onEachFeature={(feature, layer) => {
          //   //  Add popup with zip code
          //   layer.bindPopup(`Zip Code: ${feature.properties.ZIPCODE}`);

          //   // Add tooltip that shows on hover -> tooltip causes the box when clicked
          //   // layer.bindTooltip(`${feature.properties.ZIPCODE}`);

          //   // Add click handler
          //   layer.on('click', () => {
          //     console.log(`Clicked zip code: ${feature.properties.ZIPCODE}`);
          //   });
          // }}
        />
      ))}
    </div>
  );
};

export default ZipCodeBorderLayer;
