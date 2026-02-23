import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../../stores';
import MessageBubble from './MessageBubble';

const ChatContainer: React.FC = () => {
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
          <p className="text-sm text-zen-gray">
            Ask me anything about your journey in Japan
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
