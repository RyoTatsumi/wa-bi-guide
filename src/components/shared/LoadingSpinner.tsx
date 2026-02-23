import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-kintsugi-gold border-t-transparent rounded-full animate-spin" />
      {message && (
        <p className="font-serif text-zen-gray italic mt-4">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
