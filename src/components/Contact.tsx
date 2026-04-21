import styles from './Contact.module.css';
import { getPortfolioData } from '@/lib/data';

export default function Contact() {
  const { personal } = getPortfolioData();

  return (
    <footer className={styles.contact} id="contact">
      <div className={styles.text}>
        <h2>Let's build something reliable.</h2>
        <p>Open to Cloud & DevOps / Platform / SRE roles</p>
        <p className={styles.phone}>📞 {personal.social.phone}</p>
      </div>
      <div className={styles.links}>
        <a className={styles.clink} href={personal.social.github} target="_blank" rel="noopener noreferrer">github</a>
        <a className={styles.clink} href={personal.social.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
        <a className={styles.clink} href={personal.social.email}>mail</a>
      </div>
    </footer>
  );
}
