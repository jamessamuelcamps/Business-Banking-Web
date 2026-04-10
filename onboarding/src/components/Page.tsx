import { ScreenLayout } from './ScreenLayout';
import { VerifyHeader } from './VerifyHeader';
import styles from './Page.module.css';

interface PageProps {
  children: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  onSubmit?: () => void;
  gap?: string;
  leaving?: boolean;
}

export function Page({ children, showBack = true, onBack, onSubmit, gap = 'var(--space-32)', leaving }: PageProps) {
  const inner = (
    <div className={styles.inner} style={{ gap }}>
      {children}
    </div>
  );

  return (
    <ScreenLayout leaving={leaving}>
      <VerifyHeader showBack={showBack} onBack={onBack} />
      {onSubmit ? (
        <form onSubmit={e => { e.preventDefault(); onSubmit(); }} className={styles.outer}>
          {inner}
        </form>
      ) : (
        <div className={styles.outer}>{inner}</div>
      )}
    </ScreenLayout>
  );
}
