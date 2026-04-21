'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.css';
import { getPortfolioData } from '@/lib/data';

export default function Experience() {
  const { experience } = getPortfolioData();

  if (!experience) return null;

  return (
    <section className={styles.section} id="experience">
      <div className={styles.label}>// EXPERIENCE</div>
      <h2 className={styles.title}>Professional Journey</h2>
      <div className={styles.timeline}>
        {experience.map((exp, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className={styles.item}
          >
            <div className={styles.dot}></div>
            <div className={styles.content}>
              <div className={styles.header}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.period}>{exp.period}</span>
              </div>
              <div className={styles.company}>{exp.company}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
