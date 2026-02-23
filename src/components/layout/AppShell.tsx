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
    <div className="max-w-[430px] mx-auto h-screen bg-washi-white relative shadow-2xl overflow-hidden flex flex-col">
      {isOnboarded && <Header />}
      <main className="flex-1 relative overflow-hidden">{children}</main>
      {isOnboarded && <NearbyAlert />}
      {isOnboarded && <BottomNav />}
    </div>
  );
};

export default AppShell;
