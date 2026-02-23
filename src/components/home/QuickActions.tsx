import React from 'react';
import { Map, Utensils, ShoppingBag, MessageSquare } from 'lucide-react';
import { useAppStore } from '../../stores';
import { useTranslation } from '../../i18n';

const QuickActions: React.FC = () => {
  const { t } = useTranslation();
  const setTab = useAppStore((s) => s.setTab);
  const setSubView = useAppStore((s) => s.setSubView);

  const actions = [
    {
      icon: Map,
      title: t('home.explore'),
      description: t('home.exploreDesc'),
      onClick: () => setTab('map'),
      bgClass: 'bg-blue-50 border-blue-100',
    },
    {
      icon: Utensils,
      title: t('home.eat'),
      description: t('home.eatDesc'),
      onClick: () => setTab('chat'), // pre-fill food context
      bgClass: 'bg-orange-50 border-orange-100',
    },
    {
      icon: ShoppingBag,
      title: t('home.shop'),
      description: t('home.shopDesc'),
      onClick: () => setSubView('lens'),
      bgClass: 'bg-amber-50 border-amber-100',
    },
    {
      icon: MessageSquare,
      title: t('home.helpMe'),
      description: t('home.helpMeDesc'),
      onClick: () => setTab('chat'),
      bgClass: 'bg-green-50 border-green-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <button
          key={action.title}
          onClick={action.onClick}
          className={`p-4 border rounded-xl flex flex-col gap-2 text-left transition-all active:scale-95 ${action.bgClass}`}
        >
          <action.icon size={24} className="text-sumi-black" />
          <div>
            <div className="text-sm font-bold text-sumi-black">
              {action.title}
            </div>
            <div className="text-xs text-zen-gray">{action.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
