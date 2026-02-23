import React from 'react';
import { useUserStore } from '../../stores';

const LanguageToggle: React.FC = () => {
  const language = useUserStore((s) => s.profile.language);
  const updateProfile = useUserStore((s) => s.updateProfile);

  return (
    <div className="flex rounded-full border border-gray-200 overflow-hidden">
      <button
        onClick={() => updateProfile({ language: 'en' })}
        className={`px-4 py-1.5 text-xs font-bold transition-colors ${
          language === 'en' ? 'bg-japan-blue text-white' : 'text-zen-gray'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => updateProfile({ language: 'ja' })}
        className={`px-4 py-1.5 text-xs font-bold transition-colors ${
          language === 'ja' ? 'bg-japan-blue text-white' : 'text-zen-gray'
        }`}
      >
        JA
      </button>
    </div>
  );
};

export default LanguageToggle;
