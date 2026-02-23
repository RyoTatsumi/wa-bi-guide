import React from 'react';
import { useAppStore } from '../../stores';
import { useTranslation } from '../../i18n';

const EscalationBanner: React.FC = () => {
  const { t } = useTranslation();
  const setSubView = useAppStore((s) => s.setSubView);

  return (
    <div className="mx-4 p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-3">
      <p className="text-sm font-bold text-sumi-black">{t('chat.needMoreHelp')}</p>
      <div className="flex gap-2">
        <a
          href="https://line.me/R/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 bg-green-500 text-white rounded-lg text-xs font-bold text-center"
        >
          {t('chat.talkToHuman')}
        </a>
        <button
          onClick={() => setSubView('booking')}
          className="flex-1 py-2 bg-japan-blue text-white rounded-lg text-xs font-bold"
        >
          {t('chat.bookGuide')}
        </button>
      </div>
    </div>
  );
};

export default EscalationBanner;
