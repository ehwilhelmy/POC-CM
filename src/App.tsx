import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { HomePage } from './pages/Home';
import { ReportsPage } from './pages/Reports';
import { StaffPipelinePage } from './pages/StaffPipeline';
import { PlaceholderPage } from './pages/Placeholder';
import {
  AuthIndex,
  NewParentFlow,
  ReturningParentFlow,
  ForgotPasswordFlow,
  MigratedParentFlow,
  GuestAccountFlow,
  EmailPreviewFlow,
  AccountLookupFlow,
  CampanionFlow,
  ExpiredLinkFlow,
} from './pages/Auth';

const GlobalShortcuts: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key.toUpperCase() === 'I') {
        e.preventDefault();
        navigate('/auth');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  return null;
};

function App() {
  return (
    <HashRouter>
      <GlobalShortcuts />
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Auth flows — standalone, no AppShell */}
        <Route path="/auth" element={<AuthIndex />} />
        <Route path="/auth/new-parent" element={<NewParentFlow />} />
        <Route path="/auth/returning-parent" element={<ReturningParentFlow />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordFlow />} />
        <Route path="/auth/migrated" element={<MigratedParentFlow />} />
        <Route path="/auth/guest" element={<GuestAccountFlow />} />
        <Route path="/auth/emails" element={<EmailPreviewFlow />} />
        <Route path="/auth/account-lookup" element={<AccountLookupFlow />} />
        <Route path="/auth/campanion" element={<CampanionFlow />} />
        <Route path="/auth/expired-link" element={<ExpiredLinkFlow />} />

        {/* Management tool — wrapped in AppShell */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/reports" replace />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="staff/pipeline" element={<StaffPipelinePage />} />
          <Route path="communication" element={<PlaceholderPage title="Communication" />} />
          <Route path="camper" element={<PlaceholderPage title="Camper" />} />
          <Route path="alumni" element={<PlaceholderPage title="Alumni" />} />
          <Route path="financial" element={<PlaceholderPage title="Financial" />} />
          <Route path="accounts" element={<PlaceholderPage title="Accounts" />} />
          <Route path="medical" element={<PlaceholderPage title="Medical" />} />
          <Route path="travel" element={<PlaceholderPage title="Travel" />} />
          <Route path="scheduling" element={<PlaceholderPage title="Scheduling" />} />
          <Route path="admin" element={<PlaceholderPage title="Admin" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
