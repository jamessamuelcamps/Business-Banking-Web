
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { JourneyProvider, useJourney } from './context/JourneyContext';
import { Welcome } from './screens/verify/Welcome';
import { WhatYouNeed } from './screens/verify/WhatYouNeed';
import { Legal } from './screens/verify/Legal';
import { EnterEmail } from './screens/verify/EnterEmail';
import { VerifyOtp } from './screens/verify/VerifyOtp';
import { EnterPhone } from './screens/verify/EnterPhone';
import { CompanySearch } from './screens/verify/CompanySearch';
import { CompanyConfirm } from './screens/verify/CompanyConfirm';
import { CreatePasscode } from './screens/verify/CreatePasscode';
import { ConfirmPasscode } from './screens/verify/ConfirmPasscode';
import { Hub } from './screens/Hub';
import { SectionComplete } from './screens/SectionComplete';
import { TaxResidency } from './screens/business/TaxResidency';
import { SpvConfirm } from './screens/business/SpvConfirm';
import { CompanyInfo } from './screens/business/CompanyInfo';
import { AccountPurpose } from './screens/business/AccountPurpose';
import { SourceOfFunds } from './screens/business/SourceOfFunds';

function EmailOtp() {
  const { verify } = useJourney();
  return <VerifyOtp channel="email" destination={verify.email ?? 'your email'} nextPath="/verify/phone" />;
}

function PhoneOtp() {
  const { verify } = useJourney();
  return <VerifyOtp channel="phone" destination={verify.phone ?? 'your phone'} nextPath="/verify/company-search" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/what-you-need" element={<WhatYouNeed />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/verify/email" element={<EnterEmail />} />
      <Route path="/verify/email-otp" element={<EmailOtp />} />
      <Route path="/verify/phone" element={<EnterPhone />} />
      <Route path="/verify/phone-otp" element={<PhoneOtp />} />
      <Route path="/verify/company-search" element={<CompanySearch />} />
      <Route path="/verify/company-confirm" element={<CompanyConfirm />} />
      <Route path="/verify/create-passcode" element={<CreatePasscode />} />
      <Route path="/verify/confirm-passcode" element={<ConfirmPasscode />} />
      <Route path="/section-complete" element={<SectionComplete />} />
      <Route path="/hub" element={<Hub />} />
      <Route path="/business/tax-residency" element={<TaxResidency />} />
      <Route path="/business/spv-confirm" element={<SpvConfirm />} />
      <Route path="/business/company-info" element={<CompanyInfo />} />
      <Route path="/business/account-purpose" element={<AccountPurpose />} />
      <Route path="/business/source-of-funds" element={<SourceOfFunds />} />
    </Routes>
  );
}

export default function App() {
  return (
    <JourneyProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </JourneyProvider>
  );
}
