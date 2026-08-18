import React, { useState } from 'react';
import { Flame, Plus, UserCheck, ShieldAlert, Clock, ArrowRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const MOCK_INCIDENTS = [
  {
    id: 'INC-4091',
    title: 'High Confidence SSH Brute Force & Suspicious Execution',
    severity: 'CRITICAL',
    riskScore: 94,
    status: 'INVESTIGATING',
    assignedAnalyst: 'analyst@sentinel.sec',
    relatedAlerts: ['ALT-8902', 'ALT-8901'],
    updatedAt: '2026-08-18 12:35:10',
  },
  {
    id: 'INC-4090',
    title: 'PhishGuard Credential Harvesting Attack Blocked',
    severity: 'HIGH',
    riskScore: 88,
    status: 'CONTAINED',
    assignedAnalyst: 'admin@sentinel.sec',
    relatedAlerts: ['ALT-8900'],
    updatedAt: '2026-08-18 12:28:15',
  },
  {
    id: 'INC-4089',
    title: 'Internal Subnet Port Scanning & Reconnaissance',
    severity: 'MEDIUM',
    riskScore: 55,
    status: 'RESOLVED',
    assignedAnalyst: 'auditor@sentinel.sec',
    relatedAlerts: ['ALT-8899'],
    updatedAt: '2026-08-18 11:59:30',
  },
];

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">SOC Incident Management Workflow</h2>
            <p className="text-xs text-slate-400">Track end-to-end incident lifecycles (NEW → INVESTIGATING → CONTAINED → RESOLVED → CLOSED).</p>
          </div>
        </div>

        <button
          onClick={() => alert('New Incident Creation Modal')}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Incident</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident List */}
        <div className="space-y-3">
          {incidents.map((inc) => (
            <div
              key={inc.id}
              onClick={() => setSelectedIncident(inc)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedIncident?.id === inc.id
                  ? 'bg-slate-800/90 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono text-cyan-400">{inc.id}</span>
                <StatusBadge level={inc.status} />
              </div>
              <h4 className="text-xs font-bold font-sans text-white line-clamp-2">{inc.title}</h4>
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Risk: {inc.riskScore}/100</span>
                <span>{inc.assignedAnalyst}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Incident Detail & Evidence Timeline */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          {selectedIncident && (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{selectedIncident.id}</span>
                  <h3 className="text-base font-bold font-mono text-white mt-0.5">{selectedIncident.title}</h3>
                </div>
                <StatusBadge level={selectedIncident.severity} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">RISK SCORE</span>
                  <p className="text-lg font-bold font-mono text-rose-400">{selectedIncident.riskScore}/100</p>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">ASSIGNED ANALYST</span>
                  <p className="text-xs font-bold font-mono text-slate-200 truncate mt-1">{selectedIncident.assignedAnalyst}</p>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">CURRENT STATUS</span>
                  <div className="mt-1">
                    <StatusBadge level={selectedIncident.status} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold font-mono text-white">Correlated Incident Evidence Timeline</h4>
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                  <p className="text-rose-400">● 12:35:10 - 48 Failed SSH auth attempts recorded from IP 192.168.1.105</p>
                  <p className="text-amber-400">● 12:31:44 - PowerShell encoded command process execution detected (PID 4920)</p>
                  <p className="text-cyan-400">● 12:28:15 - Outbound TLS connection request to VirusTotal malicious IP hit</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentsPage;
