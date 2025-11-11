
import React from 'react';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1 p-2">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
);

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white self-end rounded-br-none'
    : 'bg-gray-700 text-gray-200 self-start rounded-bl-none';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-md transition-all duration-300 ${bubbleClasses}`}
      >
        {message.isTyping ? (
          <TypingIndicator />
        ) : (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}
      </div>
    </div>
  );
};
