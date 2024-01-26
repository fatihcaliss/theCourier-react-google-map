import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import useGetRegionAndRouteData from "../hooks/useGetRegionAndRouteData";

//Google Maps API key
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const libraries = ["geometry", "drawing"];
const DEFAULT_ZOOM = 13;

function Map({ selectedRegion }) {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const { routeData, polygonPath, mapCenter } =
    useGetRegionAndRouteData(selectedRegion);

  let polylinePath, courierPosition, endMarkerPosition;

  if (routeData) {
    ({ polylinePath, courierPosition, endMarkerPosition } = routeData);
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-64 h-64 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 flex justify-center items-center" />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
      center={mapCenter}
      zoom={DEFAULT_ZOOM}
      onLoad={(map) => setMap(map)}
    >
      {courierPosition && (
        <Marker
          position={courierPosition}
          icon={{
            url: "/assets/courier-marker.png",
            scaledSize: new window.google.maps.Size(48, 54),
          }}
        />
      )}

      {endMarkerPosition && (
        <Marker
          position={endMarkerPosition}
          icon={{
            url: "/assets/home-marker.png",
            scaledSize: new window.google.maps.Size(48, 54),
          }}
        />
      )}

      {Boolean(polygonPath.length > 0) && (
        <Polygon
          path={polygonPath}
          options={{
            fillColor: "gray",
            fillOpacity: 0.4,
            strokeColor: "gray",
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
      )}

      {polylinePath && (
        <Polyline
          path={polylinePath}
          options={{
            strokeColor: "#0293ed",
            strokeOpacity: 1,
            strokeWeight: 6,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default Map;
