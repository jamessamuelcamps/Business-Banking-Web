import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useJourney } from '../../context/JourneyContext';
import styles from './EnterPhone.module.css';

export function EnterPhone() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setVerifyData } = useJourney();

  const isValid = /^[\d\s+\-()]{7,15}$/.test(phone.trim());

  const handleNext = () => {
    if (!isValid) {
      setError('Enter a valid phone number');
      return;
    }
    setVerifyData({ phone });
    navigate('/verify/phone-otp');
  };

  return (
    <Page onSubmit={handleNext}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            What's your mobile number?
          </h1>
          <p className={styles.subtitle}>
            We'll send a code to verify your number.
          </p>
        </div>

        <Input
          label="Mobile number"
          type="tel"
          value={phone}
          onChange={v => { setPhone(v); setError(''); }}
          placeholder="+44 7700 900000"
          state={error ? 'error' : phone ? 'filled' : 'default'}
          errorMessage={error}
          autoFocus
          inputMode="tel"
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
