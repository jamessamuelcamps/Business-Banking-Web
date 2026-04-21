import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { BooleanField } from '../../components/BooleanField';
import { Button } from '../../components/Button';
import styles from './AccountPurpose.module.css';

const OPTIONS = [
  { id: 'customer-payments', label: 'Receive customer payments', description: 'Sales, subscriptions or invoices' },
  { id: 'business-expenses', label: 'Business expenses', description: 'Suppliers, payroll, rent or utilities' },
  { id: 'hold-savings', label: 'Hold savings', description: 'Retained earnings or surplus profits' },
  { id: 'credit-facility', label: 'Credit facility', description: 'Drawdown from a loan, credit line, etc' },
  { id: 'hold-capital', label: 'Hold business capital', description: 'Cash reserves or capital injections' },
  { id: 'investment-income', label: 'Investment income', description: 'Rent, dividends or similar returns' },
  { id: 'international-payments', label: 'International payments', description: 'Send or receive money abroad' },
  { id: 'interest-income', label: 'Interest income', description: 'Lending to individuals or other businesses' },
  { id: 'charity', label: 'Charity or non-profit activity', description: 'Fundraising, grants or donations' },
  { id: 'startup-funding', label: 'Startup or pre-revenue funding', description: 'Using VC, angel or grant funding' },
  { id: 'dormant', label: 'Dormant account', description: 'No regular activity expected' },
];

export function AccountPurpose() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <Page>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>What's the account for?</h1>
        <p className={styles.subheading}>Specify what kind of payments the account will be used for day-to-day.</p>
      </div>

      <div className={styles.checkboxGroup}>
        <p className={styles.groupLabel}>Select all that apply</p>
        {OPTIONS.map(option => (
          <BooleanField
            key={option.id}
            type="checkbox"
            label={option.label}
            description={option.description}
            value={selected.has(option.id)}
            onValueChange={() => toggle(option.id)}
          />
        ))}
      </div>

      <Button
        label="Next"
        variant="secondary"
        fullWidth
        state={selected.size === 0 ? 'disabled' : 'default'}
        onClick={() => navigate('/business/source-of-funds', {
          state: { internationalPayments: selected.has('international-payments') },
        })}
      />
    </Page>
  );
}
