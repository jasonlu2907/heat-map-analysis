// import React, { useRef } from 'react';
// import { useMap } from 'react-leaflet';
// import { useEffect } from 'react';
// import L from 'leaflet';
// import { zipCodeGeoJSON } from '../../assets/arlington';
// import * as turf from '@turf/turf'; // Import Turf.js

// Define the type for points array and the HeatmapLayerProps
export type Point = [number, number, number?]; // [latitude, longitude, optional intensity]
// interface HeatmapLayerProps {
//   points: Point[];
//   clickedZip: string | null;
//   showHeatmap: boolean;
// }

// const HeatmapLayer: React.FC<HeatmapLayerProps> = ({
//   points,
//   clickedZip,
//   showHeatmap,
// }) => {
//   const map = useMap();
//   const heatLayerRef = useRef<L.Layer | null>(null);

//   useEffect(() => {
//     if (!showHeatmap) {
//       if (heatLayerRef.current) {
//         map.removeLayer(heatLayerRef.current);
//         heatLayerRef.current = null;
//       }
//       return;
//     }

//     // Function to check if a point belongs to the selected ZIP code
//     const isPointInZip = (point: Point): boolean => {
//       if (!clickedZip) return true; // If no ZIP is selected, show all points

//       // Find the selected ZIP code boundary
//       const selectedZipFeature = zipCodeGeoJSON.features.find(
//         (feature) => feature.properties.ZIPCODE.toString() === clickedZip
//       );

//       if (!selectedZipFeature) return false; // If no boundary is found, return false

//       const pointGeoJSON = turf.point([point[1], point[0]]); // Convert point to GeoJSON format
//       const zipPolygon = turf.polygon(selectedZipFeature.geometry.coordinates);

//       return turf.booleanPointInPolygon(pointGeoJSON, zipPolygon);
//     };

//     const filteredPoints = points.filter(isPointInZip);
//     // Add heatmap only if filtered points exist
//     if (filteredPoints.length > 0) {
//       if (heatLayerRef.current) {
//         map.removeLayer(heatLayerRef.current);
//       }
//       heatLayerRef.current = L.heatLayer(filteredPoints, {
//         radius: 20,
//         blur: 15,
//         maxZoom: 17,
//       }).addTo(map);
//     }

//     // Cleanup function to remove the layer when component unmounts or updates
//     return () => {
//       if (heatLayerRef.current) {
//         map.removeLayer(heatLayerRef.current);
//         heatLayerRef.current = null;
//       }
//     };
//   }, [map, points, clickedZip, showHeatmap]);

//   return null;
// };

// export default HeatmapLayer;
