import React, { useState, useEffect } from 'react';
import { Sparkles, MailWarning, Link2, QrCode, Globe, MessageSquare, PhoneCall, FileCode, RefreshCw, Plus, CheckCircle2, ShieldAlert } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { subscribeToCollection, addDocument, COLLECTIONS } from '../firebase/firestoreService';

const MOCK_INITIAL_SCANS = [
  { id: 'SCN-9012', timestamp: new Date().toISOString(), type: 'EMAIL', target: 'admin-update@external-secure-portal.com', classification: 'PHISHING', risk_score: 95, model: 'RoBERTa-Security-V2' },
  { id: 'SCN-9011', timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(), type: 'QR', target: 'http://malicious-qr-redirect.com/login', classification: 'PHISHING', risk_score: 92, model: 'HTML5-Canvas-QR' },
  { id: 'SCN-9010', timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(), type: 'URL', target: 'http://login.secure-online-banking-portal.net', classification: 'PHISHING', risk_score: 88, model: 'RandomForest-18' },
  { id: 'SCN-9009', timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), type: 'WEBSITE', target: 'https://www.google.com', classification: 'LEGITIMATE', risk_score: 5, model: 'DOM-Snapshot-Audit' },
  { id: 'SCN-9008', timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), type: 'SMS', target: '+1 (555) 019-2834', classification: 'PHISHING', risk_score: 85, model: 'DistilBERT-Smishing' },
  { id: 'SCN-9007', timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(), type: 'VISHING', target: 'Audio Call Transcript (Helpdesk Impersonation)', classification: 'PHISHING', risk_score: 90, model: 'Whisper-NLP-Vishing' },
  { id: 'SCN-9006', timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), type: 'FILE_HASH', target: 'invoice_march_2026.pdf.exe', classification: 'MALICIOUS', risk_score: 98, model: 'WebCrypto-SHA256' },
];

const PhishGuardLiveScansPage = () => {
  const [scans, setScans] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const unsub = subscribeToCollection(COLLECTIONS.PHISHING_SCANS, (data) => {
      if (data && data.length > 0) {
        setScans(data);
      } else {
        setScans(MOCK_INITIAL_SCANS);
      }
    });
    return () => unsub();
  }, []);

  // Compute Live Scan Counters
  const totalScans = scans.length;
  const emailScansCount = scans.filter((s) => (s.type || '').toUpperCase() === 'EMAIL').length;
  const urlScansCount = scans.filter((s) => (s.type || '').toUpperCase() === 'URL').length;
  const qrScansCount = scans.filter((s) => (s.type || '').toUpperCase() === 'QR').length;
  const websiteScansCount = scans.filter((s) => (s.type || '').toUpperCase() === 'WEBSITE').length;
  const smsScansCount = scans.filter((s) => (s.type || '').toUpperCase() === 'SMS').length;
  const vishingScansCount = scans.filter((s) => (s.type || '').toUpperCase() === 'VISHING').length;
  const fileScansCount = scans.filter((s) => (s.type || '').toUpperCase() === 'FILE_HASH' || (s.type || '').toUpperCase() === 'FILE').length;

  const handleSimulateScan = async () => {
    setIsSimulating(true);
    const scanTypes = ['EMAIL', 'URL', 'QR', 'WEBSITE', 'SMS', 'VISHING', 'FILE_HASH'];
    const selectedType = scanTypes[Math.floor(Math.random() * scanTypes.length)];
    const isPhish = Math.random() > 0.3;

    const payload = {
      id: `SCN-${Math.floor(9000 + Math.random() * 999)}`,
      timestamp: new Date().toISOString(),
      type: selectedType,
      target: selectedType === 'EMAIL' ? 'verify-account@external-sec.net' : selectedType === 'URL' ? 'http://phishing-gate.com' : 'Sample Scan Artifact',
      classification: isPhish ? 'PHISHING' : 'LEGITIMATE',
      risk_score: isPhish ? Math.floor(75 + Math.random() * 23) : Math.floor(5 + Math.random() * 20),
      model: `${selectedType}-RealTime-ML`,
      createdAt: new Date().toISOString(),
    };

    await addDocument(COLLECTIONS.PHISHING_SCANS, payload);
    setTimeout(() => setIsSimulating(false), 400);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c182b] to-slate-900 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 glow-cyan">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white uppercase">Live System Scan Counters & Telemetry Dashboard</h2>
            <p className="text-xs text-slate-400">Real-time live counter stream of all security scans executed across CyberSentinel modules.</p>
          </div>
        </div>

        <button
          onClick={handleSimulateScan}
          disabled={isSimulating}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
        >
          {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>Simulate Live Scan Event</span>
        </button>
      </div>

      {/* 8 Live Scan Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* TOTAL SCANS */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
            <span>TOTAL SYSTEM SCANS</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{totalScans}</p>
          <p className="text-[10px] font-mono text-slate-400">Aggregated across all modules</p>
        </div>

        {/* EMAIL SCANS */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>EMAIL SCANS</span>
            <MailWarning className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-400">{emailScansCount}</p>
          <p className="text-[10px] font-mono text-slate-400">EML & Header NLP scans</p>
        </div>

        {/* URL SCANS */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>URL SCANS</span>
            <Link2 className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-400">{urlScansCount}</p>
          <p className="text-[10px] font-mono text-slate-400">18 Feature vector lookups</p>
        </div>

        {/* QR SCANS */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>QR CODE SCANS</span>
            <QrCode className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-400">{qrScansCount}</p>
          <p className="text-[10px] font-mono text-slate-400">HTML5 Canvas matrix scans</p>
        </div>

        {/* WEBSITE SCANS */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>WEBSITE DOM SCANS</span>
            <Globe className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-400">{websiteScansCount}</p>
          <p className="text-[10px] font-mono text-slate-400">DOM Form & iframe audits</p>
        </div>

        {/* SMS SCANS */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>SMS SMISHING SCANS</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-400">{smsScansCount}</p>
          <p className="text-[10px] font-mono text-slate-400">DistilBERT Smishing scans</p>
        </div>

        {/* VISHING SCANS */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>VISHING CALL SCANS</span>
            <PhoneCall className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-400">{vishingScansCount}</p>
          <p className="text-[10px] font-mono text-slate-400">Audio transcript NLP scans</p>
        </div>

        {/* FILE HASH SCANS */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>FILE & HASH SCANS</span>
            <FileCode className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-400">{fileScansCount}</p>
          <p className="text-[10px] font-mono text-slate-400">Web Crypto SHA-256 scans</p>
        </div>
      </div>

      {/* Live Scan Telemetry Stream Table */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
            Live System Scan Telemetry Feed
          </h3>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
            REAL-TIME FIRESTORE STREAM
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 bg-slate-950/40">
                <th className="py-2.5 px-3">Scan ID</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Scan Vector</th>
                <th className="py-2.5 px-3">Target Artifact</th>
                <th className="py-2.5 px-3">Verdict</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">AI Model Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {scans.map((s) => (
                <tr key={s.id || s.target} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-cyan-400">{s.id || 'SCN-LIVE'}</td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    {s.timestamp ? new Date(s.timestamp).toLocaleTimeString() : 'Just Now'}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[10px] font-bold">
                      {s.type || 'EMAIL'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-200 font-sans font-medium truncate max-w-xs">{s.target}</td>
                  <td className="py-3 px-3">
                    <StatusBadge level={s.classification || 'PHISHING'} />
                  </td>
                  <td className="py-3 px-3 font-bold text-rose-400">{s.risk_score || s.riskScore || 85}/100</td>
                  <td className="py-3 px-3 text-slate-400">{s.model || 'PhishGuard-ML'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PhishGuardLiveScansPage;
