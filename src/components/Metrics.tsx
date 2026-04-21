import styles from './Metrics.module.css';
import { getPortfolioData } from '@/lib/data';

export default function Metrics() {
  const { metrics } = getPortfolioData();

  return (
    <div className={styles.metricsRow}>
      {metrics.map((metric, i) => (
        <div key={i} className={styles.metric}>
          <div className={styles.val}>{metric.value}</div>
          <div className={styles.label}>{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
