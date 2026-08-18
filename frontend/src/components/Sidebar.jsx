import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  Radio,
  SearchCode,
  ShieldCheck as ShieldIcon,
  Flame,
  Binary,
  Layers,
  Activity,
  Server,
  MailWarning,
  Globe,
  Globe2,
  MessageSquareWarning,
  QrCode,
  Mic,
  Network,
  Bot,
  FileSpreadsheet,
  Settings,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [phishGuardOpen, setPhishGuardOpen] = useState(true);
  const { currentUser, role } = useAuth();

  const mainNavigation = [
    { name: 'SOC Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Real-Time Alerts', path: '/alerts', icon: ShieldAlert },
    { name: 'Incident Management', path: '/incidents', icon: Flame },
    { name: 'Security Log Explorer', path: '/log-explorer', icon: SearchCode },
  ];

  const intelAndAnalytics = [
    { name: 'Threat Intelligence', path: '/threat-intelligence', icon: Radio },
    { name: 'IOC Analyzer', path: '/ioc-analyzer', icon: Binary },
    { name: 'MITRE ATT&CK', path: '/mitre', icon: Layers },
    { name: 'Vulnerability Mgmt', path: '/vulnerability-management', icon: ShieldIcon },
    { name: 'Risk Scoring Engine', path: '/risk-analysis', icon: Activity },
    { name: 'Asset Management', path: '/assets', icon: Server },
  ];

  const phishGuardSubRoutes = [
    { name: 'Overview', path: '/phishguard', icon: Sparkles },
    { name: 'Email Phishing', path: '/phishguard/email', icon: MailWarning },
    { name: 'URL Phishing', path: '/phishguard/url', icon: Globe },
    { name: 'Website Analyzer', path: '/phishguard/website', icon: Globe2 },
    { name: 'SMS / Smishing', path: '/phishguard/sms', icon: MessageSquareWarning },
    { name: 'QR Phishing', path: '/phishguard/qr', icon: QrCode },
    { name: 'Vishing Analysis', path: '/phishguard/vishing', icon: Mic },
  ];

  const advancedTools = [
    { name: 'Network Monitor', path: '/network-monitor', icon: Network },
    { name: 'AI Threat Analyst', path: '/ai-analyst', icon: Bot },
    { name: 'Security Reports', path: '/reports', icon: FileSpreadsheet },
    { name: 'System Settings', path: '/settings', icon: Settings },
  ];

  const renderNavLink = (item) => (
    <NavLink
      key={item.path}
      to={item.path}
      onClick={() => setIsMobileOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 text-xs font-mono rounded-lg transition-all duration-150 ${
          isActive
            ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-semibold shadow-sm shadow-cyan-500/20'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`
      }
    >
      <item.icon className="w-4 h-4 shrink-0" />
      <span className="truncate">{item.name}</span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0c1322] border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 glow-cyan">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-mono text-white tracking-wider uppercase">
                CyberSentinel
              </h1>
              <p className="text-[10px] font-mono text-cyan-400/80 tracking-tight">
                AI Cloud SOC Platform
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main SOC Ops */}
          <div>
            <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
              SOC Operations
            </p>
            <div className="space-y-1">{mainNavigation.map(renderNavLink)}</div>
          </div>

          {/* PhishGuard AI Module */}
          <div>
            <div
              onClick={() => setPhishGuardOpen(!phishGuardOpen)}
              className="flex items-center justify-between px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-300 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="w-3 h-3" />
                <span>PhishGuard AI</span>
              </div>
              {phishGuardOpen ? (
                <ChevronDown className="w-3 h-3 text-slate-400" />
              ) : (
                <ChevronRight className="w-3 h-3 text-slate-400" />
              )}
            </div>
            {phishGuardOpen && (
              <div className="mt-1 space-y-1 pl-1">
                {phishGuardSubRoutes.map(renderNavLink)}
              </div>
            )}
          </div>

          {/* Threat Intelligence & Security Engine */}
          <div>
            <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
              Threat Intelligence
            </p>
            <div className="space-y-1">{intelAndAnalytics.map(renderNavLink)}</div>
          </div>

          {/* Advanced AI & Reporting */}
          <div>
            <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
              Advanced Security
            </p>
            <div className="space-y-1">{advancedTools.map(renderNavLink)}</div>
          </div>
        </div>

        {/* User Role Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
              {role ? role.substring(0, 2) : 'SA'}
            </div>
            <div className="truncate">
              <p className="text-xs font-mono font-medium text-slate-200 truncate">
                {currentUser?.email || 'analyst@sentinel.sec'}
              </p>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                ROLE: {role || 'ADMIN'}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
