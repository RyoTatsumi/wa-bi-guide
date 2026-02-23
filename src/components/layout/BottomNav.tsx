import React from 'react';
import { Home, Map, MessageSquare, User } from 'lucide-react';
import { useAppStore, useChatStore } from '../../stores';
import { TabId } from '../../types';

interface NavTab {
  id: TabId;
  label: string;
  icon: React.FC<{ size?: number; className?: string }>;
}

const tabs: NavTab[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: User },
];

const BottomNav: React.FC = () => {
  const currentTab = useAppStore((s) => s.currentTab);
  const setTab = useAppStore((s) => s.setTab);
  const messageCount = useChatStore((s) => s.messages.length);

  return (
    <nav className="h-16 bg-sumi-black flex justify-around items-center">
      {tabs.map(({ id, label, icon: Icon }) => {
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
