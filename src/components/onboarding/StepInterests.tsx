import React, { useState } from 'react';
import { LENS_OPTIONS } from '../../constants';
import { useUserStore } from '../../stores';
import { InterestCategory } from '../../types';

interface StepInterestsProps {
  onComplete: () => void;
}

const StepInterests: React.FC<StepInterestsProps> = ({ onComplete }) => {
  const { profile, updateProfile } = useUserStore();
  const [selectedLenses, setSelectedLenses] = useState<InterestCategory[]>(
    profile.primaryLenses
  );

  const toggleLens = (lens: InterestCategory) => {
    setSelectedLenses((prev) => {
      if (prev.includes(lens)) {
        return prev.filter((l) => l !== lens);
      }
      if (prev.length >= 3) return prev;
      return [...prev, lens];
    });
  };

  const handleComplete = () => {
    updateProfile({ primaryLenses: selectedLenses });
    onComplete();
  };

  return (
    <div className="flex flex-col gap-8 p-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-japan-blue font-bold">
          What draws you to Japan?
        </h1>
        <p className="text-sm text-zen-gray mt-1">Pick up to 3 interests</p>
      </div>

      {/* Lens Grid */}
      <div className="grid grid-cols-3 gap-3">
        {LENS_OPTIONS.map((lens) => {
          const isSelected = selectedLenses.includes(lens.value);
          return (
            <button
              key={lens.value}
              onClick={() => toggleLens(lens.value)}
              className={`p-4 border rounded-lg text-center transition-all ${
                isSelected
                  ? 'border-kintsugi-gold bg-amber-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-2xl mb-1">{lens.emoji}</div>
              <div className="text-xs font-serif font-bold text-sumi-black">
                {lens.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Start Exploring Button */}
      <button
        onClick={handleComplete}
        disabled={selectedLenses.length === 0}
        className="w-full py-4 bg-japan-blue text-white font-serif rounded-lg text-base tracking-wider disabled:opacity-40 transition-opacity"
      >
        Start Exploring
      </button>
    </div>
  );
};

export default StepInterests;
