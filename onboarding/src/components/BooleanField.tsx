import styles from './BooleanField.module.css';

interface BooleanFieldProps {
  type: 'radio' | 'checkbox' | 'switch';
  value: boolean;
  label: string;
  description?: string;
  onValueChange?: (value: boolean) => void;
}

export function BooleanField({ type, value, label, description, onValueChange }: BooleanFieldProps) {
  return (
    <button
      type="button"
      onClick={() => onValueChange?.(!value)}
      className={[styles.field, value && styles.checked].filter(Boolean).join(' ')}
    >
      <Indicator type={type} checked={value} />
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </button>
  );
}

function Indicator({ type, checked }: { type: BooleanFieldProps['type']; checked: boolean }) {
  if (type === 'radio') {
    return (
      <div className={[styles.radio, checked && styles.checked].filter(Boolean).join(' ')}>
        {checked && <div className={styles.radioDot} />}
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className={[styles.checkbox, checked && styles.checked].filter(Boolean).join(' ')}>
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    );
  }

  // switch
  return (
    <div className={[styles.switchTrack, checked && styles.checked].filter(Boolean).join(' ')}>
      <div className={styles.switchThumb} />
    </div>
  );
}
