import React, { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import PromptBubble from './components/PromptBubble';
import DemoController from './components/DemoController';
import { mockPrompts } from './data/mockData';
import useCursorStore from './store/cursorStore';
import './App.css';
import { getCurrentWindow } from '@tauri-apps/api/window';

function App() {
  const { setActivePrompt } = useCursorStore();

  // Set up keyboard shortcuts for testing
  useEffect(() => {
    const init = async () => {
      // (await getCurrentWindow()).setIgnoreCursorEvents(true);
    }
    init();
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC key to clear prompt
      if (e.key === 'Escape') {
        setActivePrompt(null);
      }

      // Number keys 1-6 to show specific prompts
      if (e.key >= '1' && e.key <= '6') {
        const promptIndex = parseInt(e.key) - 1;
        if (mockPrompts[promptIndex]) {
          setActivePrompt(mockPrompts[promptIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent-custom">
      {/* In a real Tauri app, this would be transparent and overlay the entire screen */}
      <div className="fixed inset-0  backdrop-blur-sm">
        <div className="flex items-center justify-center h-full">
          <div className="max-w-lg w-full p-8 bg-white/70 backdrop-blur-md rounded-xl shadow-xl">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4" data-tauri-drag-region>
              Cursor Prompt Demo
            </h1>
            <p className="text-gray-600 mb-6">
              This demo shows a custom cursor with text prompts. The cursor will automatically move
              to predefined locations and display relevant information.
            </p>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <h2 className="text-lg font-medium text-gray-700">Keyboard Shortcuts:</h2>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Press <kbd className="px-2 py-1 bg-gray-100 rounded">ESC</kbd> to clear the current prompt</li>
                  <li>• Press <kbd className="px-2 py-1 bg-gray-100 rounded">1</kbd> through <kbd className="px-2 py-1 bg-gray-100 rounded">6</kbd> to show specific prompts</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <h2 className="text-lg font-medium text-gray-700">Instructions:</h2>
                <p className="mt-2 text-gray-600">
                  Click the "Start Demo" button to begin an automated demonstration, or use the keyboard shortcuts to
                  manually trigger prompts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom cursor and prompt components */}
      <CustomCursor />
      <PromptBubble />
      <DemoController />
    </div>
  );
}

export default App;