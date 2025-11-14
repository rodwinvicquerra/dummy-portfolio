'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatWidget } from './ChatWidget';
import { useAuth } from '@clerk/nextjs';

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();

  // Only show chat button if user is signed in
  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      {/* Pulse animation wrapper */}
      <div className="fixed bottom-32 right-6 z-50">
        <div className="absolute inset-0 bg-gray-400/20 dark:bg-gray-300/20 rounded-2xl animate-pulse" />
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-[90px] w-[90px] rounded-2xl shadow-xl bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-50 text-white dark:text-gray-900 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 p-2 border-2 border-gray-700 dark:border-gray-200"
          aria-label="Open chat support"
          title="Ask about my skills, projects & experience"
        >
          <MessageCircle className="h-9 w-9" />
          <span className="text-[11px] font-bold leading-tight tracking-wide">Support Chat</span>
        </Button>
      </div>

      <ChatWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
