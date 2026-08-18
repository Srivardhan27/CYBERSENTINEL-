import React from 'react';
import { Layers, ShieldAlert, ArrowUpRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const TACTICS = [
  {
    tactic: 'Initial Access',
    techniques: [
      { id: 'T1566.002', name: 'Spearphishing Link', status: 'ACTIVE', count: 29 },
      { id: 'T1190', name: 'Exploit Public App', status: 'INACTIVE', count: 0 },
    ],
  },
  {
    tactic: 'Execution',
    techniques: [
      { id: 'T1059.001', name: 'PowerShell Execution', status: 'ACTIVE', count: 21 },
      { id: 'T1059.003', name: 'Windows Cmd Shell', status: 'ACTIVE', count: 8 },
    ],
  },
  {
    tactic: 'Credential Access',
    techniques: [
      { id: 'T1110', name: 'Brute Force SSH/RDP', status: 'ACTIVE', count: 48 },
      { id: 'T1003', name: 'OS Credential Dumping', status: 'INACTIVE', count: 0 },
    ],
  },
  {
    tactic: 'Discovery',
    techniques: [
      { id: 'T1046', name: 'Network Service Scanning', status: 'ACTIVE', count: 37 },
      { id: 'T1082', name: 'System Info Discovery', status: 'ACTIVE', count: 12 },
    ],
  },
  {
    tactic: 'Command & Control',
    techniques: [
      { id: 'T1071.001', name: 'Web Protocols (C2)', status: 'ACTIVE', count: 15 },
      { id: 'T1090', name: 'Proxy Channeling', status: 'ACTIVE', count: 4 },
    ],
  },
];

const MITREPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">MITRE ATT&CK Framework Mapping</h2>
            <p className="text-xs text-slate-400">Visual matrix correlating active security alerts to adversary tactics and techniques.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {TACTICS.map((t) => (
          <div key={t.tactic} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              {t.tactic}
            </h3>
            <div className="space-y-2">
              {t.techniques.map((tech) => (
                <div
                  key={tech.id}
                  className={`p-3 rounded-lg border text-xs font-mono space-y-1 ${
                    tech.status === 'ACTIVE'
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-slate-200'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400">{tech.id}</span>
                    {tech.count > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                        {tech.count} Hits
                      </span>
                    )}
                  </div>
                  <p className="font-sans font-medium text-slate-300 truncate">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MITREPage;
