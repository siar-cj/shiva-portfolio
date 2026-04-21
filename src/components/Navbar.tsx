'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import { getPortfolioData } from '@/lib/data';

export default function Navbar() {
  const { personal } = getPortfolioData();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        {personal.name}<span>.{personal.domain}</span>
      </div>

      {/* Desktop Links */}
      <div className={styles.desktopLinks}>
        <a href="#about">~/about</a>
        <a href="#experience">~/experience</a>
        <a href="#projects">~/projects</a>
        <a href="#stack">~/stack</a>
        <a href="#contact">~/contact</a>
      </div>

      {/* Mobile Toggle */}
      <button 
        className={`${styles.mobileToggle} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={styles.mobileMenu}
          >
            <a href="#about" onClick={() => setIsOpen(false)}>~/about</a>
            <a href="#experience" onClick={() => setIsOpen(false)}>~/experience</a>
            <a href="#projects" onClick={() => setIsOpen(false)}>~/projects</a>
            <a href="#stack" onClick={() => setIsOpen(false)}>~/stack</a>
            <a href="#contact" onClick={() => setIsOpen(false)}>~/contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
