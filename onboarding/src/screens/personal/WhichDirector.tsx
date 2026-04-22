import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Page } from '../../components/Page';
import { BooleanField } from '../../components/BooleanField';
import { Button } from '../../components/Button';
import { TextLink } from '../../components/TextLink';
import { useJourney } from '../../context/JourneyContext';
import { getDirectors } from '../../data/directors';
import styles from './WhichDirector.module.css';

export function WhichDirector() {
  const navigate = useNavigate();
  const { setPersonalData } = useJourney();
  const directors = getDirectors();
  const [selected, setSelected] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleContinue = () => {
    const director = directors.find(d => d.id === selected);
    if (!director) return;
    setPersonalData({ directorName: director.name });
    navigate('/personal/home-address');
  };

  return (
    <Page>
      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>Which director are you?</h1>
        <p className={styles.subheading}>Select your name from the list below.</p>
      </div>

      <div className={styles.directorList}>
        {directors.map(director => (
          <BooleanField
            key={director.id}
            type="radio"
            label={director.name}
            description={`${director.role} · ${director.appointedDate}`}
            value={selected === director.id}
            onValueChange={() => setSelected(director.id)}
          />
        ))}
      </div>

      <div className={styles.notListedRow}>
        <TextLink label="My name isn't listed" onClick={() => setModalOpen(true)} />
      </div>

      <Button
        label="Continue"
        variant="secondary"
        fullWidth
        state={selected ? 'default' : 'disabled'}
        onClick={handleContinue}
      />

      {modalOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setModalOpen(false)} />
          <div className={styles.modal}>
            <button type="button" className={styles.closeButton} onClick={() => setModalOpen(false)}>
              <X size={20} strokeWidth={1.5} />
            </button>
            <h2 className={styles.modalHeading}>Name not listed?</h2>
            <p className={styles.modalBody}>
              To open an account, you need to be a registered company director. We check this against Companies House. If your name isn't listed, the register may not be up to date.
            </p>
            <p className={styles.modalBody}>
              If you've recently been appointed, check back in a few days – your progress will be saved, so you can return at any time.
            </p>
            <Button
              label="OK, got it"
              variant="secondary"
              fullWidth
              onClick={() => setModalOpen(false)}
            />
            <Button
              label="Apply as non-director"
              variant="outline"
              fullWidth
              onClick={() => {}}
            />
          </div>
        </>
      )}
    </Page>
  );
}
