import React, { useState } from 'react';
import { User, Utensils, Sparkles, Footprints, Heart, Trash2, Globe, Compass, BookOpen } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { useLocationStore } from '../stores/locationStore';
import { useChatStore } from '../stores/chatStore';
import { useAppStore } from '../stores/appStore';
import { useJournalStore } from '../stores/journalStore';
import { useTranslation } from '../i18n';
import PillButton from '../components/shared/PillButton';
import SectionHeader from '../components/shared/SectionHeader';
import LanguageToggle from '../components/shared/LanguageToggle';
import ProfileCompleteness from '../components/shared/ProfileCompleteness';
import {
  LENS_OPTIONS,
  DIETARY_RESTRICTIONS,
  FOOD_LIKES,
  MOBILITY_OPTIONS,
  SHOPPING_CATS,
  MATERIALS,
  TRAVEL_STYLES,
  SUB_INTERESTS,
} from '../constants';

const PACE_OPTIONS = ['Slow', 'Moderate', 'Active'];
const CROWD_OPTIONS = ['Avoid', 'Tolerate', 'Embrace'];

const ProfilePage: React.FC = () => {
  const { profile, updateProfile, toggleArrayField, getDayCount, resetProfile } =
    useUserStore();
  const visitedCount = useLocationStore((s) => s.visitedIds.length);
  const clearHistory = useChatStore((s) => s.clearHistory);
  const setSubView = useAppStore((s) => s.setSubView);
  const journalEntryCount = useJournalStore((s) => s.entries.length);
  const { t } = useTranslation();

  const [customInterest, setCustomInterest] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfile({ name: e.target.value });
  };

  const handleReset = () => {
    if (window.confirm(t('profile.resetConfirm'))) {
      resetProfile();
      clearHistory();
    }
  };

  const handleAddCustomInterest = () => {
    const trimmed = customInterest.trim();
    if (!trimmed) return;
    const current = profile.subInterests || [];
    if (!current.includes(trimmed)) {
      updateProfile({ subInterests: [...current, trimmed] });
    }
    setCustomInterest('');
  };

  const handleRemoveCustomInterest = (interest: string) => {
    const current = profile.subInterests || [];
    updateProfile({ subInterests: current.filter((i) => i !== interest) });
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full pb-24 animate-fade-in">
      {/* Profile Completeness */}
      <ProfileCompleteness />

      {/* Profile Header */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<User size={16} />} title={t('profile.title')} />
        <input
          type="text"
          value={profile.name}
          onChange={handleNameChange}
          placeholder={t('onboarding.namePlaceholder')}
          className="w-full text-lg font-bold text-sumi-black bg-transparent border-b border-gray-200 focus:border-japan-blue focus:outline-none pb-1 transition-colors"
        />
        <div className="flex gap-4 text-xs text-zen-gray">
          <span>{t('profile.traveler', { style: profile.travelStyle })}</span>
          <span>{t('profile.day', { count: getDayCount() })}</span>
          <span>{t('profile.spotsVisited', { count: visitedCount })}</span>
          <span>{t('profile.journalEntries', { count: journalEntryCount })}</span>
        </div>
      </div>

      {/* Language */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<Globe size={16} />} title={t('profile.language')} />
        <LanguageToggle />
      </div>

      {/* Travel Style */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<Compass size={16} />} title={t('profile.travelStyle')} />
        <div className="flex flex-col gap-3">
          {TRAVEL_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => updateProfile({ travelStyle: style.value })}
              className={`p-4 border rounded-lg text-left transition-all ${
                profile.travelStyle === style.value
                  ? 'border-japan-blue bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="font-serif font-bold text-sm text-sumi-black">
                {style.label}
              </div>
              <div className="text-xs text-zen-gray mt-1">
                {style.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<Sparkles size={16} />} title={t('profile.interests')} />
        <label className="text-xs uppercase tracking-wider text-zen-gray font-bold block">
          {t('profile.primaryLenses')}
        </label>
        <div className="flex flex-wrap gap-2">
          {LENS_OPTIONS.map((opt) => (
            <PillButton
              key={opt.value}
              label={`${opt.emoji} ${opt.label}`}
              isActive={profile.primaryLenses.includes(opt.value)}
              onClick={() => toggleArrayField('primaryLenses', opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Sub-Interests / Deep Interests */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<BookOpen size={16} />} title={t('profile.subInterests')} />
        <p className="text-xs text-zen-gray">{t('profile.subInterestsHint')}</p>
        <div className="flex flex-wrap gap-2">
          {SUB_INTERESTS.map((item) => (
            <PillButton
              key={item}
              label={item}
              isActive={(profile.subInterests || []).includes(item)}
              onClick={() => toggleArrayField('subInterests', item)}
            />
          ))}
        </div>

        {/* Custom free-text entries */}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomInterest()}
            placeholder={t('profile.subInterestsHint')}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-japan-blue transition-colors"
          />
          <button
            onClick={handleAddCustomInterest}
            disabled={!customInterest.trim()}
            className="px-4 py-2 bg-japan-blue text-white text-sm font-bold rounded-lg disabled:opacity-40 transition-opacity"
          >
            {t('profile.subInterestsAdd')}
          </button>
        </div>

        {/* Display custom entries as removable pills */}
        {(profile.subInterests || []).filter((i) => !SUB_INTERESTS.includes(i)).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {(profile.subInterests || [])
              .filter((i) => !SUB_INTERESTS.includes(i))
              .map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-japan-blue border border-japan-blue"
                >
                  {item}
                  <button
                    onClick={() => handleRemoveCustomInterest(item)}
                    className="ml-1 text-japan-blue hover:text-red-500 transition-colors"
                  >
                    X
                  </button>
                </span>
              ))}
          </div>
        )}
      </div>

      {/* Food Preferences */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<Utensils size={16} />} title={t('profile.foodPreferences')} />

        <label className="text-xs uppercase tracking-wider text-zen-gray font-bold block">
          {t('profile.dietaryRestrictions')}
        </label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_RESTRICTIONS.map((item) => (
            <PillButton
              key={item}
              label={item}
              isActive={profile.dietaryRestrictions.includes(item)}
              onClick={() => toggleArrayField('dietaryRestrictions', item)}
            />
          ))}
        </div>

        <label className="text-xs uppercase tracking-wider text-zen-gray font-bold block mt-3">
          {t('profile.foodLikes')}
        </label>
        <div className="flex flex-wrap gap-2">
          {FOOD_LIKES.map((item) => (
            <PillButton
              key={item}
              label={item}
              isActive={(profile.foodLikes || []).includes(item)}
              onClick={() => toggleArrayField('foodLikes', item)}
            />
          ))}
        </div>
      </div>

      {/* Mobility & Pace */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<Footprints size={16} />} title={t('profile.mobilityPace')} />

        <label className="text-xs uppercase tracking-wider text-zen-gray font-bold block">
          {t('profile.mobility')}
        </label>
        <div className="flex flex-wrap gap-2">
          {MOBILITY_OPTIONS.map((item) => (
            <PillButton
              key={item}
              label={item}
              isActive={(profile.mobility || []).includes(item)}
              onClick={() => toggleArrayField('mobility', item)}
            />
          ))}
        </div>

        <label className="text-xs uppercase tracking-wider text-zen-gray font-bold block mt-3">
          {t('profile.dailyPace')}
        </label>
        <div className="flex flex-wrap gap-2">
          {PACE_OPTIONS.map((pace) => (
            <PillButton
              key={pace}
              label={pace}
              isActive={profile.dailyPace === pace}
              onClick={() => updateProfile({ dailyPace: pace })}
            />
          ))}
        </div>

        <label className="text-xs uppercase tracking-wider text-zen-gray font-bold block mt-3">
          {t('profile.crowdTolerance')}
        </label>
        <div className="flex flex-wrap gap-2">
          {CROWD_OPTIONS.map((opt) => (
            <PillButton
              key={opt}
              label={opt}
              isActive={profile.crowdTolerance === opt}
              onClick={() => updateProfile({ crowdTolerance: opt })}
            />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<Heart size={16} />} title={t('profile.quickLinks')} />
        <button
          onClick={() => setSubView('wishlist')}
          className="w-full py-3 bg-gray-50 rounded-lg text-sm font-bold text-japan-blue hover:bg-gray-100 transition-colors"
        >
          {t('profile.myWishlist')}
        </button>
        <button
          onClick={() => setSubView('journal')}
          className="w-full py-3 bg-gray-50 rounded-lg text-sm font-bold text-japan-blue hover:bg-gray-100 transition-colors"
        >
          {t('profile.myJournal')}
        </button>
        <button
          onClick={clearHistory}
          className="w-full py-3 bg-gray-50 rounded-lg text-sm font-bold text-zen-gray hover:bg-gray-100 transition-colors"
        >
          {t('profile.clearChatHistory')}
        </button>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="w-full py-3 bg-red-50 text-red-500 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
      >
        <Trash2 size={16} />
        {t('profile.resetProfile')}
      </button>
    </div>
  );
};

export default ProfilePage;
