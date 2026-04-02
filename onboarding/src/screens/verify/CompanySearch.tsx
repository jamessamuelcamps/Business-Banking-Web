import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import { searchCompanies, type DemoCompany } from '../../data/companies';
import styles from './CompanySearch.module.css';

export function CompanySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DemoCompany[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const matches = searchCompanies(query);
    setResults(matches);
    setOpen(matches.length > 0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (company: DemoCompany) => {
    setOpen(false);
    navigate('/verify/company-confirm', { state: { company } });
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setOpen(false);
  };

  return (
    <Page>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            Find your company
          </h1>
          <p className={styles.subtitle}>
            Search by company name or Companies House number.
          </p>
        </div>

        <div ref={wrapperRef} className={styles.searchWrapper}>
          {/* Search input */}
          <div className={styles.inputWrapper}>
            <div className={styles.searchIcon}>
              <SearchIcon size={20} strokeWidth={1.5} />
            </div>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => { if (results.length > 0) setOpen(true); }}
              placeholder="Company name or number"
              autoFocus
              className={[
                styles.searchInput,
                open && styles.open,
                query && styles.hasClearButton,
              ].filter(Boolean).join(' ')}
            />
            {query && (
              <button
                onClick={handleClear}
                className={styles.clearButton}
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {open && (
            <div className={styles.dropdown}>
              {results.map((company, i) => (
                <button
                  key={company.number}
                  onClick={() => handleSelect(company)}
                  className={[styles.dropdownItem, i > 0 && styles.dropdownItemDivider].filter(Boolean).join(' ')}
                >
                  <div className={styles.companyName}>
                    {company.name}
                  </div>
                  <div className={styles.companyMeta}>
                    {company.number} · {company.address}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className={[styles.emptyMessage, query.length >= 2 && results.length === 0 && styles.visible].filter(Boolean).join(' ')}>
          No companies found. Try a different name or number.
        </p>

        <div className={styles.manualEntryRow}>
          <Button
            label="Enter company number manually"
            variant="outline"
            onClick={() => navigate('/verify/company-confirm', {
              state: {
                company: {
                  number: query,
                  name: query,
                  address: 'Address not found — please verify',
                }
              }
            })}
            state={query.trim().length > 0 ? 'default' : 'disabled'}
          />
        </div>
      </Page>
  );
}
