import React from 'react';
import { useUserStore, useAppStore } from './stores';
import { useGeolocation } from './hooks/useGeolocation';
import AppShell from './components/layout/AppShell';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  const isOnboarded = useUserStore((s) => s.isOnboarded);
  const currentTab = useAppStore((s) => s.currentTab);

  // Initialize geolocation
  useGeolocation();

  if (!isOnboarded) {
    return (
      <AppShell>
        <OnboardingPage />
      </AppShell>
    );
  }

  const renderPage = () => {
    switch (currentTab) {
      case 'home': return <HomePage />;
      case 'map': return <MapPage />;
      case 'chat': return <ChatPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <AppShell>
      {renderPage()}
    </AppShell>
  );
};

export default App;
