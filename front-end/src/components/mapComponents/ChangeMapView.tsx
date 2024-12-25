import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { Point } from './HeatmapLayer';

const ChangeMapView = ({
  position,
  animateRef,
}: {
  position: Point;
  animateRef: React.MutableRefObject<boolean>;
}) => {
  const map = useMap();

  useEffect(() => {
    if (position[0] !== 32.7357 && position[1] !== -97.1081) {
      // set zoom to 14
      map.setView(position, 14, {
        animate: animateRef.current || false,
      });
    }
  }, [map, position, animateRef]);

  return null;
};

export default ChangeMapView;
