import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import { useJourney } from '../../context/JourneyContext';
import { searchAddresses, formatAddress, type Address } from '../../data/addresses';
import styles from './HomeAddress.module.css';

export function HomeAddress() {
  const navigate = useNavigate();
  const { setPersonalData } = useJourney();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Address[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Address | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) return;
    const matches = searchAddresses(query);
    setResults(matches);
    setOpen(matches.length > 0);
  }, [query, selected]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (address: Address) => {
    setSelected(address);
    setQuery(formatAddress(address));
    setOpen(false);
  };

  const handleClear = () => {
    setSelected(null);
    setQuery('');
    setResults([]);
    setOpen(false);
  };

  const handleContinue = () => {
    if (!selected) return;
    setPersonalData({ homeAddress: formatAddress(selected) });
    navigate('/personal/support-needs');
  };

  return (
    <Page onSubmit={handleContinue}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>What's your home address?</h1>
        <p className={styles.subheading}>Start typing your postcode or street name to find your address.</p>
      </div>

      <div ref={wrapperRef} className={styles.searchWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.searchIcon}>
            <SearchIcon size={20} strokeWidth={1.5} />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => { setSelected(null); setQuery(e.target.value); }}
            onFocus={() => { if (results.length > 0 && !selected) setOpen(true); }}
            placeholder="Postcode or street name"
            autoFocus
            className={[
              styles.searchInput,
              open && styles.open,
              query && styles.hasClearButton,
            ].filter(Boolean).join(' ')}
          />
          {query && (
            <button onClick={handleClear} className={styles.clearButton} type="button">
              <X size={16} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {open && (
          <div className={styles.dropdown}>
            {results.map((address, i) => (
              <button
                key={address.id}
                onClick={() => handleSelect(address)}
                className={[styles.dropdownItem, i > 0 && styles.dropdownItemDivider].filter(Boolean).join(' ')}
              >
                <div className={styles.addressLine1}>{address.line1}{address.line2 ? `, ${address.line2}` : ''}</div>
                <div className={styles.addressMeta}>{address.town} · {address.postcode}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <p className={[styles.emptyMessage, query.length >= 2 && results.length === 0 && !selected && styles.visible].filter(Boolean).join(' ')}>
        No addresses found. Try a different postcode or street name.
      </p>

      <Button
        label="Continue"
        variant="secondary"
        fullWidth
        type="submit"
        state={selected ? 'default' : 'disabled'}
      />
    </Page>
  );
}
