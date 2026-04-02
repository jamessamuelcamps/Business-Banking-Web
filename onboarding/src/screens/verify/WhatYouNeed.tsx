import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building2 } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import styles from './WhatYouNeed.module.css';

const ITEMS = [
  {
    icon: <CreditCard size={20} strokeWidth={1.5} />,
    title: 'Share photo ID',
    description: 'A valid passport or driver\'s licence',
  },
  {
    icon: <Smartphone size={20} strokeWidth={1.5} />,
    title: 'Take a selfie',
    description: 'This will be used with your photo ID to verify your identity',
  },
  {
    icon: <Building2 size={20} strokeWidth={1.5} />,
    title: 'Provide company information',
    description: 'General things like estimated turnover, and number of employees, to better understand your business',
  },
];

export function WhatYouNeed() {
  const navigate = useNavigate();

  return (
    <Page onSubmit={() => navigate('/legal')}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            What you'll need to do
          </h1>
        </div>

        <div className={styles.card}>
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={[styles.cardRow, i < ITEMS.length - 1 && styles.rowDivider].filter(Boolean).join(' ')}
            >
              <div className={styles.iconCircle}>
                {item.icon}
              </div>
              <div>
                <div className={styles.rowTitle}>
                  {item.title}
                </div>
                <div className={styles.rowDescription}>
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button label="Next" variant="secondary" type="submit" fullWidth />
      </Page>
  );
}
