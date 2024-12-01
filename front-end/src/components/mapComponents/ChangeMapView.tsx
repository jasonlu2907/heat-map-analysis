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
    map.setView(position, map.getZoom(), {
      animate: animateRef.current || false,
    });
  }, [map, position, animateRef]);

  return null;
};

export default ChangeMapView;
