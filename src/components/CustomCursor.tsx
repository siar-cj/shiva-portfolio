'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Layer 1: Core Dot (Sharp)
  const coreX = useSpring(mouseX, { damping: 50, stiffness: 1000 });
  const coreY = useSpring(mouseY, { damping: 50, stiffness: 1000 });

  // Layer 2: Outer Ring (Delayed/Trailing)
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div className={styles.cursorContainer}>
      {/* Trailing Ring */}
      <motion.div
        className={styles.ring}
        style={{
          left: ringX,
          top: ringY,
        }}
        animate={{
          scale: active ? 1.5 : 1,
          borderWidth: active ? '1px' : '2px',
          opacity: active ? 0.3 : 1,
        }}
      />
      
      {/* Core Glow Dot */}
      <motion.div
        className={styles.dot}
        style={{
          left: coreX,
          top: coreY,
        }}
        animate={{
          scale: active ? 4 : 1,
        }}
      />
    </div>
  );
}
