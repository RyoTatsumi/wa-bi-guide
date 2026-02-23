import React from 'react';
import { User, Utensils, Sparkles, Footprints, Heart, Trash2 } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { useLocationStore } from '../stores/locationStore';
import { useChatStore } from '../stores/chatStore';
import { useAppStore } from '../stores/appStore';
import PillButton from '../components/shared/PillButton';
import SectionHeader from '../components/shared/SectionHeader';
import {
  LENS_OPTIONS,
  DIETARY_RESTRICTIONS,
  FOOD_LIKES,
  MOBILITY_OPTIONS,
  SHOPPING_CATS,
  MATERIALS,
} from '../constants';

const PACE_OPTIONS = ['Slow', 'Moderate', 'Active'];
const CROWD_OPTIONS = ['Avoid', 'Tolerate', 'Embrace'];

const ProfilePage: React.FC = () => {
  const { profile, updateProfile, toggleArrayField, getDayCount, resetProfile } =
    useUserStore();
  const visitedCount = useLocationStore((s) => s.visitedIds.length);
  const clearHistory = useChatStore((s) => s.clearHistory);
  const setSubView = useAppStore((s) => s.setSubView);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfile({ name: e.target.value });
  };

  const handleReset = () => {
    if (window.confirm('Reset your entire profile? This cannot be undone.')) {
      resetProfile();
      clearHistory();
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full pb-24 animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<User size={16} />} title="Profile" />
        <input
          type="text"
          value={profile.name}
          onChange={handleNameChange}
          placeholder="Your name"
          className="w-full text-lg font-bold text-sumi-black bg-transparent border-b border-gray-200 focus:border-japan-blue focus:outline-none pb-1 transition-colors"
        />
        <div className="flex gap-4 text-xs text-zen-gray">
          <span>{profile.travelStyle} traveler</span>
          <span>Day {getDayCount()}</span>
          <span>{visitedCount} spots visited</span>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<Sparkles size={16} />} title="Interests" />
        <label className="text-xs uppercase tracking-wider text-zen-gray font-bold block">
          Primary Lenses
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

      {/* Food Preferences */}
      <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
        <SectionHeader icon={<Utensils size={16} />} title="Food Preferences" />

        <label className="text-xs uppercase tracking-wider text-zen-gray font-bold block">
          Dietary Restrictions
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
          Food Likes
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
        <SectionHeader icon={<Footprints size={16} />} title="Mobility & Pace" />

        <label className="text-xs uppercase tracking-wider text-zen-gray font-bold block">
          Mobility
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
          Daily Pace
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
          Crowd Tolerance
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
        <SectionHeader icon={<Heart size={16} />} title="Quick Links" />
        <button
          onClick={() => setSubView('wishlist')}
          className="w-full py-3 bg-gray-50 rounded-lg text-sm font-bold text-japan-blue hover:bg-gray-100 transition-colors"
        >
          My Wishlist
        </button>
        <button
          onClick={clearHistory}
          className="w-full py-3 bg-gray-50 rounded-lg text-sm font-bold text-zen-gray hover:bg-gray-100 transition-colors"
        >
          Clear Chat History
        </button>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="w-full py-3 bg-red-50 text-red-500 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
      >
        <Trash2 size={16} />
        Reset Profile
      </button>
    </div>
  );
};

export default ProfilePage;
