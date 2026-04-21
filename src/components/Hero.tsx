'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { getPortfolioData } from '@/lib/data';

export default function Hero() {
  const { personal } = getPortfolioData();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      animate="show"
      className={styles.hero} 
      id="about"
    >
      <motion.div variants={item} className={styles.badge}>
        <div className={styles.dot}></div>
        <span className={styles.badgeText}>{personal.status}</span>
      </motion.div>
      <motion.h1 variants={item} className={styles.fullName}>{personal.fullName}</motion.h1>
      <motion.h2 variants={item} className={styles.roleTitle}>
        {personal.role.split('&').map((part, index) => (
          <span key={index}>
            {index > 0 && <span className={styles.amp}>&</span>}
            {part.trim()}
          </span>
        ))}
      </motion.h2>
      <motion.p variants={item} className={styles.tagline}>{personal.tagline}</motion.p>
      <motion.div variants={item} className={styles.ctaRow}>
        <button className={styles.btnPrimary}>View Projects</button>
        <button className={styles.btnSecondary}>Download CV</button>
      </motion.div>
    </motion.section>
  );
}
