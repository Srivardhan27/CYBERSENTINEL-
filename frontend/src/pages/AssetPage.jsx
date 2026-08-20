import React, { useState, useEffect } from 'react';
import { Server, Search, Plus, Shield, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { addDocument, getCollectionDocs, COLLECTIONS, subscribeToCollection } from '../firebase/firestoreService';

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
];

const AssetPage = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHostname, setNewHostname] = useState('');
  const [newIp, setNewIp] = useState('');
  const [newOs, setNewOs] = useState('Ubuntu 22.04 LTS');
  const [newType, setNewType] = useState('Server');

  useEffect(() => {
    const unsub = subscribeToCollection(COLLECTIONS.ASSETS, (data) => {
      if (data && data.length > 0) {
        setAssets(data);
      } else {
        setAssets(MOCK_ASSETS);
      }
    });
    return () => unsub();
  }, []);

  const handleAddAsset = async (e) => {
    e.preventDefault();
    if (!newHostname || !newIp) return;

    const payload = {
      id: `AST-${Math.floor(100 + Math.random() * 900)}`,
      hostname: newHostname,
      ip: newIp,
      os: newOs,
      type: newType,
      owner: 'SecOps Team',
      criticality: 4,
      environment: 'PRODUCTION',
      status: 'ONLINE',
      activeAlerts: 0,
      vulnerabilities: 0,
      riskScore: 15,
      createdAt: new Date().toISOString(),
    };

    await addDocument(COLLECTIONS.ASSETS, payload);
    setIsModalOpen(false);
    setNewHostname('');
    setNewIp('');
  };

  const filteredAssets = assets.filter(
    (a) =>
      (a.hostname || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.ip || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.owner || '').toLowerCase().includes(search.toLowerCase())
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

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Asset</span>
        </button>
      </div>

      {isModalOpen && (
        <form onSubmit={handleAddAsset} className="p-5 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white">Register New Asset Endpoint</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Hostname</label>
              <input
                type="text"
                value={newHostname}
                onChange={(e) => setNewHostname(e.target.value)}
                placeholder="e.g. PROD-WEB-02"
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">IP Address</label>
              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="e.g. 10.0.1.55"
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-1.5 rounded bg-slate-800 text-slate-300 font-mono text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-cyan-500 text-slate-950 font-mono font-bold text-xs"
            >
              Save Asset to Firestore
            </button>
          </div>
        </form>
      )}

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
                <th className="py-2.5 px-3">Host Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filteredAssets.map((ast) => (
                <tr key={ast.id || ast.hostname} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-cyan-400">{ast.id || 'AST-NEW'}</td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-100">{ast.hostname}</p>
                    <p className="text-[11px] text-slate-400">{ast.ip}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{ast.os || 'Linux'}</td>
                  <td className="py-3 px-3 text-slate-300">{ast.type || 'Server'}</td>
                  <td className="py-3 px-3 font-bold text-amber-400">Level {ast.criticality || 4}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {ast.environment || 'PRODUCTION'}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-rose-400">{ast.riskScore || 20}/100</td>
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
