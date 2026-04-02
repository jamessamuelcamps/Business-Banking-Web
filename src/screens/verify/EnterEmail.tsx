import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useJourney } from '../../context/JourneyContext';
import styles from './EnterEmail.module.css';

export function EnterEmail() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setVerifyData } = useJourney();

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNext = () => {
    if (!isValid) {
      setError('Enter a valid email address');
      return;
    }
    setVerifyData({ email });
    navigate('/verify/email-otp');
  };

  return (
    <Page showBack={false} onSubmit={handleNext}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            What's your email address?
          </h1>
          <p className={styles.subtitle}>
            We'll send you a code to verify your address.
          </p>
        </div>

        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={v => { setEmail(v); setError(''); }}
          placeholder="name@company.com"
          state={error ? 'error' : email ? 'filled' : 'default'}
          errorMessage={error}
          autoFocus
        />

        <Button
          label="Next"
          variant="secondary"
          state={isValid ? 'default' : 'disabled'}
          type="submit"
          fullWidth
        />
      </Page>
  );
}
