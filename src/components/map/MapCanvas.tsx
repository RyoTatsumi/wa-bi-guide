import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../stores';
import { LOCATIONS } from '../../constants/locations';
import { AREA_CENTERS, REGIONAL_MARKERS } from '../../constants/areas';
import { InterestCategory, Location } from '../../types';

declare global {
  interface Window {
    L: any;
  }
}

const CATEGORY_COLORS: Record<InterestCategory, string> = {
  Samurai: '#1e3b7a',
  Zen: '#c5a059',
  Craft: '#7a4e1e',
  Culture: '#b23a48',
  DailyLife: '#4a4e69',
  Anime: '#ff4d6d',
  Nature: '#2d6a4f',
  Food: '#e67e22',
  Shopping: '#2980b9',
};

interface MapCanvasProps {
  onLocationSelect: (location: Location) => void;
}

const MapCanvas: React.FC<MapCanvasProps> = ({ onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any>(null);

  const activeLens = useAppStore((s) => s.activeLens);
  const activeArea = useAppStore((s) => s.activeArea);
  const userPosition = useAppStore((s) => s.userPosition);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    const center = AREA_CENTERS[activeArea];
    const map = L.map(mapRef.current, {
      center: [center.lat, center.lng],
      zoom: 13,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Fly to area center when activeArea changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const center = AREA_CENTERS[activeArea];
    map.flyTo([center.lat, center.lng], 13, { duration: 1.2 });
  }, [activeArea]);

  // Update markers when lens, area, or zoom changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = window.L;
    if (!map || !L) return;

    const updateMarkers = () => {
      if (markersRef.current) {
        map.removeLayer(markersRef.current);
      }

      const zoom = map.getZoom();
      const markers = L.markerClusterGroup
        ? L.markerClusterGroup({ maxClusterRadius: 40 })
        : L.layerGroup();

      // Filter locations based on area and zoom
      const filtered = LOCATIONS.filter((loc) => {
        if (loc.area !== activeArea) return false;
        if (zoom < 12 && loc.priority > 1) return false;
        if (zoom < 14 && loc.priority > 2) return false;
        return true;
      });

      filtered.forEach((loc) => {
        const color = CATEGORY_COLORS[loc.category] || '#6b7280';
        const isActiveLens = loc.category === activeLens;
        const size = isActiveLens ? 14 : 10;
        const opacity = isActiveLens ? 1 : 0.7;

        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            opacity: ${opacity};
          "></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([loc.coordinates.lat, loc.coordinates.lng], { icon });
        marker.on('click', () => onLocationSelect(loc));
        marker.bindTooltip(loc.name, {
          direction: 'top',
          offset: [0, -8],
          className: 'map-tooltip',
        });
        markers.addLayer(marker);
      });

      // Add regional markers at lower zoom
      if (zoom < 12) {
        REGIONAL_MARKERS
          .filter((rm) => {
            if (activeArea === 'Kyoto') return rm.coords[0] > 34.9;
            if (activeArea === 'Osaka') return rm.coords[0] < 34.75 && rm.coords[0] > 34.6;
            return rm.coords[0] < 34.7;
          })
          .forEach((rm) => {
            const icon = L.divIcon({
              className: 'region-marker',
              html: `<div style="
                background: ${rm.color};
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: bold;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              ">${rm.kanji} ${rm.name}</div>`,
              iconSize: [0, 0],
            });
            L.marker(rm.coords, { icon }).addTo(markers);
          });
      }

      markers.addTo(map);
      markersRef.current = markers;
    };

    updateMarkers();
    map.on('zoomend', updateMarkers);

    return () => {
      map.off('zoomend', updateMarkers);
    };
  }, [activeLens, activeArea, onLocationSelect]);

  // User location marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = window.L;
    if (!map || !L || !userPosition) return;

    const userIcon = L.divIcon({
      className: 'user-marker',
      html: `<div style="
        width: 16px;
        height: 16px;
        background: #3b82f6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(59,130,246,0.3), 0 2px 6px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    const userMarker = L.marker([userPosition.lat, userPosition.lng], {
      icon: userIcon,
      zIndexOffset: 1000,
    }).addTo(map);

    return () => {
      map.removeLayer(userMarker);
    };
  }, [userPosition]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapCanvas;
