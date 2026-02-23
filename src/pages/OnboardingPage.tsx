import React, { useState } from 'react';
import StepIdentity from '../components/onboarding/StepIdentity';
import StepInterests from '../components/onboarding/StepInterests';
import { useUserStore } from '../stores';
import { useTranslation } from '../i18n';

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full bg-washi-white overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-serif text-japan-blue font-bold">
          {t('onboarding.welcome')}
        </h1>
        <p className="text-sm text-zen-gray mt-1">
          {t('onboarding.subtitle')}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 justify-center pt-6">
        <div
          className={`w-8 h-1.5 rounded-full ${
            step >= 1 ? 'bg-japan-blue' : 'bg-gray-200'
          }`}
        />
        <div
          className={`w-8 h-1.5 rounded-full ${
            step >= 2 ? 'bg-japan-blue' : 'bg-gray-200'
          }`}
        />
      </div>

      {/* Steps */}
      <div key={step} className="animate-fade-in flex-1">
        {step === 1 ? (
          <StepIdentity onNext={() => setStep(2)} />
        ) : (
          <StepInterests onComplete={completeOnboarding} />
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
