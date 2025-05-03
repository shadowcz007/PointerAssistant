import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCursorStore from '../store/cursorStore';

interface PromptBubbleProps {
  offset?: { x: number; y: number };
}

const PromptBubble: React.FC<PromptBubbleProps> = ({
  offset = { x: 20, y: 0 }
}) => {
  const { position, activePrompt } = useCursorStore();

  useEffect(() => {
    if (activePrompt && activePrompt.duration) {
      const timer = setTimeout(() => {
        useCursorStore.getState().setActivePrompt(null);
      }, activePrompt.duration);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activePrompt]);

  return (
    <AnimatePresence>
      {activePrompt && (
        <motion.div
          className="fixed pointer-events-none z-50 max-w-xs"
          style={{
            left: position.x + offset.x,
            top: position.y + offset.y,
          }}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300,
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-900">
              {activePrompt.text}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PromptBubble