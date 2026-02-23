import React from 'react';
import { useChatStore } from '../stores';
import { useChat } from '../hooks/useChat';
import ChatContainer from '../components/chat/ChatContainer';
import ChatInput from '../components/chat/ChatInput';
import SuggestedQuestions from '../components/chat/SuggestedQuestions';
import EscalationBanner from '../components/chat/EscalationBanner';

const TypingIndicator: React.FC = () => (
  <div className="flex justify-start px-4">
    <div className="mr-12">
      <span className="text-xs text-kintsugi-gold font-bold ml-1 mb-1 block">
        Wa-Bi
      </span>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm p-4 flex gap-1">
        <span className="w-2 h-2 bg-zen-gray/40 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-zen-gray/40 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-zen-gray/40 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>
);

const ChatPage: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const messageCount = useChatStore((s) => s.messages.length);

  const handleSend = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatContainer />

      {isLoading && <TypingIndicator />}

      {messageCount >= 5 && <EscalationBanner />}

      {messageCount < 3 && (
        <SuggestedQuestions onSelect={handleSend} />
      )}

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
};

export default ChatPage;
