import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import styles from './ActiveNFE.module.css';

const EXAMPLES = [
  'Selling goods',
  'Providing services',
  'Running business operations',
];

export function ActiveNFE() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const handleContinue = () => {
    setLeaving(true);
    setTimeout(() => navigate('/section-complete'), 350);
  };

  return (
    <Page leaving={leaving}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>Is your business an active non-financial entity?</h1>
      </div>

      <div className={styles.card}>
        <p className={styles.cardBody}>
          You're likely an active NFE if your business mainly earns income from day-to-day activities, not investments.
        </p>
        <p className={styles.cardBody}>For example:</p>
        <ul className={styles.checklist}>
          {EXAMPLES.map(example => (
            <li key={example} className={styles.checkItem}>
              <Check size={20} strokeWidth={2.5} className={styles.checkIcon} />
              <span>{example}</span>
            </li>
          ))}
        </ul>
        <Button label="Learn more about active NFEs" variant="outline" fullWidth onClick={() => {}} />
      </div>

      <Button
        label="Yes, we're an active NFE"
        variant="secondary"
        fullWidth
        onClick={() => navigate('/business/tax-residency')}
      />
      <button
        type="button"
        className={styles.noButton}
        onClick={() => navigate('/business/passive-nfe')}
      >
        No, that doesn't sound like us
      </button>
    </Page>
  );
}
