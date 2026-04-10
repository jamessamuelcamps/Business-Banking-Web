import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';
import { ScreenLayout } from '../components/ScreenLayout';
import { WebNav } from '../components/WebNav';
import { useJourney, type SectionStatus } from '../context/JourneyContext';
import styles from './Hub.module.css';

const MAIN_SECTIONS = [
  { key: 'verify' as const, title: 'Verify your details', path: '#' },
  { key: 'business' as const, title: 'Business information', path: '/business/account-purpose' },
  { key: 'personal' as const, title: 'Personal information', path: '#' },
  { key: 'id_verification' as const, title: 'ID verification', path: '#' },
];

const TOTAL_SECTIONS = 5;

function statusLabel(status: SectionStatus): string {
  if (status === 'complete') return 'Completed';
  if (status === 'in_progress') return 'In progress';
  return 'Not completed';
}

function statusColor(status: SectionStatus): string {
  if (status === 'complete') return 'var(--color-text-positive)';
  if (status === 'in_progress') return 'var(--color-text-info)';
  return 'var(--color-text-warning)';
}

export function Hub() {
  const navigate = useNavigate();
  const { verify, sections } = useJourney();

  const sectionStatuses: Record<string, SectionStatus> = {
    verify: 'complete',
    business: sections.business,
    personal: sections.personal,
    id_verification: sections.id_verification,
    shareholders: sections.shareholders,
  };

  const completedCount = Object.values(sectionStatuses).filter(s => s === 'complete').length;
  const progressPercent = Math.round((completedCount / TOTAL_SECTIONS) * 100);

  return (
    <ScreenLayout>
      <div className={styles.appLayout}>
        <WebNav companyName={verify.companyName ?? 'Your company'} locked />

        <main className={styles.mainContent}>
          <div className={styles.topBar}>
            <button type="button" className={styles.helpButton}>Help</button>
          </div>
          <div className={styles.scrollInner}>
          <div className={styles.contentInner}>
            <div className={styles.leftColumn}>
            {/* Header card */}
            <div className={styles.headerCard}>
              <p className={styles.companyName}>
                {verify.companyName ?? 'Your company'}
              </p>

              <div className={styles.cardMiddle}>
                <div className={styles.percentageWrapper}>
                  <span className={styles.percentageLarge}>{progressPercent}</span>
                  <span className={styles.percentageSymbol}>%</span>
                </div>

                <div className={styles.progressBar}>
                  {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
                    <div
                      key={i}
                      className={[
                        styles.segment,
                        i < completedCount ? styles.segmentFilled : styles.segmentEmpty,
                      ].join(' ')}
                    />
                  ))}
                </div>
              </div>

              <p className={styles.headerSubtitle}>
                Almost there. Complete the remaining steps to start using your OakNorth account.
              </p>
            </div>
            </div>{/* end leftColumn */}

            <div className={styles.rightColumn}>
            {/* Main sections card */}
            <div className={styles.sectionCard}>
              {MAIN_SECTIONS.map((section, index) => {
                const status = sectionStatuses[section.key];
                const isLast = index === MAIN_SECTIONS.length - 1;
                return (
                  <button
                    key={section.key}
                    onClick={() => navigate(section.path)}
                    className={[
                      styles.sectionRow,
                      isLast && styles.sectionRowLast,
                    ].filter(Boolean).join(' ')}
                  >
                    <div>
                      <p className={styles.rowTitle}>{section.title}</p>
                      <p className={styles.rowSubtitle} style={{ color: statusColor(status) }}>
                        {statusLabel(status)}
                      </p>
                    </div>
                    <ChevronRight size={20} color="var(--color-text-secondary)" className={styles.rowIcon} />
                  </button>
                );
              })}
            </div>

            {/* Additional shareholders card */}
            <div className={styles.sectionCard}>
              <div className={styles.shareholdersRow}>
                <div>
                  <p className={styles.rowTitle}>Additional shareholders</p>
                  <p
                    className={styles.rowSubtitle}
                    style={{ color: sections.shareholders === 'locked' ? 'var(--color-text-warning)' : statusColor(sections.shareholders) }}
                  >
                    {sections.shareholders === 'locked'
                      ? 'Complete personal information first'
                      : statusLabel(sections.shareholders)}
                  </p>
                </div>
                {sections.shareholders === 'locked' ? (
                  <Lock size={20} color="var(--color-text-secondary)" className={styles.rowIcon} />
                ) : (
                  <ChevronRight size={20} color="var(--color-text-secondary)" className={styles.rowIcon} />
                )}
              </div>
            </div>
            </div>{/* end rightColumn */}
          </div>
          </div>{/* end scrollInner */}
        </main>
      </div>
    </ScreenLayout>
  );
}
