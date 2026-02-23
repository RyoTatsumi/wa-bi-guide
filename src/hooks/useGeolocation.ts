import { useEffect, useRef } from 'react';
import { useAppStore, useLocationStore } from '../stores';
import { getCurrentPosition } from '../services';
import { calculateDistance } from '../utils/geo';
import { LOCATIONS, AREA_CENTERS } from '../constants';
import { Area } from '../types';

const PROXIMITY_THRESHOLD = 500; // meters

export function useGeolocation() {
  const setUserPosition = useAppStore((s) => s.setUserPosition);
  const setActiveArea = useAppStore((s) => s.setActiveArea);
  const userPosition = useAppStore((s) => s.userPosition);
  const markVisited = useLocationStore((s) => s.markVisited);
  const visitedIds = useLocationStore((s) => s.visitedIds);
  const visitedRef = useRef(visitedIds);
  visitedRef.current = visitedIds;

  // Initial position fetch
  useEffect(() => {
    getCurrentPosition()
      .then(setUserPosition)
      .catch((err) => console.warn('Geolocation failed:', err));
  }, [setUserPosition]);

  // Continuous tracking via watchPosition
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserPosition(pos);

        // Auto-detect area based on distance to AREA_CENTERS
        let closestArea: Area = 'Kyoto';
        let closestDist = Infinity;
        for (const [area, center] of Object.entries(AREA_CENTERS) as [Area, { lat: number; lng: number }][]) {
          const dist = calculateDistance(pos.lat, pos.lng, center.lat, center.lng);
          if (dist < closestDist) {
            closestDist = dist;
            closestArea = area;
          }
        }
        setActiveArea(closestArea);

        // Check proximity to locations
        for (const loc of LOCATIONS) {
          if (visitedRef.current.includes(loc.id)) continue;
          const dist = calculateDistance(
            pos.lat, pos.lng,
            loc.coordinates.lat, loc.coordinates.lng
          );
          if (dist <= PROXIMITY_THRESHOLD) {
            markVisited(loc.id);
            window.dispatchEvent(
              new CustomEvent('wa-bi:location-entered', {
                detail: { locationId: loc.id, name: loc.name, kanji: loc.kanji },
              })
            );
          }
        }
      },
      (err) => console.warn('Watch position error:', err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [setUserPosition, setActiveArea, markVisited]);

  const refreshPosition = () => {
    getCurrentPosition()
      .then(setUserPosition)
      .catch((err) => console.warn('Geolocation refresh failed:', err));
  };

  return { userPosition, refreshPosition };
}
