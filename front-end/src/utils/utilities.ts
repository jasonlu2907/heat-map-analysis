// Function to calculate the centroid (center) of a polygon
export const calculateCentroid = (
  coordinates: number[][]
): [number, number] => {
  let latSum = 0,
    lonSum = 0;
  const count = coordinates.length;

  coordinates.forEach(([lon, lat]) => {
    latSum += lat;
    lonSum += lon;
  });
  return [latSum / count, lonSum / count];
};
