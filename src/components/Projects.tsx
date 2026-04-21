'use client';

import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import { getPortfolioData } from '@/lib/data';

export default function Projects() {
  const { projects } = getPortfolioData();

  return (
    <section className={styles.section} id="projects">
      <div className={styles.label}>// PROJECTS</div>
      <h2 className={styles.title}>Featured Work</h2>
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`${styles.card} ${project.isFeatured ? styles.featured : ''}`}
          >
            {project.isFeatured && <div className={styles.featuredBadge}>featured</div>}
            <div className={styles.tag}>{project.tag}</div>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.stack}>
              {project.stack.map((item, j) => (
                <span key={j} className={styles.chip}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
