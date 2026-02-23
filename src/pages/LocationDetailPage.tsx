import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles, BookOpen, ShoppingBag, Utensils, Store, AlertCircle, Info, Heart } from 'lucide-react';
import { useAppStore, useLocationStore } from '../stores';
import { generateLocationContent } from '../services';
import { useUserStore } from '../stores';
import { PhilosophyContent } from '../types';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const LocationDetailPage: React.FC = () => {
  const { selectedLocation, activeLens, setSubView } = useAppStore();
  const profile = useUserStore((s) => s.profile);
  const { markVisited, toggleFavorite, favoriteIds } = useLocationStore();
  const [content, setContent] = useState<PhilosophyContent | null>(null);
  const [loading, setLoading] = useState(true);

  const location = selectedLocation;

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    markVisited(location.id);
    generateLocationContent(location, profile, activeLens)
      .then(setContent)
      .finally(() => setLoading(false));
  }, [location?.id, activeLens]);

  if (!location) return null;

  const isFav = favoriteIds.includes(location.id);

  return (
    <div className="fixed inset-0 z-[600] bg-washi-white overflow-y-auto animate-fade-in flex flex-col max-w-[430px] mx-auto">
      {/* Hero */}
      <div className="relative h-64 w-full shrink-0">
        <img
          src={location.imageUrl}
          alt={location.name}
          className="w-full h-full object-cover filter sepia-[.15] contrast-110 saturate-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-washi-white via-transparent to-black/20" />
        <button
          onClick={() => setSubView('main')}
          className="absolute top-5 left-5 p-2 bg-white/90 rounded-full text-japan-blue backdrop-blur-md shadow-lg"
        >
          <ArrowLeft size={22} />
        </button>
        <button
          onClick={() => toggleFavorite(location.id)}
          className={`absolute top-5 right-5 p-2 rounded-full backdrop-blur-md shadow-lg ${isFav ? 'bg-red-500 text-white' : 'bg-white/90 text-zen-gray'}`}
        >
          <Heart size={22} fill={isFav ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-5 left-6">
          <h1 className="text-5xl font-serif text-sumi-black mb-1 drop-shadow-sm">{location.kanji}</h1>
          <h2 className="text-lg font-serif text-gray-700 tracking-wider">{location.name}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner message="Finding something special for you..." />
          </div>
        ) : (
          <div className="animate-slide-up space-y-8">
            {/* Title */}
            <h3 className="text-2xl font-serif text-japan-blue text-center leading-relaxed italic border-b border-gray-100 pb-6">
              "{content?.title}"
            </h3>

            {/* Personalized Insight */}
            <div className="relative p-6 border-l-4 border-kintsugi-gold bg-white shadow-md rounded-lg">
              <div className="flex items-center gap-2 mb-4 text-kintsugi-gold font-bold text-xs uppercase tracking-wider">
                <Sparkles size={18} />
                <span>Personalized for You</span>
              </div>
              <p className="text-sumi-black font-serif text-lg leading-relaxed italic">
                {content?.personalLensText}
              </p>
            </div>

            {/* Tips */}
            <div className="space-y-4">
              {content?.personalizedTips.warning && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex gap-3 items-start">
                  <AlertCircle className="text-red-700 shrink-0 mt-0.5" size={20} />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-800">Accessibility Note</span>
                    <p className="text-sm font-serif italic text-red-900 mt-1">{content.personalizedTips.warning}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4">
                {content?.personalizedTips.food && (
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
                    <div className="flex items-center gap-2 text-orange-800 font-bold text-xs uppercase tracking-wider mb-2">
                      <Utensils size={16} /><span>Where to Eat</span>
                    </div>
                    <p className="text-sm font-serif italic text-orange-900">{content.personalizedTips.food}</p>
                  </div>
                )}
                {content?.personalizedTips.shopping && (
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider mb-2">
                      <Store size={16} /><span>What to Find</span>
                    </div>
                    <p className="text-sm font-serif italic text-blue-900">{content.personalizedTips.shopping}</p>
                  </div>
                )}
              </div>
            </div>

            {/* History */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-japan-blue font-bold text-xs uppercase tracking-wider border-b border-gray-100 pb-3">
                <Info size={16} /><span>History & Context</span>
              </div>
              <p className="text-sumi-black font-serif leading-relaxed text-base">{content?.historicalContext}</p>
            </div>

            {/* Philosophy */}
            <div className="py-10 px-6 border-y border-gray-100 bg-japan-blue/[0.03] text-center rounded-lg">
              <span className="text-xs text-zen-gray uppercase tracking-widest block mb-4">Knowing Contentment</span>
              <p className="text-xl font-serif text-japan-blue italic">"{content?.taruWoShiruLesson}"</p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 gap-4 pb-16">
              <button
                onClick={() => setSubView('booking')}
                className="w-full py-4 bg-japan-blue text-white font-serif text-base rounded-lg shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <BookOpen size={20} className="text-kintsugi-gold" />
                Book a Local Guide
              </button>
              <button
                onClick={() => setSubView('lens')}
                className="w-full py-3.5 border-2 border-sumi-black text-sumi-black font-serif text-sm flex items-center justify-center gap-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag size={18} />
                Scan Souvenirs Nearby
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetailPage;
