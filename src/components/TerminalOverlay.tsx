import styles from './TerminalOverlay.module.css';

export default function TerminalOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.scanlines}></div>
      <div className={styles.noise}></div>
    </div>
  );
}
