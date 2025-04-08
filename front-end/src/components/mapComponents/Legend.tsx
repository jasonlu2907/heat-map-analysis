import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L, { Control } from 'leaflet';

const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const getColor = (d: number) => {
      return d > 8
        ? '#ff0000'
        : d > 6
        ? '#ffa500'
        : d > 4
        ? '#ffff00'
        : d > 2
        ? '#00ff00'
        : '#0000FF';
    };

    const legend = new Control({ position: 'bottomleft' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = [1, 2, 4, 6, 8, 10];
      const labels: string[] = [];

      for (let i = 0; i < grades.length - 1; i++) {
        const from = grades[i];
        const to = grades[i + 1];

        labels.push(
          `<i style="background:${getColor(
            from + 1
          )}"></i> ${from} &ndash; ${to}`
        );
      }

      div.innerHTML = labels.join('<br>');
      return div;
    };

    legend.addTo(map);

    // Cleanup on unmount
    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

export default Legend;
