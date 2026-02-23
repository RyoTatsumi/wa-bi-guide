import React from 'react';

interface PillButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  colorClass?: string;
}

const PillButton: React.FC<PillButtonProps> = ({
  label,
  isActive,
  onClick,
  colorClass = 'bg-japan-blue',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 border rounded-full transition-all text-xs
        ${
          isActive
            ? `${colorClass} text-white border-transparent`
            : 'bg-white text-zen-gray border-gray-300'
        }
      `}
    >
      {label}
    </button>
  );
};

export default PillButton;
