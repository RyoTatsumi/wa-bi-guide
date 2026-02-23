import { useEffect } from 'react';
import { useAppStore } from '../stores';
import { getCurrentPosition } from '../services';

export function useGeolocation() {
  const setUserPosition = useAppStore((s) => s.setUserPosition);
  const userPosition = useAppStore((s) => s.userPosition);

  useEffect(() => {
    getCurrentPosition()
      .then(setUserPosition)
      .catch((err) => console.warn('Geolocation failed:', err));
  }, [setUserPosition]);

  const refreshPosition = () => {
    getCurrentPosition()
      .then(setUserPosition)
      .catch((err) => console.warn('Geolocation refresh failed:', err));
  };

  return { userPosition, refreshPosition };
}
