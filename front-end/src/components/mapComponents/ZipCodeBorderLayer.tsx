import { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import { PathOptions } from 'leaflet';

import { zipCodeGeoJSON } from '../../assets/arlington';

interface ZipCodeBorderLayerProps {
  clickedZip: string | null;
  setClickedZip: (zip: string | null) => void;
}

const ZipCodeBorderLayer: React.FC<ZipCodeBorderLayerProps> = ({
  clickedZip,
  setClickedZip,
}) => {
  const [hoveredZip, setHoveredZip] = useState<string | null>(null);
  const [showZipBorders, setShowZipBorders] = useState(true); // Default: ON

  const style = (zipCode: string): PathOptions => ({
    color: clickedZip === zipCode ? '#FF0000' : '#03254c', // Red border for selected ZIP, blue for others
    weight: clickedZip === zipCode ? 3 : 1.5,
    opacity: clickedZip === zipCode ? 1 : 0.5,
    fillOpacity: 0, // Remove fill color
    fillColor: 'transparent',
  });

  // Listen for reset event and clear the selected ZIP code
  useEffect(() => {
    const handleReset = () => {
      setClickedZip(null);
    };

    document.addEventListener('resetZipCode', handleReset);
    return () => document.removeEventListener('resetZipCode', handleReset);
  }, [setClickedZip]);

  return showZipBorders ? (
    <div>
      {zipCodeGeoJSON['features'].map((zipEl) => (
        <GeoJSON
          key={zipEl.properties.ZIPCODE}
          data={zipEl as GeoJSON.GeoJsonObject}
          style={() => style(zipEl.properties.ZIPCODE.toString())}
          eventHandlers={{
            // mouseover: () => setHoveredZip(zipEl.properties.ZIPCODE.toString()),
            // mouseout: () => setHoveredZip(null),
            click: () => {
              const zip = zipEl.properties.ZIPCODE.toString();
              setClickedZip(clickedZip === zip ? null : zip); // Toggle clicked ZIP code
            },
          }}
        />
      ))}
    </div>
  ) : null;
};

export default ZipCodeBorderLayer;
