import { useRef, useState } from 'react';
import styles from './PinInput.module.css';

interface PinInputProps {
  length?: 4 | 6;
  value: string;
  onChange: (value: string) => void;
  masked?: boolean;
  autoFocus?: boolean;
}

export function PinInput({ length = 6, value, onChange, masked = true, autoFocus }: PinInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, length);
    onChange(raw);
  };

  return (
    <div
      className={styles.container}
      onClick={() => inputRef.current?.focus()}
    >
      <div className={styles.cells}>
        {Array.from({ length }).map((_, i) => {
          const filled = i < value.length;
          const isCursor = focused && i === value.length;
          return (
            <div
              key={i}
              className={[
                styles.cell,
                filled && styles.filled,
                isCursor && styles.cursor,
              ].filter(Boolean).join(' ')}
            >
              {filled && (
                masked
                  ? <div className={styles.dot} />
                  : <span className={styles.digit}>{value[i]}</span>
              )}
            </div>
          );
        })}
      </div>
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus={autoFocus}
        className={styles.hiddenInput}
      />
    </div>
  );
}
