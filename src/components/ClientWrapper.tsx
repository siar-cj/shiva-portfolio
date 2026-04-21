'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import TerminalOverlay from "@/components/TerminalOverlay";
import Loader from "@/components/Loader";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem('v');
    if (visited) setIsLoading(false);
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem('v', '1');
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loader key="loader" onFinish={handleFinish} />
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CustomCursor />
          <TerminalOverlay />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
