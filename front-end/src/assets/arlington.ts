import { Point } from '../components/mapComponents/HeatmapLayer';

export const arlingtonGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Arlington, TX',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-97.220619, 32.643287],
            [-97.0625, 32.648],
            [-97.045563, 32.762135],
            [-97.051193, 32.815],
            [-97.1401, 32.8008],
            [-97.15, 32.7679],
            [-97.183, 32.7298],
            [-97.2208, 32.7269],
            [-97.2338, 32.6888],
            [-97.220619, 32.643287],
          ],
        ],
      },
    },
  ],
};

export const ARLINGTON_ZIP_CODES = [
  { code: '76001', area: 'Southeast Arlington' },
  { code: '76002', area: 'Southeast Arlington' },
  { code: '76005', area: 'Viridian Area' },
  { code: '76006', area: 'East Arlington' },
  { code: '76010', area: 'East Arlington' },
  { code: '76011', area: 'North Arlington' },
  { code: '76012', area: 'North Arlington' },
  { code: '76013', area: 'Central Arlington' },
  { code: '76014', area: 'Southeast Arlington' },
  { code: '76015', area: 'South Arlington' },
  { code: '76016', area: 'Southwest Arlington' },
  { code: '76017', area: 'Southwest Arlington' },
  { code: '76018', area: 'Southeast Arlington' },
];

export const ARLINGTON_ZIP_COORD: Record<string, Point> = {
  '76001': [32.64096, -97.14609],
  '76002': [32.65961, -97.09202],
  '76005': [32.79925, -97.08515],
  '76006': [32.77544, -97.0788],
  '76010': [32.7265, -97.08652],
  '76011': [32.75985, -97.08944],
  '76012': [32.74729, -97.14214],
  '76013': [32.7226, -97.14626],
  '76014': [32.69544, -97.08687],
  '76015': [32.69573, -97.13047],
  '76016': [32.68894, -97.18781],
  '76017': [32.65845, -97.16343],
  '76018': [32.66178, -97.09356],
};
