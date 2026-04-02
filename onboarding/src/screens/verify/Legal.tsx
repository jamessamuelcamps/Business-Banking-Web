import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, HelpCircle, ExternalLink } from 'lucide-react';
import { Page } from '../../components/Page';
import { Button } from '../../components/Button';
import styles from './Legal.module.css';

const DOCS = [
  {
    icon: <Shield size={20} strokeWidth={1.5} />,
    title: 'Privacy notice',
    description: 'How we store and protect your data',
  },
  {
    icon: <FileText size={20} strokeWidth={1.5} />,
    title: 'Terms and conditions',
    description: 'Things you need to abide by as a user',
  },
  {
    icon: <HelpCircle size={20} strokeWidth={1.5} />,
    title: 'Key product information',
    description: 'The small print for our accounts',
  },
  {
    icon: <HelpCircle size={20} strokeWidth={1.5} />,
    title: 'FSCS protection',
    description: 'Information Sheet and Exclusions List',
  },
];

export function Legal() {
  const [agreedMain, setAgreedMain] = useState(false);
  const [agreedFscs, setAgreedFscs] = useState(false);
  const navigate = useNavigate();

  const canContinue = agreedMain && agreedFscs;

  return (
    <Page onSubmit={() => navigate('/verify/create-passcode')}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            Legal information
          </h1>
        </div>

        {/* Document links */}
        <div className={styles.card}>
          {DOCS.map((doc, i) => (
            <div
              key={doc.title}
              className={[styles.cardRow, i < DOCS.length - 1 && styles.rowDivider].filter(Boolean).join(' ')}
            >
              <div className={styles.iconCircle}>
                {doc.icon}
              </div>
              <div className={styles.rowContent}>
                <div className={styles.rowTitle}>
                  {doc.title}
                </div>
                <div className={styles.rowDescription}>
                  {doc.description}
                </div>
              </div>
              <ExternalLink size={16} strokeWidth={1.5} color="var(--color-icon-default)" style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Supporting text */}
        <p className={styles.supportingText}>
          We use your data in line with our Privacy Notice and Terms and Conditions, which includes the potential consequences of third parties using your data.
        </p>

        {/* Checkboxes */}
        <div className={styles.checkboxList}>
          {[
            {
              checked: agreedMain,
              onChange: () => setAgreedMain(v => !v),
              label: 'I confirm I have read and agree to the Privacy Notice, Terms and Conditions, and Key product information.',
            },
            {
              checked: agreedFscs,
              onChange: () => setAgreedFscs(v => !v),
              label: 'I confirm I have read and agree to the FSCS Information Sheet and Exclusions List.',
            },
          ].map(({ checked, onChange, label }) => (
            <label
              key={label}
              className={styles.checkboxLabel}
            >
              <div
                onClick={onChange}
                className={[styles.checkboxBox, checked ? styles.checked : styles.unchecked].join(' ')}
              >
                {checked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={styles.checkboxText}>
                {label}
              </span>
            </label>
          ))}
        </div>

        <Button
          label="Next"
          variant="secondary"
          state={canContinue ? 'default' : 'disabled'}
          type="submit"
          fullWidth
        />
      </Page>
  );
}
