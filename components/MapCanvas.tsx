
import React, { useEffect, useRef, useState } from 'react';
import { Location, InterestCategory } from '../types';

declare global {
  interface Window {
    L: any;
  }
}

interface MapCanvasProps {
  locations: Location[];
  onLocationSelect: (loc: Location) => void;
  userLocation: { lat: number; lng: number } | null;
  targetLocation: { lat: number; lng: number } | null;
  activeLens: InterestCategory;
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
  Shopping: '#2980b9'
};

const REGIONAL_MARKERS = [
  { name: 'Kyoto Central', kanji: '京都', coords: [35.0116, 135.7681], color: '#1e3b7a', type: 'city' },
  { name: 'Arashiyama', kanji: '嵐山', coords: [35.0169, 135.6720], color: '#2d6a4f', type: 'district' },
  { name: 'Higashiyama', kanji: '東山', coords: [34.9949, 135.7850], color: '#b23a48', type: 'district' },
  { name: 'Osaka Central', kanji: '大阪', coords: [34.6937, 135.5023], color: '#e67e22', type: 'city' },
  { name: 'Namba', kanji: '難波', coords: [34.6687, 135.5013], color: '#ff4d6d', type: 'district' },
  { name: 'Shinsekai', kanji: '新世界', coords: [34.6525, 135.5063], color: '#4a4e69', type: 'district' },
  { name: 'Nara Central', kanji: '奈良', coords: [34.6851, 135.8327], color: '#2d6a4f', type: 'city' },
  { name: 'Nishinokyo', kanji: '西ノ京', coords: [34.6685, 135.7842], color: '#c5a059', type: 'district' }
];

const MapCanvas: React.FC<MapCanvasProps> = ({ locations, onLocationSelect, userLocation, targetLocation, activeLens }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const clusterGroupRef = useRef<any>(null);
  const pulseLayerRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const [zoomLevel, setZoomLevel] = useState(10);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = window.L.map(mapContainerRef.current, {
      center: [34.8, 135.7],
      zoom: 10,
      zoomControl: false,
      attributionControl: false,
      maxBounds: [[34.0, 134.5], [36.0, 136.5]]
    });

    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      className: 'zen-map-tiles'
    }).addTo(map);

    mapInstanceRef.current = map;

    clusterGroupRef.current = window.L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 25
    });
    map.addLayer(clusterGroupRef.current);

    pulseLayerRef.current = window.L.layerGroup().addTo(map);

    map.on('zoomend', () => setZoomLevel(map.getZoom()));

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 移動の制御
  useEffect(() => {
    if (!mapInstanceRef.current || !targetLocation) return;
    mapInstanceRef.current.flyTo([targetLocation.lat, targetLocation.lng], 14, { duration: 1.5 });
  }, [targetLocation]);

  // 現在地マーカーの更新
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;
    const map = mapInstanceRef.current;
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    } else {
      const userIcon = window.L.divIcon({
        className: 'user-marker',
        html: `<div class="relative"><div class="absolute w-12 h-12 bg-blue-500 opacity-20 rounded-full animate-pulse"></div><div class="w-5 h-5 bg-blue-700 rounded-full border-2 border-white shadow-xl"></div></div>`,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      });
      userMarkerRef.current = window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 3000 }).addTo(map);
    }
  }, [userLocation]);

  useEffect(() => {
    if (!mapInstanceRef.current || !clusterGroupRef.current || !pulseLayerRef.current) return;
    const map = mapInstanceRef.current;
    const cluster = clusterGroupRef.current;
    const pulseLayer = pulseLayerRef.current;

    cluster.clearLayers();
    pulseLayer.clearLayers();

    const currentPulses = REGIONAL_MARKERS.filter(p => {
      if (zoomLevel < 11) return p.type === 'city';
      if (zoomLevel < 13) return p.type === 'district';
      return false;
    });

    currentPulses.forEach(p => {
      const size = p.type === 'city' ? 80 : 60;
      const pulseIcon = window.L.divIcon({
        className: 'pulse-icon',
        html: `
          <div class="flex flex-col items-center">
            <div style="
              width: ${size}px; height: ${size}px;
              background: white; border: 3px solid ${p.color};
              border-radius: 50%; display: flex; align-items: center; justify-content: center;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative;
            ">
              <div class="absolute inset-0 bg-[${p.color}] opacity-10 rounded-full animate-ping"></div>
              <span style="color: ${p.color}; font-weight: bold; font-family: serif; font-size: ${size/4}px;">${p.kanji}</span>
            </div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size/2, size/2]
      });
      window.L.marker(p.coords, { icon: pulseIcon }).on('click', () => map.flyTo(p.coords, zoomLevel + 3)).addTo(pulseLayer);
    });

    if (zoomLevel >= 11) {
      const filtered = locations.filter(loc => {
        const isLensMatch = loc.category === activeLens;
        if (zoomLevel < 13) return loc.priority === 1;
        if (zoomLevel < 15) return loc.priority <= 2 || isLensMatch;
        return true;
      });

      filtered.forEach(loc => {
        const color = CATEGORY_COLORS[loc.category];
        const isMajor = loc.priority === 1;
        const iconScale = isMajor ? 1.2 : 0.8;

        const zenIcon = window.L.divIcon({
          className: 'zen-pin',
          html: `
            <div class="flex flex-col items-center">
              <div style="
                width: ${28 * iconScale}px; height: ${28 * iconScale}px;
                background: #fcfaf2; border: 2px solid ${color};
                border-radius: 50%; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 4px 10px rgba(0,0,0,0.15); transition: all 0.3s;
              ">
                <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%;"></div>
              </div>
              ${zoomLevel >= 15 ? `<span style="font-size: 10px; font-weight: bold; color: ${color}; background: rgba(255,255,255,0.8); padding: 0 4px; border-radius: 2px; margin-top: 2px; white-space: nowrap;">${loc.kanji}</span>` : ''}
            </div>
          `,
          iconSize: [30, 40],
          iconAnchor: [15, 15]
        });

        const marker = window.L.marker([loc.coordinates.lat, loc.coordinates.lng], { icon: zenIcon })
          .on('click', () => onLocationSelect(loc));
        cluster.addLayer(marker);
      });
    }
  }, [locations, activeLens, zoomLevel, onLocationSelect]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      <div className="absolute top-24 left-4 z-[500] vertical-text space-y-4 opacity-30 pointer-events-none select-none text-japan-blue font-serif">
        <span className="text-sm tracking-widest uppercase">Ancient Ledger</span>
        <span className="text-xs italic">314 Souls Discovered</span>
      </div>
    </div>
  );
};

export default MapCanvas;
