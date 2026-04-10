import { ChevronDown, LayoutGrid, Wallet, ArrowLeftRight, UserRound, FileText, CircleDollarSign, CreditCard, Link2, Lock } from 'lucide-react';
import logo from '../assets/logo.svg';
import styles from './WebNav.module.css';

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface WebNavProps {
  companyName: string;
  activeKey?: string;
  locked?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard',   label: 'Dashboard',               icon: <LayoutGrid      size={24} strokeWidth={1.5} /> },
  { key: 'accounts',    label: 'My accounts',              icon: <Wallet          size={24} strokeWidth={1.5} /> },
  { key: 'payments',    label: 'Payments',                 icon: <ArrowLeftRight  size={24} strokeWidth={1.5} />, badge: 5 },
  { key: 'recipients',  label: 'Recipients',               icon: <UserRound       size={24} strokeWidth={1.5} /> },
  { key: 'invoicing',   label: 'Invoicing',                icon: <FileText        size={24} strokeWidth={1.5} /> },
  { key: 'bill-pay',    label: 'Bill pay',                 icon: <CircleDollarSign size={24} strokeWidth={1.5} /> },
  { key: 'cards',       label: 'Cards',                    icon: <CreditCard      size={24} strokeWidth={1.5} /> },
  { key: 'accounting',  label: 'Accounting integrations',  icon: <Link2           size={24} strokeWidth={1.5} /> },
];

const LOCK_ICON = <Lock size={24} strokeWidth={1.5} />;

export function WebNav({ companyName, activeKey = 'dashboard', locked = false }: WebNavProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <img src={logo} className={styles.logo} alt="OakNorth" />
        <div className={styles.companySelector}>
          <span className={styles.companyName}>{companyName}</span>
          <ChevronDown size={20} strokeWidth={1.5} color="var(--color-icon-default)" />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.navItems}>
        {NAV_ITEMS.map(item => (
          <div
            key={item.key}
            className={[
              styles.navItem,
              !locked && item.key === activeKey && styles.navItemActive,
              locked && styles.navItemLocked,
            ].filter(Boolean).join(' ')}
          >
            <span className={styles.navIcon}>{locked ? LOCK_ICON : item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
            {!locked && item.badge != null && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
