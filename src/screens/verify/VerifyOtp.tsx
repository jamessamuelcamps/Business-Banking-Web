import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { PinInput } from '../../components/PinInput';
import { Button } from '../../components/Button';
import { TextLink } from '../../components/TextLink';
import { Alert } from '../../components/Alert';
import styles from './VerifyOtp.module.css';

interface VerifyOtpProps {
  channel: 'email' | 'phone';
  destination: string;
  nextPath: string;
}

export function VerifyOtp({ channel, destination, nextPath }: VerifyOtpProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    // Demo: any 6-digit code passes
    if (code.length !== 6) {
      setError('Enter the 6-digit code we sent you');
      return;
    }
    navigate(nextPath);
  };

  const handleResend = () => {
    setCode('');
    setError('');
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  const channelLabel = channel === 'email' ? 'email' : 'phone';

  return (
    <Page onSubmit={handleNext}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            Check your {channelLabel}
          </h1>
          <p className={styles.subtitle}>
            Enter the 6-digit code we sent to <strong style={{ color: 'var(--color-text-primary)' }}>{destination}</strong>.
          </p>
        </div>

        {resent && <Alert variant="success" message={`We've sent a new code to your ${channelLabel}.`} />}
        {error && <Alert variant="error" message={error} />}

        <div className={styles.pinContainer}>
          <div className={styles.pinWidth}>
            <PinInput length={6} value={code} onChange={v => { setCode(v); setError(''); }} autoFocus />
          </div>
          <div className={styles.pinWidth}>
            <Button
              label="Next"
              variant="secondary"
              state={code.length === 6 ? 'default' : 'disabled'}
              type="submit"
              fullWidth
            />
          </div>
        </div>

        <div className={styles.resendRow}>
          <TextLink label="Resend code" onClick={handleResend} />
        </div>
      </Page>
  );
}
