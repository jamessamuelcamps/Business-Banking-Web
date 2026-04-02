import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { PinInput } from '../../components/PinInput';
import { Button } from '../../components/Button';
import styles from './CreatePasscode.module.css';

export function CreatePasscode() {
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (passcode.length !== 6) return;
    navigate('/verify/confirm-passcode', { state: { passcode } });
  };

  return (
    <Page onSubmit={handleNext}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            Create a passcode
          </h1>
          <p className={styles.subtitle}>
            Choose a 6-digit passcode for quick access.
          </p>
        </div>

        <div className={styles.pinContainer}>
          <div className={styles.pinWidth}>
            <PinInput length={6} value={passcode} onChange={setPasscode} autoFocus />
          </div>
          <div className={styles.pinWidth}>
            <Button
              label="Next"
              variant="secondary"
              state={passcode.length === 6 ? 'default' : 'disabled'}
              type="submit"
              fullWidth
            />
          </div>
        </div>
      </Page>
  );
}
