import React, { useState } from 'react';
import { Settings, Shield, Lock, FileText, Key, CheckCircle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { currentUser, role, switchDemoAccount } = useAuth();
  const [activeTab, setActiveTab] = useState('RBAC');

  const auditLogs = [
    { timestamp: '2026-08-18 12:40:02', user: 'admin@sentinel.sec', action: 'INCIDENT_UPDATE', resource: 'INC-4091', details: 'Status set to INVESTIGATING' },
    { timestamp: '2026-08-18 12:35:10', user: 'system@sentinel.sec', action: 'ALERT_CREATE', resource: 'ALT-8902', details: 'Detection rule R-SSH-BRUTE triggered' },
    { timestamp: '2026-08-18 12:28:15', user: 'analyst@sentinel.sec', action: 'IOC_LOOKUP', resource: '185.220.101.5', details: 'VirusTotal score fetched: 42/70' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">System Settings & Audit Log Management</h2>
            <p className="text-xs text-slate-400">Manage Role-Based Access Control (RBAC), detection rules, API keys, and platform audit logs.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-4">
        {['RBAC', 'AUDIT_LOGS', 'API_KEYS'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-xs font-mono font-bold transition-colors ${
              activeTab === tab
                ? 'text-cyan-400 border-b-2 border-cyan-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'RBAC' && (
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white">Current User Profile & Active RBAC Role</h3>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-slate-200">{currentUser?.email || 'analyst@sentinel.sec'}</p>
              <span className="text-[10px] font-mono text-cyan-400">UID: {currentUser?.uid || 'demo-admin-uid-101'}</span>
            </div>
            <StatusBadge level={role || 'ADMIN'} />
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <p className="text-xs font-mono text-slate-400">Switch Active Session Role for Evaluation:</p>
            <div className="flex gap-2">
              <button
                onClick={() => switchDemoAccount('ADMIN')}
                className="px-3 py-1.5 rounded bg-rose-950 text-rose-300 text-xs font-mono font-bold border border-rose-500/30"
              >
                ADMIN
              </button>
              <button
                onClick={() => switchDemoAccount('SECURITY_ANALYST')}
                className="px-3 py-1.5 rounded bg-cyan-950 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30"
              >
                SECURITY_ANALYST
              </button>
              <button
                onClick={() => switchDemoAccount('VIEWER')}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-slate-700"
              >
                VIEWER
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'AUDIT_LOGS' && (
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white">Immutable Audit Log History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 bg-slate-950/40">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Resource</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
                {auditLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 text-slate-400">{log.timestamp}</td>
                    <td className="py-2.5 px-3 text-cyan-400 font-bold">{log.user}</td>
                    <td className="py-2.5 px-3 text-slate-200">{log.action}</td>
                    <td className="py-2.5 px-3 text-amber-400">{log.resource}</td>
                    <td className="py-2.5 px-3 text-slate-300">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'API_KEYS' && (
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold text-white">Threat Intelligence API Key Status</h3>
          <div className="space-y-2">
            <div className="p-3 rounded bg-slate-950 flex items-center justify-between border border-slate-800">
              <span>VIRUSTOTAL_API_KEY</span>
              <span className="text-emerald-400 font-bold">CONFIGURED (FastAPI Server)</span>
            </div>
            <div className="p-3 rounded bg-slate-950 flex items-center justify-between border border-slate-800">
              <span>ABUSEIPDB_API_KEY</span>
              <span className="text-emerald-400 font-bold">CONFIGURED (FastAPI Server)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
