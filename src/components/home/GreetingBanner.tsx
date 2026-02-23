import React from 'react';
import { useUserStore } from '../../stores';

const GreetingBanner: React.FC = () => {
  const name = useUserStore((s) => s.profile.name);
  const getDayCount = useUserStore((s) => s.getDayCount);

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-sumi-black">
        {getGreeting()}, {name}
      </h1>
      <p className="text-sm text-zen-gray mt-1">
        Day {getDayCount()} of your journey
      </p>
    </div>
  );
};

export default GreetingBanner;
