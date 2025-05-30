// src/leaflet-heat.d.ts
import "leaflet";

declare module "leaflet" {
  function heatLayer(
    latlngs: [number, number, number?][],
    options?: {
      radius?: number;
      blur?: number;
      maxZoom?: number;
      max?: number;
      minOpacity?: number;
      opacity?: number;
    }
  ): Layer;
}
