import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Page } from '../../components/Page';
import { PinInput } from '../../components/PinInput';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { useJourney } from '../../context/JourneyContext';
import styles from './ConfirmPasscode.module.css';

export function ConfirmPasscode() {
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setVerifyData } = useJourney();
  const original = location.state?.passcode as string | undefined;

  const handleNext = () => {
    if (confirm.length !== 6) return;
    if (confirm !== original) {
      setError('Passcodes do not match. Try again.');
      setConfirm('');
      return;
    }
    setVerifyData({ passcode: confirm });
    navigate('/verify/email');
  };

  return (
    <Page onSubmit={handleNext}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            Confirm your passcode
          </h1>
          <p className={styles.subtitle}>
            Enter your 6-digit passcode again.
          </p>
        </div>

        {error && <Alert variant="error" message={error} />}

        <div className={styles.pinContainer}>
          <div className={styles.pinWidth}>
            <PinInput length={6} value={confirm} onChange={v => { setConfirm(v); setError(''); }} autoFocus />
          </div>
          <div className={styles.pinWidth}>
            <Button
              label="Set passcode"
              variant="secondary"
              state={confirm.length === 6 ? 'default' : 'disabled'}
              type="submit"
              fullWidth
            />
          </div>
        </div>
      </Page>
  );
}
