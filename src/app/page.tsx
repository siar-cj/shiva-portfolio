import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Terminal from '@/components/Terminal';
import Metrics from '@/components/Metrics';
import TechStack from '@/components/TechStack';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <Navbar />
      <Hero />
      <Terminal />
      <Metrics />
      <TechStack />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
