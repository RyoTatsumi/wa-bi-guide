import React from 'react';
import { ChatMessage } from '../../types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div className={isUser ? 'ml-12' : 'mr-12'}>
        {!isUser && (
          <span className="text-xs text-kintsugi-gold font-bold ml-1 mb-1 block">
            Wa-Bi
          </span>
        )}
        <div
          className={
            isUser
              ? 'bg-japan-blue text-white rounded-2xl rounded-br-sm p-4'
              : 'bg-white border border-gray-100 text-sumi-black rounded-2xl rounded-bl-sm p-4'
          }
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <p
            className={`text-[11px] mt-1 ${
              isUser ? 'text-white/60' : 'text-zen-gray/60'
            }`}
          >
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
