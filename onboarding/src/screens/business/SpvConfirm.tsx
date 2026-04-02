import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import styles from './SpvConfirm.module.css';

export function SpvConfirm() {
  const navigate = useNavigate();

  return (
    <Page>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>Is your company a special purpose vehicle (SPV)?</h1>
        <p className={styles.subheading}>We tailor a few steps based on how your business is set up.</p>
      </div>

      <div className={styles.actions}>
        <Button label="Yes, it's an SPV" variant="secondary" fullWidth onClick={() => navigate('/business/details')} />
        <Button label="No, it's not" variant="outline" fullWidth onClick={() => navigate('/business/company-info')} />
      </div>
    </Page>
  );
}
