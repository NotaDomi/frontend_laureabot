
import React, { useState } from 'react';
import { SendIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-gray-800 p-4 border-t border-gray-700">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Presentati o lascia un saluto..."
          disabled={isLoading}
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Invia messaggio"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};
