import React, { useState, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';
import { useAppStore } from '../../stores';
import { useTranslation } from '../../i18n';
import { Location } from '../../types';

const NearbyAlert: React.FC = () => {
  const { t } = useTranslation();
  const navigateToLocation = useAppStore((s) => s.navigateToLocation);
  const [alertLocation, setAlertLocation] = useState<Location | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const loc = (e as CustomEvent<Location>).detail;
      setAlertLocation(loc);
      setTimeout(() => setAlertLocation(null), 8000);
    };
    window.addEventListener('wabi-nearby', handler);
    return () => window.removeEventListener('wabi-nearby', handler);
  }, []);

  if (!alertLocation) return null;

  return (
    <div className="fixed top-16 left-4 right-4 z-[700] max-w-[398px] mx-auto animate-slide-down">
      <div className="p-4 bg-white border-2 border-kintsugi-gold rounded-xl shadow-lg flex items-start gap-3">
        <MapPin size={20} className="text-kintsugi-gold shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-bold text-sumi-black">
            {t('home.nearbyAlert', { name: alertLocation.name })}
          </p>
          <p className="text-xs text-zen-gray mt-1">{t('home.nearbyAlertDetail')}</p>
          <button
            onClick={() => {
              navigateToLocation(alertLocation);
              setAlertLocation(null);
            }}
            className="mt-2 text-xs font-bold text-japan-blue"
          >
            {t('home.learnMore')}
          </button>
        </div>
        <button onClick={() => setAlertLocation(null)} className="text-zen-gray">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default NearbyAlert;
