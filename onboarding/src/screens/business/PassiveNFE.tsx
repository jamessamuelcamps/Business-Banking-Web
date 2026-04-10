import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import styles from './ActiveNFE.module.css';

const EXAMPLES = [
  'Rental income',
  'Dividends',
  'Bank interest',
];

export function PassiveNFE() {
  const navigate = useNavigate();
  return (
    <Page>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>Is your business a passive non-financial entity?</h1>
      </div>

      <div className={styles.card}>
        <p className={styles.cardBody}>
          You're likely a passive NFE if your business mainly earns income from investments.
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
        <Button label="Learn more about passive NFEs" variant="outline" fullWidth onClick={() => {}} />
      </div>

      <Button
        label="Yes, we're a passive NFE"
        variant="secondary"
        fullWidth
        onClick={() => navigate('/business/tax-residency')}
      />
      <button
        type="button"
        className={styles.noButton}
        onClick={() => navigate('/business/financial-institution')}
      >
        No, that doesn't sound like us
      </button>
    </Page>
  );
}
