import React from 'react';
import { useTranslation } from '../../i18n';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSelect }) => {
  const { t } = useTranslation();

  const questions = [
    t('chat.q1'),
    t('chat.q2'),
    t('chat.q3'),
    t('chat.q4'),
  ];

  return (
    <div className="flex flex-wrap gap-2 px-4 py-3">
      {questions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-full text-xs text-japan-blue hover:bg-blue-50 transition-colors cursor-pointer"
        >
          {q}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
