import React, { useState } from 'react';
import { useUserStore } from '../../stores';
import { useTranslation } from '../../i18n';
import LanguageToggle from '../shared/LanguageToggle';

interface StepIdentityProps {
  onNext: () => void;
}

const StepIdentity: React.FC<StepIdentityProps> = ({ onNext }) => {
  const { profile, updateProfile } = useUserStore();
  const { t } = useTranslation();
  const [name, setName] = useState(profile.name);

  const handleContinue = () => {
    updateProfile({
      name: name.trim(),
    });
    onNext();
  };

  return (
    <div className="flex flex-col gap-8 p-6 animate-fade-in">
      {/* Language */}
      <div className="flex items-center justify-between">
        <label className="text-sm text-zen-gray">
          {t('onboarding.languageLabel')}
        </label>
        <LanguageToggle />
      </div>

      {/* Name input */}
      <div>
        <label className="text-sm text-zen-gray block mb-2">
          {t('onboarding.nameLabel')}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('onboarding.namePlaceholder')}
          className="w-full border-b-2 border-japan-blue bg-transparent font-serif text-xl py-2 outline-none placeholder:text-gray-300"
        />
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!name.trim()}
        className="w-full py-4 bg-japan-blue text-white font-serif rounded-lg text-base tracking-wider disabled:opacity-40 transition-opacity"
      >
        {t('onboarding.continue')}
      </button>
    </div>
  );
};

export default StepIdentity;
