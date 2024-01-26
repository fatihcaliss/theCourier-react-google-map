import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchRegionById, fetchRouteByRegionId } from "../services";

import { decode } from "@googlemaps/polyline-codec";
import convertDecodedArrToPolyline from "../utils/convertDecodedArrToPolyline";
import { useEffect, useMemo } from "react";
import convertArrayToPolygon from "../utils/convertArrayToPolygon";

const DEFAULT_COORDINATES = { lat: 41.03250472755143, lng: 28.893348111612784 };

const useGetRegionAndRouteData = (regionId) => {
  const queryClient = useQueryClient();

  const { data: regionData, isLoading: isRegionLoading } = useQuery({
    queryKey: ["getRegionById", regionId],
    queryFn: () => fetchRegionById(regionId),
    enabled: !!regionId,
    select: ({ data }) => data,
  });

  const { data: routeData, isLoading: isRouteLoading } = useQuery({
    queryKey: ["getRouteByRegionId", regionId],
    queryFn: () => fetchRouteByRegionId(regionId),
    enabled: !!regionId,
    select: ({ data }) => {
      const decodedCoordinates = decode(data.encodedPolyline) || [];

      const polylinePath = convertDecodedArrToPolyline([decodedCoordinates]);

      let courierPosition = JSON.parse(
        localStorage.getItem("lastPositionCourier")
      );

      if (!courierPosition) {
        courierPosition = { ...polylinePath[0], index: 0 };
        localStorage.setItem(
          "lastPositionCourier",
          JSON.stringify(courierPosition)
        );
      }

      const endMarkerPosition = polylinePath[polylinePath.length - 1];

      return { polylinePath, courierPosition, endMarkerPosition };
    },
    placeholderData: {
      polylinePath: [],
      courierPosition: null,
      endMarkerPosition: null,
    },
  });

  const updateCourierPosition = () => {
    if (!routeData || !routeData.polylinePath.length) return;

    const lastPositionCourier = JSON.parse(
      localStorage.getItem("lastPositionCourier")
    );

    if (!lastPositionCourier) return;

    const nextPositionIndex =
      (lastPositionCourier.index + 1) % routeData.polylinePath.length;
    const polylinePathLatLng = routeData.polylinePath[nextPositionIndex];

    const nextPositionCourier = {
      ...lastPositionCourier,
      lat: polylinePathLatLng.lat,
      lng: polylinePathLatLng.lng,
      index: nextPositionIndex,
    };

    localStorage.setItem(
      "lastPositionCourier",
      JSON.stringify(nextPositionCourier)
    );

    queryClient.setQueryData(["getRouteByRegionId", regionId], (oldData) => {
      return {
        ...oldData,
        courierPosition: nextPositionCourier,
      };
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      updateCourierPosition();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [routeData]);

  const polygonPath = useMemo(() => {
    if (!regionData?.polygon?.coordinates) return [];

    return convertArrayToPolygon(regionData.polygon?.coordinates);
  }, [regionData?.polygon?.coordinates]);

  const mapCenter = useMemo(() => {
    if (!regionData?.center?.coordinates) {
      return DEFAULT_COORDINATES;
    }

    return {
      lat: regionData.center?.coordinates[1],
      lng: regionData.center?.coordinates[0],
    };
  }, [regionData?.center?.coordinates]);

  return {
    routeData,
    polygonPath,
    mapCenter,
    isLoading: isRegionLoading || isRouteLoading,
  };
};

export default useGetRegionAndRouteData;
