import React from 'react';
import { useUserStore } from '../../stores';
import Header from './Header';
import BottomNav from './BottomNav';
import NearbyAlert from '../shared/NearbyAlert';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const isOnboarded = useUserStore((s) => s.isOnboarded);

  return (
    <div className="max-w-[430px] mx-auto h-screen bg-washi-white relative shadow-2xl flex flex-col overflow-hidden">
      {isOnboarded && <Header />}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden min-h-0">{children}</main>
      {isOnboarded && <NearbyAlert />}
      {isOnboarded && (
        <div className="shrink-0 sticky bottom-0 z-[600]">
          <BottomNav />
        </div>
      )}
    </div>
  );
};

export default AppShell;
