import React from 'react';
import { ArrowLeft, ExternalLink, Users, Clock, Star } from 'lucide-react';
import { useAppStore } from '../stores';

const BookingPage: React.FC = () => {
  const { selectedLocation, activeLens, setSubView } = useAppStore();

  return (
    <div className="flex flex-col h-full bg-washi-white animate-fade-in overflow-y-auto">
      <header className="p-5 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <button onClick={() => setSubView('main')} className="text-japan-blue">
          <ArrowLeft size={22} />
        </button>
        <div className="text-center">
          <p className="text-lg text-japan-blue font-serif font-bold">Book a Guide</p>
        </div>
        <div className="w-6" />
      </header>

      <div className="p-6 space-y-6 flex-1">
        {/* Location Context */}
        {selectedLocation && (
          <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-kintsugi-gold shrink-0">
              <img src={selectedLocation.imageUrl} className="w-full h-full object-cover" alt="" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-zen-gray font-bold">Your destination</p>
              <p className="text-lg font-serif font-bold text-japan-blue">{selectedLocation.kanji}</p>
              <p className="text-xs text-zen-gray">{selectedLocation.name} &middot; {activeLens} lens</p>
            </div>
          </div>
        )}

        {/* Guide Options */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider text-zen-gray font-bold">Choose Your Experience</h3>

          <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-japan-blue" />
                <span className="text-sm font-bold text-sumi-black">Student Guide</span>
              </div>
              <span className="text-sm font-bold text-japan-blue">from &yen;3,000</span>
            </div>
            <p className="text-xs text-zen-gray leading-relaxed">
              University students with deep local knowledge. Perfect for casual exploration and making new friends.
            </p>
            <div className="flex items-center gap-4 text-xs text-zen-gray">
              <span className="flex items-center gap-1"><Clock size={12} /> 2-3 hours</span>
              <span className="flex items-center gap-1"><Star size={12} /> 4.8 rating</span>
            </div>
          </div>

          <div className="p-5 bg-white border-2 border-kintsugi-gold rounded-xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-kintsugi-gold" />
                <span className="text-sm font-bold text-sumi-black">Expert Guide</span>
              </div>
              <span className="text-sm font-bold text-kintsugi-gold">from &yen;15,000</span>
            </div>
            <p className="text-xs text-zen-gray leading-relaxed">
              Experienced guides with decades of expertise. Access to hidden spots and exclusive experiences.
            </p>
            <div className="flex items-center gap-4 text-xs text-zen-gray">
              <span className="flex items-center gap-1"><Clock size={12} /> Half day</span>
              <span className="flex items-center gap-1"><Star size={12} /> 4.9 rating</span>
            </div>
            <span className="inline-block px-2 py-0.5 bg-kintsugi-gold/10 text-kintsugi-gold text-xs font-bold rounded-full">
              Recommended
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4 pt-4">
          <a
            href="https://tarushiru.line-ene.com/public-book/3"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-japan-blue text-white font-serif text-base flex items-center justify-center gap-3 rounded-lg shadow-lg active:scale-95 transition-all"
          >
            Book on TARUSHIRU <ExternalLink size={16} />
          </a>
          <button
            onClick={() => setSubView('main')}
            className="w-full py-3 text-xs uppercase tracking-wider text-zen-gray hover:text-japan-blue transition-colors font-bold"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
