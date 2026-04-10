import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import styles from './SectionComplete.module.css';

export function SectionComplete() {
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2600);
    const t2 = setTimeout(() => navigate('/hub', { replace: true }), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate]);

  return (
    <div className={[styles.screen, leaving ? styles.leaving : ''].filter(Boolean).join(' ')}>
      <div className={styles.circle}>
        <Check size={32} strokeWidth={2.5} color="white" />
      </div>
      <h2 className={styles.title}>Section complete</h2>
    </div>
  );
}
