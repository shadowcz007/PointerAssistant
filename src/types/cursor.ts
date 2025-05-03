export interface PromptPosition {
  x: number;
  y: number;
}

export interface PromptData {
  id: string;
  position: PromptPosition;
  text: string;
  duration?: number; // in milliseconds, optional
}

export interface AnimationConfig {
  duration: number; // in milliseconds
  easing: string; // e.g., "ease-in-out"
}

export interface CursorState {
  position: PromptPosition;
  visible: boolean;
  activePrompt: PromptData | null;
  isMoving: boolean;
}