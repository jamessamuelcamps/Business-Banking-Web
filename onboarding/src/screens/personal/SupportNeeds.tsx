import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { BooleanField } from '../../components/BooleanField';
import { Button } from '../../components/Button';
import styles from './SupportNeeds.module.css';

const SUPPORT_OPTIONS = [
  { id: 'health', label: 'A physical or mental health condition' },
  { id: 'disability', label: 'A learning disability or neurodivergent condition' },
  { id: 'language', label: 'Difficulty reading, writing or speaking in English' },
  { id: 'life-event', label: 'A life event, such as bereavement or relationship breakdown' },
  { id: 'financial', label: 'Financial difficulty' },
];

export function SupportNeeds() {
  const navigate = useNavigate();
  const [needsSupport, setNeedsSupport] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleContinue = () => navigate('/personal/confirm-details');

  return (
    <Page onSubmit={handleContinue}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>Do you need any support?</h1>
        <p className={styles.subheading}>
          We want to make sure we can help everyone access our services. Let us know if there's anything we should be aware of.
        </p>
      </div>

      <div className={styles.radioGroup}>
        <BooleanField
          type="radio"
          label="Yes"
          value={needsSupport === true}
          onValueChange={() => setNeedsSupport(true)}
        />
        <BooleanField
          type="radio"
          label="No"
          value={needsSupport === false}
          onValueChange={() => { setNeedsSupport(false); setSelected(new Set()); }}
        />
      </div>

      {needsSupport === true && (
        <div className={styles.supportOptions}>
          <p className={styles.groupLabel}>Select all that apply</p>
          {SUPPORT_OPTIONS.map(option => (
            <BooleanField
              key={option.id}
              type="checkbox"
              label={option.label}
              value={selected.has(option.id)}
              onValueChange={() => toggle(option.id)}
            />
          ))}
        </div>
      )}

      <Button
        label="Continue"
        variant="secondary"
        fullWidth
        type="submit"
        state={needsSupport !== null ? 'default' : 'disabled'}
      />
    </Page>
  );
}
