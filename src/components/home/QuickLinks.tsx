import React from 'react';
import { ExternalLink, Package } from 'lucide-react';
import { useAppStore } from '../../stores';
import { useTranslation } from '../../i18n';

const QuickLinks: React.FC = () => {
  const { t } = useTranslation();
  const setSubView = useAppStore((s) => s.setSubView);

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
      <a
        href="https://tarushiru.line-ene.com/public-book/3"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-bold whitespace-nowrap"
      >
        <ExternalLink size={14} />
        {t('home.bookGuide')}
      </a>
      <button
        onClick={() => setSubView('lens')}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-bold whitespace-nowrap"
      >
        <Package size={14} />
        {t('home.shipSouvenirs')}
      </button>
    </div>
  );
};

export default QuickLinks;
