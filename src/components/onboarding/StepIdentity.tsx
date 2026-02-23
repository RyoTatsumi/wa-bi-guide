import React, { useState } from 'react';
import { TRAVEL_STYLES, DIETARY_RESTRICTIONS } from '../../constants';
import { useUserStore } from '../../stores';
import PillButton from '../shared/PillButton';

interface StepIdentityProps {
  onNext: () => void;
}

const StepIdentity: React.FC<StepIdentityProps> = ({ onNext }) => {
  const { profile, updateProfile, toggleArrayField } = useUserStore();
  const [name, setName] = useState(profile.name);
  const [travelStyle, setTravelStyle] = useState(profile.travelStyle);
  const [dietary, setDietary] = useState<string[]>(profile.dietaryRestrictions);

  const handleContinue = () => {
    updateProfile({
      name: name.trim(),
      travelStyle,
      dietaryRestrictions: dietary,
    });
    onNext();
  };

  const toggleDietary = (item: string) => {
    setDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  return (
    <div className="flex flex-col gap-8 p-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-japan-blue font-bold">
          Welcome to Wa-Bi
        </h1>
        <p className="text-sm text-zen-gray mt-1">
          Your personal guide to Japan's soul
        </p>
      </div>

      {/* Name input */}
      <div>
        <label className="text-sm text-zen-gray block mb-2">
          What should we call you?
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border-b-2 border-japan-blue bg-transparent font-serif text-xl py-2 outline-none placeholder:text-gray-300"
        />
      </div>

      {/* Travel Style */}
      <div>
        <label className="text-sm text-zen-gray block mb-3">
          How do you like to travel?
        </label>
        <div className="flex flex-col gap-3">
          {TRAVEL_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => setTravelStyle(style.value)}
              className={`p-4 border rounded-lg text-left transition-all ${
                travelStyle === style.value
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

      {/* Dietary Restrictions */}
      <div>
        <label className="text-sm text-zen-gray block mb-3">
          Any dietary needs?
        </label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_RESTRICTIONS.map((item) => (
            <PillButton
              key={item}
              label={item}
              isActive={dietary.includes(item)}
              onClick={() => toggleDietary(item)}
            />
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!name.trim()}
        className="w-full py-4 bg-japan-blue text-white font-serif rounded-lg text-base tracking-wider disabled:opacity-40 transition-opacity"
      >
        Continue
      </button>
    </div>
  );
};

export default StepIdentity;
