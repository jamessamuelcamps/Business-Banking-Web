import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Input.module.css';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  state?: 'default' | 'filled' | 'selected' | 'error' | 'disabled';
  errorMessage?: string;
  autoFocus?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  prefix,
  state = 'default',
  errorMessage,
  autoFocus,
  inputMode,
}: InputProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>{label}</label>
      )}
      <div className={styles.inputWrapper}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          type={type === 'password' && revealed ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={state === 'disabled'}
          autoFocus={autoFocus}
          inputMode={inputMode}
          className={[
            styles.input,
            prefix && styles.hasPrefix,
            state === 'error' && styles.error,
            state === 'disabled' && styles.disabled,
            type === 'password' && styles.hasToggle,
          ].filter(Boolean).join(' ')}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setRevealed(r => !r)}
            className={styles.toggleButton}
          >
            {revealed
              ? <EyeOff size={20} strokeWidth={1.5} />
              : <Eye size={20} strokeWidth={1.5} />}
          </button>
        )}
      </div>
      {state === 'error' && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
