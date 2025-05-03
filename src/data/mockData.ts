import { PromptData } from '../types/cursor';

// Mock data for demonstration purposes
export const mockPrompts: PromptData[] = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    text: 'Click here to open the menu',
    duration: 3000
  },
  {
    id: '2',
    position: { x: 300, y: 200 },
    text: 'This button saves your work',
    duration: 3000
  },
  {
    id: '3',
    position: { x: 500, y: 300 },
    text: 'Drag this element to rearrange',
    duration: 3000
  },
  {
    id: '4',
    position: { x: 200, y: 400 },
    text: 'Right-click for more options',
    duration: 3000
  },
  {
    id: '5',
    position: { x: 400, y: 150 },
    text: 'Type here to search',
    duration: 3000
  },
  {
    id: '6',
    position: { x: 600, y: 250 },
    text: 'Hover to see preview',
    duration: 3000
  }
];

// Demo sequence for automatic cursor movement
export const demoSequence = [
  { promptId: '1', delay: 0 },
  { promptId: '2', delay: 4000 },
  { promptId: '3', delay: 4000 },
  { promptId: '4', delay: 4000 },
  { promptId: '5', delay: 4000 },
  { promptId: '6', delay: 4000 }
];