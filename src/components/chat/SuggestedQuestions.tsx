import React from 'react';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const QUESTIONS = [
  'Where should I eat nearby?',
  "What's the etiquette here?",
  'Recommend something off the beaten path',
  'Help me with transportation',
];

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3">
      {QUESTIONS.map((q) => (
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
