'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Terminal.module.css';
import { getPortfolioData } from '@/lib/data';

interface TerminalLine {
  text: string;
  color?: 'green' | 'muted' | 'default';
}

interface HistoryEntry {
  command: string;
  output: TerminalLine[];
}

export default function Terminal() {
  const { terminal, projects, skills, experience, personal } = getPortfolioData();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [hostname, setHostname] = useState(terminal.hostname);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initialize with random IP and default commands
  useEffect(() => {
    // Generate random 10.x.x.x IP
    const r1 = Math.floor(Math.random() * 256);
    const r2 = Math.floor(Math.random() * 256);
    const r3 = Math.floor(Math.random() * 256);
    const randomIp = `ip-10-${r1}-${r2}-${r3}.ec2.internal`;
    setHostname(randomIp);

    if (history.length === 0) {
      setHistory(terminal.commands.map(cmd => ({
        command: cmd.input,
        output: cmd.output as TerminalLine[]
      })));
    }
  }, [terminal, history.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: TerminalLine[] = [];

    switch (cmd) {
      case 'help':
        output = [
          { text: 'Available commands:', color: 'green' },
          { text: '  - whoami     : Display my full name and role' },
          { text: '  - ls projects : List all featured projects' },
          { text: '  - ls skills   : List technical skills' },
          { text: '  - experience  : Show professional journey' },
          { text: '  - contact     : Show ways to reach me' },
          { text: '  - kubectl     : Run cluster status check' },
          { text: '  - terraform   : Run infrastructure plan' },
          { text: '  - clear       : Clear terminal screen' },
          { text: '  - help        : Show this message' }
        ];
        break;
      case 'whoami':
        output = [
          { text: personal.fullName, color: 'green' },
          { text: personal.role }
        ];
        break;
      case 'ls projects':
        output = projects.map(p => ({ text: `❯ ${p.title} [${p.tag}]` }));
        break;
      case 'ls skills':
        output = [{ text: skills.map(s => s.name).join(' • '), color: 'muted' }];
        break;
      case 'experience':
        output = experience.map(exp => ({ text: `${exp.role} @ ${exp.company} (${exp.period})` }));
        break;
      case 'contact':
        output = [
          { text: `Email:  ${personal.social.email.replace('mailto:', '')}` },
          { text: `Phone:  ${personal.social.phone}` },
          { text: `GitHub: ${personal.social.github}` }
        ];
        break;
      case 'kubectl get pods':
      case 'kubectl':
        output = [
          { text: 'NAME                READY   STATUS    RESTARTS   AGE', color: 'muted' },
          { text: 'dolphin-hr-api      1/1     Running   0          12d' },
          { text: 'career-vedha-web    1/1     Running   0          4d' }
        ];
        break;
      case 'terraform plan':
      case 'terraform':
        output = [
          { text: 'Plan: 5 to add, 0 to change, 0 to destroy.', color: 'green' },
          { text: 'Saved plan to: tfplan', color: 'muted' }
        ];
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        output = [{ text: `Command not found: ${cmd}. Type 'help' for available commands.`, color: 'muted' }];
    }

    setHistory([...history, { command: input, output }]);
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={styles.terminal}
      onClick={() => inputRef.current?.focus()}
    >
      <div className={styles.bar}>
        <div className={`${styles.dot} ${styles.t1}`}></div>
        <div className={`${styles.dot} ${styles.t2}`}></div>
        <div className={`${styles.dot} ${styles.t3}`}></div>
        <span className={styles.title}>bash — {terminal.user}@{hostname}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.welcome}>
          <div className={styles.green}>Welcome! The terminal is interactive.</div>
          <div className={styles.muted}>Type 'help' to see all available commands.</div>
        </div>

        {history.map((entry, i) => (
          <div key={i} className={styles.commandGroup}>
            <div className={styles.inputLine}>
              <span className={styles.path}>{terminal.user}@{hostname}</span>{' '}
              <span className={styles.symbol}>~</span>{' '}
              <span className={styles.cmd}>$ {entry.command}</span>
            </div>
            <div className={styles.output}>
              {entry.output.map((line, j) => (
                <div 
                  key={j} 
                  className={`${styles.line} ${line.color === 'green' ? styles.green : line.color === 'muted' ? styles.muted : ''}`}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <form onSubmit={handleCommand} className={styles.inputLine}>
          <span className={styles.path}>{terminal.user}@{hostname}</span>{' '}
          <span className={styles.symbol}>~</span>{' '}
          <span className={styles.cmd}>$</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            style={{ width: `${input.length}ch` }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            placeholder="type 'help'..."
          />
          <span className={styles.cursor}>▌</span>
        </form>

        <div className={styles.suggestions}>
          <span className={styles.suggestionLabel}>Try:</span>
          {['help', 'ls projects', 'experience', 'contact'].map(cmd => (
            <button 
              key={cmd} 
              className={styles.suggestionBtn}
              onClick={(e) => {
                e.stopPropagation();
                setInput(cmd);
                inputRef.current?.focus();
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
}
