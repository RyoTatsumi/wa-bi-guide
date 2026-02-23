import React from 'react';
import { useUserStore } from '../../stores';
import { useTranslation } from '../../i18n';

const ProfileCompleteness: React.FC = () => {
  const { t } = useTranslation();
  const profile = useUserStore((s) => s.profile);

  const fields = [
    { filled: !!profile.name, weight: 15 },
    { filled: profile.primaryLenses.length > 0, weight: 15 },
    { filled: profile.travelStyle !== 'Balanced', weight: 10 },
    { filled: profile.dietaryRestrictions.length > 0, weight: 5 },
    { filled: (profile.foodLikes?.length || 0) > 0, weight: 10 },
    { filled: (profile.subInterests?.length || 0) > 0, weight: 15 },
    { filled: (profile.shoppingCategories?.length || 0) > 0, weight: 10 },
    { filled: (profile.mobility?.length || 0) > 0, weight: 5 },
    { filled: !!profile.dailyPace, weight: 5 },
    { filled: !!profile.learningDepth, weight: 10 },
  ];

  const total = fields.reduce((sum, f) => sum + f.weight, 0);
  const filled = fields.reduce((sum, f) => sum + (f.filled ? f.weight : 0), 0);
  const percent = Math.round((filled / total) * 100);

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-widest font-bold text-zen-gray">
          {t('profile.completeness')}
        </span>
        <span className="text-sm font-bold text-japan-blue">{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-kintsugi-gold rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProfileCompleteness;
