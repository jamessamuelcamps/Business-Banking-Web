import styles from './ScreenLayout.module.css';

interface ScreenLayoutProps {
  children: React.ReactNode;
}

export function ScreenLayout({ children }: ScreenLayoutProps) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}

interface FormPageProps {
  children: React.ReactNode;
  onSubmit?: () => void;
}

export function FormPage({ children, onSubmit }: FormPageProps) {
  const inner = (
    <div className={styles.formInner}>
      {children}
    </div>
  );

  if (onSubmit) {
    return (
      <form
        onSubmit={e => { e.preventDefault(); onSubmit(); }}
        className={styles.formOuter}
      >
        {inner}
      </form>
    );
  }

  return <div className={styles.formOuter}>{inner}</div>;
}
