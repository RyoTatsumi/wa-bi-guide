import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../../stores';
import { useTranslation } from '../../i18n';
import MessageBubble from './MessageBubble';

const ChatContainer: React.FC = () => {
  const { t } = useTranslation();
  const messages = useChatStore((s) => s.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <span className="text-4xl mb-4">&#x1F9ED;</span>
          <h3 className="text-base font-serif font-bold text-sumi-black mb-1">{t('chat.emptyTitle')}</h3>
          <p className="text-sm text-zen-gray">
            {t('chat.emptyDesc')}
          </p>
        </div>
      ) : (
        messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatContainer;
