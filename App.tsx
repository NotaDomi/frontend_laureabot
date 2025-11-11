
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Message, Role } from './types';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { GraduationCapIcon } from './components/icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: Role.MODEL,
      text: 'Ciao! Grazie mille per essere qui! ✨\nLasciami un saluto o dimmi chi sei, così posso ringraziarti di persona!',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: Message = { id: Date.now().toString(), role: Role.USER, text };
    const updatedChatHistory = [...messages, userMessage];

    const typingMessageId = (Date.now() + 1).toString();
    const typingMessage: Message = { id: typingMessageId, role: Role.MODEL, text: '', isTyping: true };

    setMessages([...updatedChatHistory, typingMessage]);
    setIsLoading(true);

    const apiPayload = {
      messages: updatedChatHistory.map(msg => ({
        role: msg.role === Role.USER ? 'user' : 'assistant',
        content: msg.text,
      })),
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${apiUrl}/chat`, apiPayload);

      const data = response.data;
      
      if (!data.message) {
        throw new Error("Invalid response format from server.");
      }
      
      const modelMessage: Message = { id: (Date.now() + 2).toString(), role: Role.MODEL, text: data.message };
      setMessages([...updatedChatHistory, modelMessage]);

    } catch (error) {
      console.error('Failed to fetch chat response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: Role.MODEL,
        text: 'Oops! Qualcosa è andato storto. Riprova tra un momento.',
      };
       setMessages([...updatedChatHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col max-w-2xl mx-auto shadow-2xl">
      <header className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-center space-x-3 shadow-lg">
        <GraduationCapIcon className="w-8 h-8 text-blue-400" />
        <h1 className="text-xl font-bold text-gray-100 tracking-wide">Un Grazie Speciale</h1>
      </header>
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
