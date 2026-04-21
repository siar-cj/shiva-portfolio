'use client';

import { motion } from 'framer-motion';
import styles from './TechStack.module.css';
import { getPortfolioData } from '@/lib/data';
import Link from 'next/link';

export default function TechStack() {
  const { skills } = getPortfolioData();
  const featuredSkills = skills.filter(s => s.isFeatured);

  return (
    <section className={styles.section} id="stack">
      <div className={styles.label}>// TECH STACK</div>
      <h2 className={styles.title}>Tools & Technologies</h2>
      <div className={styles.grid}>
        {featuredSkills.map((skill, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={styles.card}
          >
            <div className={styles.icon}>{skill.icon}</div>
            <div className={styles.name}>{skill.name}</div>
            <div className={styles.sub}>{skill.sub}</div>
          </motion.div>
        ))}
      </div>
      <div className={styles.footer}>
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
        >
          <Link href="/skills" className={styles.viewMore}>
            View All Skills ❯
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
