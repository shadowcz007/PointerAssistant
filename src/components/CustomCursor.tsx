import React from 'react';
import { motion } from 'framer-motion';
import useCursorStore from '../store/cursorStore';

interface CustomCursorProps {
  size?: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  size = 24
}) => {
  const { position, visible, isMoving } = useCursorStore();

  if (!visible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: 0,
        top: 0,
        translateX: position.x - size / 2,
        translateY: position.y - size / 2,
      }}
      animate={{
        x: position.x - size / 2,
        y: position.y - size / 2,
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        mass: 0.5
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full bg-blue-500/20"
        style={{
          width: size + 8,
          height: size + 8,
          left: -4,
          top: -4,
        }}
        animate={{
          scale: isMoving ? 1.2 : 1,
        }}
        transition={{
          duration: 0.2
        }}
      />
      
      {/* Inner cursor */}
      <motion.div
        className="absolute rounded-full bg-blue-500 shadow-lg"
        style={{
          width: size,
          height: size,
        }}
        animate={{
          scale: isMoving ? 0.8 : 1,
        }}
      />
    </motion.div>
  );
}

export default CustomCursor