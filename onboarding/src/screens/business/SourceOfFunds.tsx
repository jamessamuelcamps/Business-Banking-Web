import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { BooleanField } from '../../components/BooleanField';
import { Button } from '../../components/Button';
import styles from './SourceOfFunds.module.css';

const OPTIONS = [
  { id: 'trading-income', label: 'Trading income' },
  { id: 'capital-owner', label: 'Capital from the business owner (UBO)' },
  { id: 'capital-third-party', label: 'Capital from a third party' },
  { id: 'sale-of-assets', label: 'Sale of assets or property' },
  { id: 'rental-income', label: 'Rental income' },
  { id: 'loan-finance', label: 'Loan or other finance' },
  { id: 'grants', label: 'Grants or subsidies' },
  { id: 'other', label: 'Other' },
];

export function SourceOfFunds() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [leaving, setLeaving] = useState(false);

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleNext = () => {
    setLeaving(true);
    setTimeout(() => navigate('/section-complete'), 350);
  };

  return (
    <Page leaving={leaving}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>How are you funding the account?</h1>
        <p className={styles.subheading}>We're required to ask where the funds are from. It's standard practice to help prevent financial crime.</p>
      </div>

      <div className={styles.checkboxGroup}>
        <p className={styles.groupLabel}>Select all that apply</p>
        {OPTIONS.map(option => (
          <BooleanField
            key={option.id}
            type="checkbox"
            label={option.label}
            value={selected.has(option.id)}
            onValueChange={() => toggle(option.id)}
          />
        ))}
      </div>

      <Button
        label="Next"
        variant="secondary"
        fullWidth
        disabled={selected.size === 0}
        onClick={handleNext}
      />
    </Page>
  );
}
