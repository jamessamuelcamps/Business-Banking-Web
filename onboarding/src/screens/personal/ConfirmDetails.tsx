import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, MapPin, Search as SearchIcon, X } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import { TextLink } from '../../components/TextLink';
import { Alert } from '../../components/Alert';
import { useJourney } from '../../context/JourneyContext';
import { searchAddresses, formatAddress, type Address } from '../../data/addresses';
import styles from './ConfirmDetails.module.css';

export function ConfirmDetails() {
  const navigate = useNavigate();
  const { verify, personal, setPersonalData } = useJourney();
  const [leaving, setLeaving] = useState(false);

  // Previous address search
  const [showPrevSearch, setShowPrevSearch] = useState(false);
  const [prevQuery, setPrevQuery] = useState('');
  const [prevResults, setPrevResults] = useState<Address[]>([]);
  const [prevOpen, setPrevOpen] = useState(false);
  const [prevSelected, setPrevSelected] = useState<Address | null>(null);
  const prevWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevSelected) return;
    const matches = searchAddresses(prevQuery);
    setPrevResults(matches);
    setPrevOpen(matches.length > 0);
  }, [prevQuery, prevSelected]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (prevWrapperRef.current && !prevWrapperRef.current.contains(e.target as Node)) {
        setPrevOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrevSelect = (address: Address) => {
    setPrevSelected(address);
    setPrevQuery(formatAddress(address));
    setPrevOpen(false);
    setPersonalData({ previousAddress: formatAddress(address) });
  };

  const handleClearPrev = () => {
    setPrevSelected(null);
    setPrevQuery('');
    setPrevResults([]);
    setPrevOpen(false);
    setPersonalData({ previousAddress: undefined as unknown as string });
  };

  const handleConfirm = () => {
    setLeaving(true);
    setTimeout(() => navigate('/section-complete', { state: { section: 'personal' } }), 350);
  };

  const rows = [
    { icon: <User size={20} strokeWidth={1.5} />, label: 'Full name', value: personal.directorName ?? '—' },
    { icon: <Phone size={20} strokeWidth={1.5} />, label: 'Mobile number', value: verify.phone ? `+44 ${verify.phone}` : '—' },
    { icon: <Mail size={20} strokeWidth={1.5} />, label: 'Email address', value: verify.email ?? '—' },
    { icon: <MapPin size={20} strokeWidth={1.5} />, label: 'Home address', value: personal.homeAddress ?? '—' },
    ...(personal.previousAddress
      ? [{ icon: <MapPin size={20} strokeWidth={1.5} />, label: 'Previous address', value: personal.previousAddress }]
      : []),
  ];

  return (
    <Page onSubmit={handleConfirm} leaving={leaving}>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>Confirm your details</h1>
        <p className={styles.subtitle}>Check that everything looks correct before continuing.</p>
      </div>

      <div className={styles.card}>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={[styles.cardRow, i < rows.length - 1 && styles.rowDivider].filter(Boolean).join(' ')}
          >
            <div className={styles.iconCircle}>{row.icon}</div>
            <div className={styles.rowBody}>
              <div className={styles.rowLabel}>{row.label}</div>
              <div className={styles.rowValue}>{row.value}</div>
            </div>
          </div>
        ))}
      </div>

      <Alert
        variant="info"
        message={
          <>
            If you've lived at this address for less than a year, please also add your previous address.{' '}
            {!personal.previousAddress && (
              <TextLink label="Add previous address" onClick={() => setShowPrevSearch(true)} />
            )}
          </>
        }
      />

      {showPrevSearch && !personal.previousAddress && (
        <div ref={prevWrapperRef} className={styles.searchWrapper}>
          <p className={styles.searchLabel}>Previous address</p>
          <div className={styles.inputWrapper}>
            <div className={styles.searchIcon}>
              <SearchIcon size={20} strokeWidth={1.5} />
            </div>
            <input
              type="text"
              value={prevQuery}
              onChange={e => { setPrevSelected(null); setPrevQuery(e.target.value); }}
              onFocus={() => { if (prevResults.length > 0 && !prevSelected) setPrevOpen(true); }}
              placeholder="Postcode or street name"
              autoFocus
              className={[
                styles.searchInput,
                prevOpen && styles.open,
                prevQuery && styles.hasClearButton,
              ].filter(Boolean).join(' ')}
            />
            {prevQuery && (
              <button onClick={handleClearPrev} className={styles.clearButton} type="button">
                <X size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>

          {prevOpen && (
            <div className={styles.dropdown}>
              {prevResults.map((address, i) => (
                <button
                  key={address.id}
                  onClick={() => handlePrevSelect(address)}
                  className={[styles.dropdownItem, i > 0 && styles.dropdownItemDivider].filter(Boolean).join(' ')}
                >
                  <div className={styles.addressLine1}>{address.line1}{address.line2 ? `, ${address.line2}` : ''}</div>
                  <div className={styles.addressMeta}>{address.town} · {address.postcode}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Button
        label="Confirm and continue"
        variant="secondary"
        fullWidth
        type="submit"
      />
    </Page>
  );
}
