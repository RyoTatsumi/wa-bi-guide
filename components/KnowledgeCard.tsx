
import React, { useEffect, useState } from 'react';
import { Location, PhilosophyContent, InterestCategory, UserProfile } from '../types';
import { generateLocationPhilosophy } from '../services/geminiService';
import { ArrowLeft, Sparkles, BookOpen, ShoppingBag, Utensils, Store, Info, AlertCircle } from 'lucide-react';

interface KnowledgeCardProps {
  location: Location;
  profile: UserProfile;
  activeLens: InterestCategory;
  onBack: () => void;
  onBookGuide: () => void;
  onShopArtifacts: () => void;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ location, profile, activeLens, onBack, onBookGuide, onShopArtifacts }) => {
  const [content, setContent] = useState<PhilosophyContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await generateLocationPhilosophy(location, profile, activeLens);
      setContent(data);
      setLoading(false);
    };
    fetchData();
  }, [location, activeLens, profile]);

  return (
    <div className="fixed inset-0 z-[600] bg-washi-white overflow-y-auto animate-fade-in flex flex-col">
      <div className="relative h-80 w-full shrink-0">
        <img src={location.imageUrl} alt={location.name} className="w-full h-full object-cover filter sepia-[.2] contrast-125 saturate-[.6]" />
        <div className="absolute inset-0 bg-gradient-to-t from-washi-white via-transparent to-black/20"></div>
        <button onClick={onBack} className="absolute top-6 left-6 p-2 bg-white/90 rounded-full text-japan-blue backdrop-blur-md shadow-lg"><ArrowLeft size={24} /></button>
        <div className="absolute bottom-6 left-8">
          <h1 className="text-6xl font-serif text-sumi-black mb-1 drop-shadow-sm">{location.kanji}</h1>
          <h2 className="text-xl font-serif text-gray-800 tracking-widest italic">{location.name}</h2>
        </div>
      </div>

      <div className="px-8 py-10 space-y-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="w-16 h-16 border-4 border-kintsugi-gold border-t-transparent rounded-full animate-spin"></div>
            <p className="font-serif text-gray-500 italic tracking-widest">Consulting the Soul Ledger...</p>
          </div>
        ) : (
          <div className="animate-slide-up space-y-12">
            <h3 className="text-3xl font-serif text-japan-blue text-center leading-relaxed italic border-b border-japan-blue/5 pb-8">"{content?.title}"</h3>

            {/* AI Insight */}
            <div className="relative p-8 border-l-8 border-kintsugi-gold bg-white shadow-xl rounded-sm">
              <div className="flex items-center gap-3 mb-6 text-kintsugi-gold font-bold text-xs uppercase tracking-[0.3em]">
                <Sparkles size={20} />
                <span>Personalized Mirror</span>
              </div>
              <p className="text-gray-900 font-serif text-xl leading-loose italic">{content?.personalLensText}</p>
            </div>

            {/* Recommendations & Safety */}
            <div className="space-y-6">
               {content?.personalizedTips.warning && (
                 <div className="p-6 bg-red-50 border border-red-100 rounded-sm flex gap-4 items-start">
                   <AlertCircle className="text-red-800 shrink-0" size={24} />
                   <div className="space-y-1">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-red-900">Safety & Ease</span>
                     <p className="text-sm font-serif italic text-red-950">{content.personalizedTips.warning}</p>
                   </div>
                 </div>
               )}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content?.personalizedTips.food && (
                    <div className="p-6 bg-orange-50 border border-orange-100 rounded-sm">
                      <div className="flex items-center gap-2 text-orange-900 font-bold text-[10px] uppercase tracking-widest mb-4">
                        <Utensils size={16} /><span>Flavor Guidance</span>
                      </div>
                      <p className="text-md font-serif italic text-orange-950">{content.personalizedTips.food}</p>
                    </div>
                  )}
                  {content?.personalizedTips.shopping && (
                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-sm">
                      <div className="flex items-center gap-2 text-blue-900 font-bold text-[10px] uppercase tracking-widest mb-4">
                        <Store size={16} /><span>Material Treasure</span>
                      </div>
                      <p className="text-md font-serif italic text-blue-950">{content.personalizedTips.shopping}</p>
                    </div>
                  )}
               </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-japan-blue font-bold text-xs uppercase tracking-widest border-b border-japan-blue/10 pb-4">
                <Info size={18} /><span>The Chronicles</span>
              </div>
              <p className="text-sumi-black font-serif leading-loose text-xl">{content?.historicalContext}</p>
            </div>

            <div className="py-16 px-10 border-y border-japan-blue/5 bg-japan-blue/[0.03] text-center rounded-sm">
               <span className="text-[11px] text-gray-500 uppercase tracking-[0.6em] block mb-6">Knowing Contentment</span>
               <p className="text-2xl font-serif text-japan-blue italic">"{content?.taruWoShiruLesson}"</p>
            </div>

            <div className="grid grid-cols-1 gap-6 pb-20">
               <button onClick={onBookGuide} className="w-full py-6 bg-japan-blue text-white font-serif text-xl rounded-sm shadow-2xl flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all">
                 <BookOpen size={24} className="text-kintsugi-gold" />
                 Journey with a Soul Guide
               </button>
               <button onClick={onShopArtifacts} className="w-full py-5 border-2 border-sumi-black text-sumi-black font-serif text-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                 <ShoppingBag size={20} />
                 Carry the Legacy (EC)
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeCard;
