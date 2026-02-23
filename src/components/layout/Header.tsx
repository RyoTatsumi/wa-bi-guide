import React from 'react';
import { User } from 'lucide-react';
import { useAppStore } from '../../stores';

const Header: React.FC = () => {
  const setTab = useAppStore((s) => s.setTab);

  return (
    <header className="h-14 bg-washi-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 flex items-center justify-between px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 border-2 border-japan-blue rounded-sm flex items-center justify-center">
          <span className="text-japan-blue font-serif font-bold text-lg leading-none">
            和
          </span>
        </div>
        <span className="text-lg font-serif font-bold text-japan-blue">
          Wa-Bi
        </span>
      </div>

      {/* Right: Profile button */}
      <button
        onClick={() => setTab('profile')}
        className="w-9 h-9 rounded-full border-2 border-kintsugi-gold flex items-center justify-center"
      >
        <User size={18} className="text-kintsugi-gold" />
      </button>
    </header>
  );
};

export default Header;
