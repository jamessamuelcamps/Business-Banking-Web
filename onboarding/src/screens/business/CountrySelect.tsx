import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Check } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import styles from './CountrySelect.module.css';

const COUNTRIES: { code: string; name: string }[] = [
  { code: 'us', name: 'United States' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'es', name: 'Spain' },
  { code: 'it', name: 'Italy' },
  { code: 'be', name: 'Belgium' },
  { code: 'se', name: 'Sweden' },
  { code: 'no', name: 'Norway' },
  { code: 'dk', name: 'Denmark' },
  { code: 'ch', name: 'Switzerland' },
  { code: 'pl', name: 'Poland' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ie', name: 'Ireland' },
  { code: 'au', name: 'Australia' },
  { code: 'ca', name: 'Canada' },
  { code: 'jp', name: 'Japan' },
  { code: 'cn', name: 'China' },
  { code: 'in', name: 'India' },
  { code: 'sg', name: 'Singapore' },
  { code: 'hk', name: 'Hong Kong' },
  { code: 'ae', name: 'United Arab Emirates' },
  { code: 'za', name: 'South Africa' },
  { code: 'br', name: 'Brazil' },
  { code: 'mx', name: 'Mexico' },
  { code: 'nz', name: 'New Zealand' },
];

export function CountrySelect() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() =>
    COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  const toggle = (code: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });

  return (
    <Page>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>Which countries will you trade with?</h1>
        <p className={styles.subtitle}>Select all that apply.</p>
      </div>

      <div className={styles.searchWrapper}>
        <Search size={20} strokeWidth={1.5} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search countries"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button className={styles.clearButton} onClick={() => setQuery('')} type="button">
            <X size={16} strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div className={styles.list}>
        {filtered.map((country, i) => {
          const isSelected = selected.has(country.code);
          const isLast = i === filtered.length - 1;
          return (
            <button
              key={country.code}
              type="button"
              onClick={() => toggle(country.code)}
              className={[styles.row, isLast && styles.rowLast].filter(Boolean).join(' ')}
            >
              <img
                src={`https://flagcdn.com/w40/${country.code}.png`}
                srcSet={`https://flagcdn.com/w80/${country.code}.png 2x`}
                alt={country.name}
                className={styles.flag}
              />
              <span className={styles.countryName}>{country.name}</span>
              {isSelected && (
                <Check size={20} strokeWidth={2} className={styles.tick} />
              )}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className={styles.empty}>No countries match your search.</p>
        )}
      </div>

      <Button
        label="Continue"
        variant="secondary"
        fullWidth
        state={selected.size === 0 ? 'disabled' : 'default'}
        onClick={() => navigate('/business/annual-turnover')}
      />
    </Page>
  );
}
