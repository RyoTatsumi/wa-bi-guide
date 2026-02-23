import React from 'react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  colorClass?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  colorClass,
}) => {
  return (
    <div className={`flex items-center gap-2 ${colorClass ?? ''}`}>
      {icon}
      <span className="text-xs uppercase tracking-widest font-bold">
        {title}
      </span>
    </div>
  );
};

export default SectionHeader;
