
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, MapPin, Hash, CreditCard } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import { TextLink } from '../../components/TextLink';
import { Alert } from '../../components/Alert';
import { useJourney } from '../../context/JourneyContext';
import styles from './CompanyConfirm.module.css';

interface Company {
  number: string;
  name: string;
  address: string;
}

export function CompanyConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setVerifyData } = useJourney();
  const company = location.state?.company as Company | undefined;
  const [leaving, setLeaving] = useState(false);

  if (!company) {
    navigate('/verify/company-search');
    return null;
  }

  const handleConfirm = () => {
    setVerifyData({ companyNumber: company.number, companyName: company.name });
    setLeaving(true);
    setTimeout(() => navigate('/section-complete'), 350);
  };

  return (
    <Page onSubmit={handleConfirm} leaving={leaving}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            Is this your company?
          </h1>
          <p className={styles.subtitle}>
            Confirm the details below match your company.
          </p>
        </div>

        <div className={styles.card}>
          {[
            { icon: <Building2 size={20} strokeWidth={1.5} />, label: 'Company name', value: company.name },
            { icon: <Hash size={20} strokeWidth={1.5} />, label: 'Company number', value: company.number },
            { icon: <MapPin size={20} strokeWidth={1.5} />, label: 'Registered address', value: company.address },
            { icon: <MapPin size={20} strokeWidth={1.5} />, label: 'Correspondence address', value: 'Same as registered address', editable: true },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={[styles.cardRow, i < arr.length - 1 && styles.rowDivider].filter(Boolean).join(' ')}
            >
              <div className={styles.iconCircle}>
                {row.icon}
              </div>
              <div className={styles.rowBody}>
                <div className={styles.rowLabel}>
                  {row.label}
                </div>
                <div className={styles.rowValueRow}>
                  <span className={styles.rowValue}>{row.value}</span>
                  {row.editable && <TextLink label="Edit" onClick={() => {}} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Alert
          variant="info"
          icon={<CreditCard size={18} strokeWidth={1.5} />}
          message={<><strong>Confirm correspondence address</strong><br />This is where we'll send your OakNorth debit card, so please make sure we have the right address.</>}
        />

        <Button label="Yes, that's my company" variant="secondary" type="submit" fullWidth />
        <div className={styles.searchAgainRow}>
          <TextLink label="Search again" onClick={() => navigate('/verify/company-search')} />
        </div>
      </Page>
  );
}
