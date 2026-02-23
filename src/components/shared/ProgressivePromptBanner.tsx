import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { useProgressivePrompts } from '../../hooks/useProgressivePrompts';
import { useAppStore, useUserStore } from '../../stores';

const ProgressivePromptBanner: React.FC = () => {
  const { t } = useTranslation();
  const prompts = useProgressivePrompts();
  const setTab = useAppStore((s) => s.setTab);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const profile = useUserStore((s) => s.profile);

  if (prompts.length === 0) return null;
  const prompt = prompts[0];

  const dismiss = () => {
    updateProfile({
      dismissedPrompts: [...(profile.dismissedPrompts || []), prompt.type],
    });
  };

  return (
    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3 animate-fade-in">
      <Sparkles size={18} className="text-kintsugi-gold shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-sumi-black">
          {t(prompt.translationKey as any, prompt.params)}
        </p>
        <button
          onClick={() => setTab('profile')}
          className="mt-2 text-xs font-bold text-japan-blue"
        >
          {t('prompt.goToProfile')}
        </button>
      </div>
      <button onClick={dismiss} className="text-zen-gray">
        <X size={16} />
      </button>
    </div>
  );
};

export default ProgressivePromptBanner;
