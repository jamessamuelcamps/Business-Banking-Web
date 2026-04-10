import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { BooleanField } from '../../components/BooleanField';
import { Button } from '../../components/Button';
import styles from './AccountPurpose.module.css';

const OPTIONS = [
  { id: 'lt-10',    label: 'Less than 10' },
  { id: '10-49',    label: 'Between 10-49' },
  { id: '50-249',   label: 'Between 50-249' },
  { id: '250-plus', label: '250 and over' },
];

export function EmployeeCount() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Page onSubmit={() => selected && navigate('/business/active-nfe')}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>How many people does your company employ?</h1>
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
        label="Next"
        variant="secondary"
        fullWidth
        state={selected ? 'default' : 'disabled'}
        type="submit"
      />
    </Page>
  );
}
