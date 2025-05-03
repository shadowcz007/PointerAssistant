import { create } from 'zustand';
import { CursorState, PromptData, PromptPosition } from '../types/cursor';

interface CursorStore extends CursorState {
  setPosition: (position: PromptPosition) => void;
  setVisibility: (visible: boolean) => void;
  setActivePrompt: (prompt: PromptData | null) => void;
  setIsMoving: (isMoving: boolean) => void;
  moveTo: (position: PromptPosition, duration?: number) => Promise<void>;
}

const useCursorStore = create<CursorStore>((set, get) => ({
  position: { x: 0, y: 0 },
  visible: true,
  activePrompt: null,
  isMoving: false,

  setPosition: (position) => set({ position }),
  
  setVisibility: (visible) => set({ visible }),
  
  setActivePrompt: (prompt) => set({ activePrompt: prompt }),
  
  setIsMoving: (isMoving) => set({ isMoving }),
  
  moveTo: async (position, duration = 500) => {
    const { setIsMoving, setPosition } = get();
    
    setIsMoving(true);
    
    // We're using a promise to allow awaiting the movement
    return new Promise((resolve) => {
      // In a real app, we'd use the Tauri API to move the actual cursor
      // For this mock version, we're just updating our store
      
      // Start animation
      const startTime = Date.now();
      const startPosition = { ...get().position };
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Simple easing function (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const newX = startPosition.x + (position.x - startPosition.x) * easeProgress;
        const newY = startPosition.y + (position.y - startPosition.y) * easeProgress;
        
        setPosition({ x: newX, y: newY });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsMoving(false);
          resolve();
        }
      };
      
      animate();
    });
  }
}));

export default useCursorStore;