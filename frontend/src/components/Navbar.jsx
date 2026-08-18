import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Shield, Activity } from 'lucide-react';
import StatusBadge from './StatusBadge';

const Navbar = ({ onMenuToggle }) => {
  const [query, setQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      const q = query.trim().toUpperCase();
      if (q.startsWith('CVE-')) {
        navigate('/vulnerability-management');
      } else if (q.startsWith('ALT-')) {
        navigate('/alerts');
      } else if (q.startsWith('INC-')) {
        navigate('/incidents');
      } else {
        navigate('/ioc-analyzer');
      }
    }
  };

  return (
    <header className="h-16 bg-[#0c1322]/90 border-b border-slate-800/80 sticky top-0 z-30 backdrop-blur px-4 lg:px-6 flex items-center justify-between">
      {/* Mobile Toggle & Quick Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg bg-slate-800/60 text-slate-300 hover:text-white lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            placeholder="Search IOC, IP, Rule, CVE, or Hash (Press Enter)..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Real-time Status Ticker & Badges */}
      <div className="flex items-center gap-3">
        {/* Lab Mode Alert Badge */}
        <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 rounded-lg">
          <Shield className="w-3.5 h-3.5" />
          AUTHORIZED LAB ENVIRONMENT
        </span>

        {/* Live SOC Feed Ticker */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-slate-300">SOC ENGINE:</span>
          <span className="text-xs font-mono font-semibold text-emerald-400">ONLINE</span>
        </div>

        {/* Threat Severity Pill */}
        <div className="flex items-center gap-2">
          <StatusBadge level="ELEVATED" />
        </div>

        {/* Notification Counter */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-50 text-xs font-mono space-y-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-bold text-white uppercase">SOC Alerts</span>
                <span className="text-[10px] text-rose-400 font-bold">3 Unread</span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <p className="p-1.5 rounded bg-slate-950 text-rose-300">● ALT-8902: Failed SSH Auth Brute Force</p>
                <p className="p-1.5 rounded bg-slate-950 text-amber-300">● ALT-8901: Encoded PowerShell Spawn</p>
                <p className="p-1.5 rounded bg-slate-950 text-cyan-300">● ALT-8900: PhishGuard Malicious Email</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
