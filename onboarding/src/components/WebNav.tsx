import { ChevronDown, LayoutGrid, Leaf, CreditCard, ArrowLeftRight, Layers, FileText } from 'lucide-react';
import logo from '../assets/logo.svg';
import styles from './WebNav.module.css';

type NavEntry =
  | { type: 'item'; key: string; label: string; icon: React.ReactNode }
  | { type: 'group'; key: string; label: string; icon: React.ReactNode; children: { key: string; label: string }[] };

interface WebNavProps {
  companyName: string;
}

const NAV_ENTRIES: NavEntry[] = [
  { type: 'item',  key: 'dashboard', label: 'Dashboard',  icon: <LayoutGrid     size={24} strokeWidth={1.5} /> },
  { type: 'item',  key: 'explore',   label: 'Explore',    icon: <Leaf           size={24} strokeWidth={1.5} /> },
  { type: 'item',  key: 'cards',     label: 'Your cards', icon: <CreditCard     size={24} strokeWidth={1.5} /> },
  {
    type: 'group', key: 'payments', label: 'Payments', icon: <ArrowLeftRight size={24} strokeWidth={1.5} />,
    children: [
      { key: 'send-money',         label: 'Send money' },
      { key: 'receive-money',      label: 'Receive money' },
      { key: 'scheduled-payments', label: 'Scheduled payments' },
      { key: 'recipients',         label: 'Recipients' },
      { key: 'pay-a-bill',         label: 'Pay a bill' },
    ],
  },
  {
    type: 'group', key: 'manage', label: 'Manage', icon: <Layers size={24} strokeWidth={1.5} />,
    children: [
      { key: 'company-information',     label: 'Company information' },
      { key: 'accounts',                label: 'Accounts' },
      { key: 'team',                    label: 'Team' },
      { key: 'expense-cards',           label: 'Expense cards' },
      { key: 'accounting-integrations', label: 'Accounting integrations' },
      { key: 'permissions-roles',       label: 'Permissions & roles' },
      { key: 'subscriptions',           label: 'Subscriptions' },
    ],
  },
  {
    type: 'group', key: 'invoicing', label: 'Invoicing', icon: <FileText size={24} strokeWidth={1.5} />,
    children: [
      { key: 'create-invoice', label: 'Create invoice' },
      { key: 'sent-invoices',  label: 'Sent invoices' },
      { key: 'drafts',         label: 'Drafts' },
      { key: 'templates',      label: 'Templates' },
      { key: 'rules',          label: 'Rules' },
    ],
  },
];

export function WebNav({ companyName }: WebNavProps) {
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
        {NAV_ENTRIES.map(entry => {
          if (entry.type === 'item') {
            return (
              <div key={entry.key} className={styles.navItemLocked}>
                <span className={styles.navIcon}>{entry.icon}</span>
                <span className={styles.navLabel}>{entry.label}</span>
              </div>
            );
          }

          return (
            <div key={entry.key}>
              <div className={styles.navGroupHeader}>
                <span className={styles.navIcon}>{entry.icon}</span>
                <span className={styles.navLabel}>{entry.label}</span>
                <span className={styles.groupChevron}>
                  <ChevronDown size={16} strokeWidth={1.5} />
                </span>
              </div>
              <div className={styles.children}>
                {entry.children.map(child => (
                  <div key={child.key} className={styles.childItem}>
                    <span className={styles.childLabel}>{child.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </nav>
  );
}
