import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { Page } from '../../components/Page';
import { BooleanField } from '../../components/BooleanField';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import styles from './TaxResidency.module.css';

export function TaxResidency() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  const handleNext = () => {
    navigate('/business/spv-confirm');
  };

  return (
    <Page>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>Tax residency</h1>
        <p className={styles.subheading}>Does your business have tax residency <strong>outside</strong> the UK?</p>
      </div>

      <div className={styles.radioOptions}>
        {(['yes', 'no'] as const).map(option => (
          <BooleanField
            key={option}
            type="radio"
            label={option === 'yes' ? 'Yes' : 'No'}
            value={answer === option}
            onValueChange={() => setAnswer(option)}
          />
        ))}
      </div>

      <Alert
        variant="info"
        icon={<Info size={18} strokeWidth={1.5} />}
        message="We're required by law to collect information about where your business pays tax, in line with international reporting standards."
      />

      <Button
        label="Next"
        variant="secondary"
        fullWidth
        onClick={handleNext}
        disabled={answer === null}
      />
    </Page>
  );
}
