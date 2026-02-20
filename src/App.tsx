import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { ReportsPage } from './pages/Reports';
import { StaffPipelinePage } from './pages/StaffPipeline';
import { PlaceholderPage } from './pages/Placeholder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/reports" replace />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/staff/pipeline" element={<StaffPipelinePage />} />
          <Route path="/communication" element={<PlaceholderPage title="Communication" />} />
          <Route path="/camper" element={<PlaceholderPage title="Camper" />} />
          <Route path="/alumni" element={<PlaceholderPage title="Alumni" />} />
          <Route path="/financial" element={<PlaceholderPage title="Financial" />} />
          <Route path="/accounts" element={<PlaceholderPage title="Accounts" />} />
          <Route path="/medical" element={<PlaceholderPage title="Medical" />} />
          <Route path="/travel" element={<PlaceholderPage title="Travel" />} />
          <Route path="/scheduling" element={<PlaceholderPage title="Scheduling" />} />
          <Route path="/admin" element={<PlaceholderPage title="Admin" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
