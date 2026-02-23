import React from 'react';
import { Home, Map, MessageSquare, User } from 'lucide-react';
import { useAppStore, useChatStore } from '../../stores';
import { useTranslation } from '../../i18n';
import { TabId } from '../../types';

interface NavTab {
  id: TabId;
  labelKey: 'nav.home' | 'nav.map' | 'nav.chat' | 'nav.profile';
  icon: React.FC<{ size?: number; className?: string }>;
}

const tabs: NavTab[] = [
  { id: 'home', labelKey: 'nav.home', icon: Home },
  { id: 'map', labelKey: 'nav.map', icon: Map },
  { id: 'chat', labelKey: 'nav.chat', icon: MessageSquare },
  { id: 'profile', labelKey: 'nav.profile', icon: User },
];

const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  const currentTab = useAppStore((s) => s.currentTab);
  const setTab = useAppStore((s) => s.setTab);
  const messageCount = useChatStore((s) => s.messages.length);

  return (
    <nav className="h-16 bg-sumi-black flex justify-around items-center">
      {tabs.map(({ id, labelKey, icon: Icon }) => {
        const label = t(labelKey);
        const isActive = currentTab === id;
        return (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="flex flex-col items-center gap-0.5 relative"
          >
            <div className="relative">
              <Icon
                size={22}
                className={isActive ? 'text-kintsugi-gold' : 'text-white/30'}
              />
              {id === 'chat' && messageCount === 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
              )}
            </div>
            <span
              className={`text-[11px] font-bold tracking-wider uppercase ${
                isActive ? 'text-kintsugi-gold' : 'text-white/30'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
