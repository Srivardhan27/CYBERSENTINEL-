import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SOCLayout from './layouts/SOCLayout';

// Full Interactive SOC Module Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LogExplorerPage from './pages/LogExplorerPage';
import IOCAnalyzerPage from './pages/IOCAnalyzerPage';
import ThreatIntelPage from './pages/ThreatIntelPage';
import VulnerabilityPage from './pages/VulnerabilityPage';
import RiskAnalysisPage from './pages/RiskAnalysisPage';
import AssetPage from './pages/AssetPage';
import NetworkMonitorPage from './pages/NetworkMonitorPage';
import AlertsPage from './pages/AlertsPage';
import IncidentsPage from './pages/IncidentsPage';
import MITREPage from './pages/MITREPage';
import AIAnalystPage from './pages/AIAnalystPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

// PhishGuard AI Suite Pages
import PhishGuardEmailPage from './pages/PhishGuardEmailPage';
import PhishGuardUrlPage from './pages/PhishGuardUrlPage';
import PhishGuardQrPage from './pages/PhishGuardQrPage';
import PhishGuardWebsitePage from './pages/PhishGuardWebsitePage';
import PhishGuardSmsPage from './pages/PhishGuardSmsPage';
import PhishGuardVishingPage from './pages/PhishGuardVishingPage';
import PhishGuardLiveScansPage from './pages/PhishGuardLiveScansPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />

          {/* Protected Main SOC Layout */}
          <Route path="/" element={<SOCLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="log-explorer" element={<LogExplorerPage />} />
            <Route path="ioc-analyzer" element={<IOCAnalyzerPage />} />
            <Route path="threat-intelligence" element={<ThreatIntelPage />} />
            <Route path="vulnerability-management" element={<VulnerabilityPage />} />
            <Route path="risk-analysis" element={<RiskAnalysisPage />} />
            <Route path="assets" element={<AssetPage />} />
            <Route path="network-monitor" element={<NetworkMonitorPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="incidents" element={<IncidentsPage />} />
            <Route path="mitre" element={<MITREPage />} />
            <Route path="ai-analyst" element={<AIAnalystPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />

            {/* PhishGuard AI Suite Routes */}
            <Route path="phishguard" element={<PhishGuardLiveScansPage />} />
            <Route path="phishguard/live-scans" element={<PhishGuardLiveScansPage />} />
            <Route path="phishguard/email" element={<PhishGuardEmailPage />} />
            <Route path="phishguard/url" element={<PhishGuardUrlPage />} />
            <Route path="phishguard/qr" element={<PhishGuardQrPage />} />
            <Route path="phishguard/website" element={<PhishGuardWebsitePage />} />
            <Route path="phishguard/sms" element={<PhishGuardSmsPage />} />
            <Route path="phishguard/vishing" element={<PhishGuardVishingPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
