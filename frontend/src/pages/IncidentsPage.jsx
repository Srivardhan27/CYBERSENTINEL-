import React, { useState, useEffect } from 'react';
import { Flame, Plus, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { doc, updateDoc } from 'firebase/firestore';
import { addDocument, COLLECTIONS, subscribeToCollection } from '../firebase/firestoreService';
import { db } from '../firebase/config';

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
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSeverity, setNewSeverity] = useState('HIGH');

  useEffect(() => {
    const unsub = subscribeToCollection(COLLECTIONS.INCIDENTS, (data) => {
      if (data && data.length > 0) {
        setIncidents(data);
        setSelectedIncident(data[0]);
      } else {
        setIncidents(MOCK_INCIDENTS);
        setSelectedIncident(MOCK_INCIDENTS[0]);
      }
    });
    return () => unsub();
  }, []);

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const payload = {
      id: `INC-${Math.floor(4000 + Math.random() * 900)}`,
      title: newTitle,
      severity: newSeverity,
      riskScore: newSeverity === 'CRITICAL' ? 94 : 75,
      status: 'INVESTIGATING',
      assignedAnalyst: 'analyst@sentinel.sec',
      relatedAlerts: ['ALT-8902'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addDocument(COLLECTIONS.INCIDENTS, payload);
    setIsModalOpen(false);
    setNewTitle('');
  };

  const handleResolveIncident = async (incident) => {
    if (!incident.id) return;
    try {
      if (incident._docId || incident.id) {
        const docRef = doc(db, COLLECTIONS.INCIDENTS, incident._docId || incident.id);
        await updateDoc(docRef, { status: 'RESOLVED', updatedAt: new Date().toISOString() });
      }
    } catch (err) {
      console.warn('Incident update warning:', err);
    }
  };

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
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Incident</span>
        </button>
      </div>

      {isModalOpen && (
        <form onSubmit={handleCreateIncident} className="p-5 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white">Create New SOC Incident Escalation</h3>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Incident Title / Summary</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Unauthorized Kerberos Ticket Extraction Attempt"
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Severity</label>
            <select
              value={newSeverity}
              onChange={(e) => setNewSeverity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-white"
            >
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
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
              Save Incident to Firestore
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          {incidents.map((inc) => (
            <div
              key={inc.id || inc.title}
              onClick={() => setSelectedIncident(inc)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedIncident?.id === inc.id
                  ? 'bg-slate-800/90 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono text-cyan-400">{inc.id || 'INC-NEW'}</span>
                <StatusBadge level={inc.status} />
              </div>
              <h4 className="text-xs font-bold font-sans text-white line-clamp-2">{inc.title}</h4>
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Risk: {inc.riskScore || 75}/100</span>
                <span>{inc.assignedAnalyst || 'analyst@sentinel.sec'}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          {selectedIncident && (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{selectedIncident.id}</span>
                  <h3 className="text-base font-bold font-mono text-white mt-0.5">{selectedIncident.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge level={selectedIncident.severity} />
                  {selectedIncident.status !== 'RESOLVED' && (
                    <button
                      onClick={() => handleResolveIncident(selectedIncident)}
                      className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Resolve</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">RISK SCORE</span>
                  <p className="text-lg font-bold font-mono text-rose-400">{selectedIncident.riskScore || 85}/100</p>
                </div>
                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">ASSIGNED ANALYST</span>
                  <p className="text-xs font-bold font-mono text-slate-200 truncate mt-1">{selectedIncident.assignedAnalyst || 'analyst@sentinel.sec'}</p>
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
