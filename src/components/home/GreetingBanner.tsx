import React from 'react';
import { useUserStore } from '../../stores';
import { useTranslation } from '../../i18n';

const GreetingBanner: React.FC = () => {
  const { t } = useTranslation();
  const name = useUserStore((s) => s.profile.name);
  const getDayCount = useUserStore((s) => s.getDayCount);

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return t('home.goodMorning');
    if (hour < 18) return t('home.goodAfternoon');
    return t('home.goodEvening');
  };

  const dayCount = getDayCount();

  return (
    <div>
      <h1 className="text-2xl font-serif text-sumi-black">
        {getGreeting()}, {name}
      </h1>
      <p className="text-sm text-zen-gray mt-1">
        {t('home.dayCount', { count: dayCount })}
      </p>
    </div>
  );
};

export default GreetingBanner;
