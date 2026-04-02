import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  state?: 'default' | 'loading' | 'disabled';
  onClick?: () => void;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export function Button({
  label,
  variant = 'primary',
  state = 'default',
  onClick,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={state === 'default' ? onClick : undefined}
      disabled={state === 'disabled' || state === 'loading'}
      className={[
        styles.btn,
        styles[variant],
        fullWidth && styles.fullWidth,
        state === 'disabled' && styles.disabled,
        state === 'loading' && styles.loading,
      ].filter(Boolean).join(' ')}
    >
      {state === 'loading' ? 'Loading…' : label}
    </button>
  );
}
