import React, { useState } from 'react';
import { Server, Search, Shield, Laptop, HardDrive, Cpu, Filter } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const MOCK_ASSETS = [
  {
    id: 'AST-101',
    hostname: 'PROD-DB-SERVER-01',
    ip: '10.0.0.12',
    os: 'Ubuntu 22.04 LTS',
    type: 'Database Server',
    owner: 'DevOps / Database Team',
    criticality: 5,
    environment: 'PRODUCTION',
    status: 'ONLINE',
    activeAlerts: 4,
    vulnerabilities: 2,
    riskScore: 94,
  },
  {
    id: 'AST-102',
    hostname: 'K8S-NODE-02',
    ip: '10.0.2.14',
    os: 'Debian 12 Linux',
    type: 'Kubernetes Cluster Worker',
    owner: 'Infrastructure Engineering',
    criticality: 4,
    environment: 'PRODUCTION',
    status: 'ONLINE',
    activeAlerts: 1,
    vulnerabilities: 1,
    riskScore: 72,
  },
  {
    id: 'AST-103',
    hostname: 'WORKSTATION-04',
    ip: '10.0.4.88',
    os: 'Windows 11 Enterprise',
    type: 'User Workstation',
    owner: 'Finance Dept User',
    criticality: 3,
    environment: 'INTERNAL',
    status: 'ONLINE',
    activeAlerts: 2,
    vulnerabilities: 1,
    riskScore: 82,
  },
  {
    id: 'AST-104',
    hostname: 'MAC-BOOK-DEV-12',
    ip: '10.0.3.45',
    os: 'macOS Sonoma 14.1',
    type: 'Developer Laptop',
    owner: 'Senior Software Architect',
    criticality: 2,
    environment: 'INTERNAL',
    status: 'ONLINE',
    activeAlerts: 0,
    vulnerabilities: 1,
    riskScore: 35,
  },
  {
    id: 'AST-105',
    hostname: 'VPN-GATEWAY-EDGE',
    ip: '192.168.1.1',
    os: 'pfSense Enterprise',
    type: 'Edge Firewall / VPN',
    owner: 'Network Security Team',
    criticality: 5,
    environment: 'PRODUCTION',
    status: 'ONLINE',
    activeAlerts: 5,
    vulnerabilities: 0,
    riskScore: 88,
  },
];

const AssetPage = () => {
  const [assets, setAssets] = useState(MOCK_ASSETS);
  const [search, setSearch] = useState('');

  const filteredAssets = assets.filter(
    (a) =>
      a.hostname.toLowerCase().includes(search.toLowerCase()) ||
      a.ip.toLowerCase().includes(search.toLowerCase()) ||
      a.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">Asset Inventory & Criticality Management</h2>
            <p className="text-xs text-slate-400">Catalog endpoints, OS fingerprints, criticality ratings, and host-linked threat vectors.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1.5 rounded border border-cyan-500/30">
          TOTAL HOSTS: {assets.length}
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hostname, IP address, OS, or owner department..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 bg-slate-950/40">
                <th className="py-2.5 px-3">Asset ID</th>
                <th className="py-2.5 px-3">Hostname / IP</th>
                <th className="py-2.5 px-3">OS Fingerprint</th>
                <th className="py-2.5 px-3">Device Type</th>
                <th className="py-2.5 px-3">Criticality</th>
                <th className="py-2.5 px-3">Env</th>
                <th className="py-2.5 px-3">Alerts / Vulns</th>
                <th className="py-2.5 px-3">Host Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filteredAssets.map((ast) => (
                <tr key={ast.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-cyan-400">{ast.id}</td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-100">{ast.hostname}</p>
                    <p className="text-[11px] text-slate-400">{ast.ip}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{ast.os}</td>
                  <td className="py-3 px-3 text-slate-300">{ast.type}</td>
                  <td className="py-3 px-3 font-bold text-amber-400">Level {ast.criticality}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {ast.environment}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {ast.activeAlerts} alerts / {ast.vulnerabilities} vulns
                  </td>
                  <td className="py-3 px-3 font-bold text-rose-400">{ast.riskScore}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetPage;
