'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

const messages = [
  "[ OK ] Initializing Secure Shell...",
  "[ OK ] Mounting infrastructure/projects...",
  "[ OK ] Connecting to AWS API (us-east-1)...",
  "[ OK ] Loading Technical Inventory...",
  "[ OK ] Decrypting Professional Journey...",
  "[ OK ] Booting Portfolio UI v2.0.4...",
];

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < messages.length) {
      const timer = setTimeout(() => {
        setIndex(prev => prev + 1);
      }, 400); // Speed of the boot logs
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onFinish();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [index, onFinish]);

  return (
    <motion.div 
      className={styles.overlay}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.terminal}>
        {messages.slice(0, index).map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.line}
          >
            {msg}
          </motion.div>
        ))}
        {index < messages.length && (
          <div className={styles.cursor}>▌</div>
        )}
      </div>
    </motion.div>
  );
}
