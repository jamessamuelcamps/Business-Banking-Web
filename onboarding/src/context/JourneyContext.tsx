import React, { createContext, useContext, useState } from 'react';

export type SectionStatus = 'not_started' | 'in_progress' | 'complete' | 'locked';

export type SectionKey =
  | 'business'
  | 'personal'
  | 'shareholders'
  | 'id_verification'
  | 'tax';

interface VerifyData {
  email: string;
  phone: string;
  companyNumber: string;
  companyName: string;
  passcode: string;
}

interface JourneyState {
  verify: Partial<VerifyData>;
  sections: Record<SectionKey, SectionStatus>;
  isSpv: boolean | null;
}

interface JourneyContextValue extends JourneyState {
  setVerifyData: (data: Partial<VerifyData>) => void;
  setSectionStatus: (key: SectionKey, status: SectionStatus) => void;
  setIsSpv: (value: boolean) => void;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<JourneyState>({
    verify: {},
    sections: {
      business: 'not_started',
      personal: 'not_started',
      shareholders: 'locked',
      id_verification: 'not_started',
      tax: 'not_started',
    },
    isSpv: null,
  });

  const setVerifyData = (data: Partial<VerifyData>) => {
    setState(s => ({ ...s, verify: { ...s.verify, ...data } }));
  };

  const setSectionStatus = (key: SectionKey, status: SectionStatus) => {
    setState(s => {
      const sections = { ...s.sections, [key]: status };
      // Unlock shareholders once personal is complete
      if (key === 'personal' && status === 'complete') {
        sections.shareholders = sections.shareholders === 'locked' ? 'not_started' : sections.shareholders;
      }
      return { ...s, sections };
    });
  };

  const setIsSpv = (value: boolean) => {
    setState(s => ({ ...s, isSpv: value }));
  };

  return (
    <JourneyContext.Provider value={{ ...state, setVerifyData, setSectionStatus, setIsSpv }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used within JourneyProvider');
  return ctx;
}
