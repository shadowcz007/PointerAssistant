import React, { useEffect, useState } from 'react';
import { mockPrompts, demoSequence } from '../data/mockData';
import useCursorStore from '../store/cursorStore';

const DemoController: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { moveTo, setActivePrompt } = useCursorStore();

  // Function to run the next prompt in the sequence
  const runNextPrompt = async () => {
    if (currentIndex >= demoSequence.length) {
      setIsRunning(false);
      setCurrentIndex(0);
      return;
    }

    const { promptId, delay } = demoSequence[currentIndex];
    const prompt = mockPrompts.find(p => p.id === promptId);
    
    if (prompt) {
      await moveTo(prompt.position);
      setActivePrompt(prompt);
      
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, delay);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Start/stop the demo
  const toggleDemo = () => {
    if (isRunning) {
      setIsRunning(false);
      setCurrentIndex(0);
      setActivePrompt(null);
    } else {
      setIsRunning(true);
    }
  };

  // Run next prompt whenever currentIndex changes or demo starts
  useEffect(() => {
    if (isRunning) {
      runNextPrompt();
    }
  }, [currentIndex, isRunning]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <button
        onClick={toggleDemo}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
      >
        {isRunning ? 'Stop Demo' : 'Start Demo'}
      </button>
    </div>
  );
};

export default DemoController;