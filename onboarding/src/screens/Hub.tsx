import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, Menu, X } from 'lucide-react';
import { ScreenLayout } from '../components/ScreenLayout';
import { WebNav } from '../components/WebNav';
import { useJourney, type SectionStatus } from '../context/JourneyContext';
import styles from './Hub.module.css';

const MAIN_SECTIONS = [
  { key: 'verify' as const, title: 'Verify your details', path: '#' },
  { key: 'business' as const, title: 'Business information', path: '/business/account-purpose' },
  { key: 'personal' as const, title: 'Personal information', path: '/personal/which-director' },
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

  const [navOpen, setNavOpen] = useState(false);

  const completedCount = Object.values(sectionStatuses).filter(s => s === 'complete').length;
  const progressPercent = Math.round((completedCount / TOTAL_SECTIONS) * 100);

  // Animate the displayed number ticking up to progressPercent
  const [displayPercent, setDisplayPercent] = useState(progressPercent);
  const prevPercent = useRef(progressPercent);

  useEffect(() => {
    const start = prevPercent.current;
    const end = progressPercent;
    if (start === end) return;
    const duration = 300;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-in-out
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setDisplayPercent(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prevPercent.current = end;
    };
    requestAnimationFrame(tick);
  }, [progressPercent]);

  // Trigger bar fill on next paint so CSS transition runs
  const [filledCount, setFilledCount] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setFilledCount(completedCount));
    return () => cancelAnimationFrame(id);
  }, [completedCount]);

  return (
    <ScreenLayout>
      <div className={styles.appLayout}>
        {/* Mobile nav overlay */}
        {navOpen && (
          <div className={styles.navOverlay} onClick={() => setNavOpen(false)} />
        )}
        <div className={[styles.navDrawer, navOpen && styles.navDrawerOpen].filter(Boolean).join(' ')}>
          <WebNav companyName={verify.companyName ?? 'Your company'} />
        </div>

        <main className={styles.mainContent}>
          <div className={styles.topBar}>
            <button type="button" className={styles.menuButton} onClick={() => setNavOpen(o => !o)}>
              {navOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
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
                  <span className={styles.percentageLarge}>{displayPercent}</span>
                  <span className={styles.percentageSymbol}>%</span>
                </div>

                <div className={styles.progressBar}>
                  {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
                    <div
                      key={i}
                      className={styles.segment}
                      style={{ borderColor: i < filledCount ? 'var(--color-surface-brand)' : undefined }}
                    >
                      <div
                        className={styles.segmentFill}
                        style={{ width: i < filledCount ? '100%' : '0%' }}
                      />
                    </div>
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
