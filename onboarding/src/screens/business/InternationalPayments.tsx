import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { BooleanField } from '../../components/BooleanField';
import { Button } from '../../components/Button';
import styles from './AccountPurpose.module.css';

const OPTIONS = [
  { id: 'sending', label: 'Sending money abroad' },
  { id: 'receiving', label: 'Receiving money from abroad' },
  { id: 'both', label: 'Both' },
];

export function InternationalPayments() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Page>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>How will you use international payments?</h1>
      </div>

      <div className={styles.checkboxGroup}>
        {OPTIONS.map(option => (
          <BooleanField
            key={option.id}
            type="radio"
            label={option.label}
            value={selected === option.id}
            onValueChange={() => setSelected(option.id)}
          />
        ))}
      </div>

      <Button
        label="Continue"
        variant="secondary"
        fullWidth
        state={selected === null ? 'disabled' : 'default'}
        onClick={() => navigate('/business/country-select')}
      />
    </Page>
  );
}
