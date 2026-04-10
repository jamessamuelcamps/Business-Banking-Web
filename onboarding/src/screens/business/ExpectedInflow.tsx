import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './AccountPurpose.module.css';

export function ExpectedInflow() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  return (
    <Page onSubmit={() => value && navigate('/business/initial-deposit')}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>How much money do you expect to be coming in?</h1>
      </div>

      <Input
        label="Expected monthly inflow"
        type="text"
        prefix="£"
        value={value}
        onChange={setValue}
        placeholder="0"
        inputMode="numeric"
        state={value ? 'filled' : 'default'}
        autoFocus
      />

      <Button
        label="Next"
        variant="secondary"
        fullWidth
        state={value ? 'default' : 'disabled'}
        type="submit"
      />
    </Page>
  );
}
