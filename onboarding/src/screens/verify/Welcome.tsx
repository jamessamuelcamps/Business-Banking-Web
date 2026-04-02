import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import styles from './Welcome.module.css';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <Page showBack={false}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            Welcome to OakNorth
          </h1>
          <p className={styles.subtitle}>
            Open a business account or log in to manage your existing one.
          </p>
        </div>

        <div className={styles.actions}>
          <Button
            label="Sign up"
            variant="secondary"
            onClick={() => navigate('/what-you-need')}
            fullWidth
          />
          <Button
            label="Log in"
            variant="outline"
            onClick={() => {}}
            fullWidth
          />
        </div>
      </Page>
  );
}
