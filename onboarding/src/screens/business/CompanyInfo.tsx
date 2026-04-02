import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { Page } from '../../components/Page';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { TextLink } from '../../components/TextLink';
import styles from './CompanyInfo.module.css';

export function CompanyInfo() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'url' | 'description'>('url');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const canContinue = mode === 'url' ? url.trim().length > 0 : description.trim().length > 0;

  return (
    <Page>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>Tell us about your business</h1>
        <p className={styles.subheading}>Please provide a link to your website or a description of your company.</p>
      </div>

      {mode === 'url' ? (
        <Alert
          variant="info"
          icon={<Info size={18} strokeWidth={1.5} />}
          message="If you have one, share your company's website URL so we can learn more about your business."
        />
      ) : (
        <Alert
          variant="info"
          icon={<Info size={18} strokeWidth={1.5} />}
          message="In a few sentences, describe what your business does, who your customers are, how you make money and where you operate."
        />
      )}

      {mode === 'url' ? (
        <Input
          label="Website URL"
          type="url"
          prefix="https://"
          value={url}
          onChange={setUrl}
          autoFocus
        />
      ) : (
        <Textarea
          label="Company description"
          value={description}
          onChange={setDescription}
          autoFocus
        />
      )}

      <TextLink
        label={mode === 'url' ? "I don't have a website" : 'Enter a website URL'}
        onClick={() => setMode(m => m === 'url' ? 'description' : 'url')}
      />

      <Button
        label="Next"
        variant="secondary"
        fullWidth
        disabled={!canContinue}
        onClick={() => navigate('/business/account-purpose')}
      />
    </Page>
  );
}
