'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getPortfolioData } from '@/lib/data';
import styles from './skills.module.css';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';

export default function SkillsPage() {
  const { skills } = getPortfolioData();

  // Group skills by category (using 'sub' field)
  const categories = Array.from(new Set(skills.map(s => s.sub)));

  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.hero}>
        <Link href="/" className={styles.backBtn}>
          ← Back to Terminal
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.title}
        >
          Full Stack<span> Inventory</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.subtitle}
        >
          A comprehensive list of tools, platforms, and technologies within my operational scope.
        </motion.p>
      </section>

      <div className={styles.content}>
        {categories.map((cat, idx) => (
          <motion.div 
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className={styles.categorySection}
          >
            <h2 className={styles.categoryTitle}>// {cat.toUpperCase()}</h2>
            <div className={styles.grid}>
              {skills.filter(s => s.sub === cat).map((skill, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.icon}>{skill.icon}</div>
                  <div className={styles.info}>
                    <div className={styles.name}>{skill.name}</div>
                    <div className={styles.tag}>{skill.isFeatured ? 'Core' : 'Library'}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <Contact />
    </main>
  );
}
