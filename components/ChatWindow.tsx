import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scrolla sempre in fondo quando cambiano i messaggi
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  // Scrolla in fondo anche quando la viewport cambia (es: tastiera mobile)
  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        // Timeout per aspettare il ridimensionamento effettivo
        setTimeout(() => {
          scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
        }, 100);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
};
