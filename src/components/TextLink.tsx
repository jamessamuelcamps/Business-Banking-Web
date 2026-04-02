import styles from './TextLink.module.css';

interface TextLinkProps {
  label: string;
  onClick?: () => void;
}

export function TextLink({ label, onClick }: TextLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.link}
    >
      {label}
    </button>
  );
}
