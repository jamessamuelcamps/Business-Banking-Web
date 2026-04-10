import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import styles from './ActiveNFE.module.css';
import sheetStyles from './FinancialInstitution.module.css';

const EXAMPLES = [
  'Banking or payment services',
  'Managing investments or funds',
  'Acting as a broker or custodian',
];

export function FinancialInstitution() {
  const navigate = useNavigate();
  const [showSheet, setShowSheet] = useState(false);

  const handleNext = () => {
    setShowSheet(false);
    navigate('/business/tax-residency');
  };

  return (
    <>
      <Page>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>Is your business a financial institution?</h1>
        </div>

        <div className={styles.card}>
          <p className={styles.cardBody}>
            You're likely a financial institution if your business mainly provides financial services or manages assets.
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
          <Button label="Learn more about financial institutions" variant="outline" fullWidth onClick={() => {}} />
        </div>

        <Button
          label="Yes, we're a financial institution"
          variant="secondary"
          fullWidth
          onClick={() => navigate('/business/tax-residency')}
        />
        <button
          type="button"
          className={styles.noButton}
          onClick={() => setShowSheet(true)}
        >
          No, that doesn't sound like us
        </button>
      </Page>

      {showSheet && (
        <div className={sheetStyles.backdrop} onClick={() => setShowSheet(false)}>
          <div className={sheetStyles.sheet} onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className={sheetStyles.closeButton}
              onClick={() => setShowSheet(false)}
            >
              <X size={20} strokeWidth={1.5} />
            </button>
            <h2 className={sheetStyles.title}>Not sure which category fits your business?</h2>
            <p className={sheetStyles.body}>
              You can continue with your application, or learn more about these categories to find the best fit.
            </p>
            <Button label="Next" variant="secondary" fullWidth onClick={handleNext} />
            <button type="button" className={sheetStyles.learnMore} onClick={() => {}}>
              Learn more about these categories
            </button>
          </div>
        </div>
      )}
    </>
  );
}
