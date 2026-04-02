import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import styles from './VerifyHeader.module.css';

interface VerifyHeaderProps {
  onBack?: () => void;
  showBack?: boolean;
}

export function VerifyHeader({ onBack, showBack = true }: VerifyHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        {/* Left: logo + optional back button */}
        <div className={styles.left}>
          {showBack && (
            <button
              onClick={handleBack}
              className={styles.backButton}
              aria-label="Go back"
            >
              <ArrowLeft size={24} strokeWidth={1.5} />
            </button>
          )}
          <img src={logo} alt="OakNorth" className={styles.logo} />
        </div>

        {/* Right: Help button */}
        <button type="button" className={styles.helpButton}>
          Help
        </button>
      </div>
    </div>
  );
}
