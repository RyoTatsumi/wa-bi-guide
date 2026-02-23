import React from 'react';
import GreetingBanner from '../components/home/GreetingBanner';
import QuickActions from '../components/home/QuickActions';
import TodaysWhisper from '../components/home/TodaysWhisper';
import QuickLinks from '../components/home/QuickLinks';
import NearbyDiscovery from '../components/home/NearbyDiscovery';
import ProgressivePromptBanner from '../components/shared/ProgressivePromptBanner';
import LocationDetailPage from './LocationDetailPage';
import LensPage from './LensPage';
import WishlistPage from './WishlistPage';
import BookingPage from './BookingPage';
import JournalPage from './JournalPage';
import { useAppStore } from '../stores';

const HomePage: React.FC = () => {
  const subView = useAppStore((s) => s.subView);

  if (subView === 'location-detail') return <LocationDetailPage />;
  if (subView === 'lens') return <LensPage />;
  if (subView === 'wishlist') return <WishlistPage />;
  if (subView === 'booking') return <BookingPage />;
  if (subView === 'journal') return <JournalPage />;

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full animate-fade-in pb-24">
      <GreetingBanner />
      <QuickActions />
      <ProgressivePromptBanner />
      <NearbyDiscovery />
      <TodaysWhisper />
      <QuickLinks />
    </div>
  );
};

export default HomePage;
