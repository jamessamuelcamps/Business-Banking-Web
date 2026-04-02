import styles from './Alert.module.css';

interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error' | 'announcement';
  message: React.ReactNode;
  icon?: React.ReactNode;
}

export function Alert({ variant, message, icon }: AlertProps) {
  return (
    <div className={[styles.alert, styles[variant]].join(' ')}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <p className={styles.message}>{message}</p>
    </div>
  );
}
