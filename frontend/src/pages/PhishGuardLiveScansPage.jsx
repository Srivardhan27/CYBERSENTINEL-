import React, { useState, useEffect } from 'react';
import { Sparkles, MailWarning, Link2, QrCode, Globe, MessageSquare, PhoneCall, FileCode, RefreshCw, Plus, ShieldAlert, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import StatusBadge from '../components/StatusBadge';
import { subscribeToCollection, addDocument, COLLECTIONS } from '../firebase/firestoreService';

const PhishGuardLiveScansPage = () => {
  const [scans, setScans] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const unsub = subscribeToCollection(COLLECTIONS.PHISHING_SCANS, (data) => {
      setScans(data || []);
    });
    return () => unsub();
  }, []);

  // Real-Time Derived Counters (Default: 0 if no scans exist)
  const totalScans = scans.length;

  const cleanScans = scans.filter((s) => {
    const cls = (s.classification || '').toUpperCase();
    const risk = Number(s.risk_score || s.riskScore || 0);
    return cls === 'LEGITIMATE' || cls === 'BENIGN' || cls === 'CLEAN' || risk < 45;
  });

  const suspiciousScans = scans.filter((s) => {
    const cls = (s.classification || '').toUpperCase();
    const risk = Number(s.risk_score || s.riskScore || 0);
    return cls === 'SUSPICIOUS' || (risk >= 45 && risk < 75);
  });

  const maliciousScans = scans.filter((s) => {
    const cls = (s.classification || '').toUpperCase();
    const risk = Number(s.risk_score || s.riskScore || 0);
    return cls === 'PHISHING' || cls === 'MALICIOUS' || risk >= 75;
  });

  const cleanCount = cleanScans.length;
  const suspiciousCount = suspiciousScans.length;
  const maliciousCount = maliciousScans.length;

  const cleanRatio = totalScans > 0 ? Math.round((cleanCount / totalScans) * 100) : 0;
  const suspiciousRatio = totalScans > 0 ? Math.round((suspiciousCount / totalScans) * 100) : 0;
  const maliciousRatio = totalScans > 0 ? Math.round((maliciousCount / totalScans) * 100) : 0;

  // Breakdown Data for Donut Chart (Default: 0)
  const pieData = [
    { name: 'Clean', value: cleanCount, color: '#00ff88' },
    { name: 'Suspicious', value: suspiciousCount, color: '#ffaa00' },
    { name: 'Malicious', value: maliciousCount, color: '#ff3366' },
  ];

  // Ingestion Timeline Data derived dynamically from scan timestamps (Default: 0)
  const timeBuckets = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
  const timelineData = timeBuckets.map((t) => {
    const countAtBucket = scans.filter((s) => {
      if (!s.timestamp) return false;
      const hour = new Date(s.timestamp).getHours();
      const bucketHour = parseInt(t.split(':')[0]);
      return hour >= bucketHour && hour < bucketHour + 3;
    }).length;

    return { time: t, scans: countAtBucket };
  });

  const handleSimulateScan = async () => {
    setIsSimulating(true);
    const scanTypes = ['EMAIL', 'URL', 'QR', 'WEBSITE', 'SMS', 'VISHING', 'FILE_HASH'];
    const selectedType = scanTypes[Math.floor(Math.random() * scanTypes.length)];
    const roll = Math.random();

    let classification = 'PHISHING';
    let risk = Math.floor(75 + Math.random() * 24);

    if (roll < 0.4) {
      classification = 'LEGITIMATE';
      risk = Math.floor(5 + Math.random() * 25);
    } else if (roll < 0.7) {
      classification = 'SUSPICIOUS';
      risk = Math.floor(45 + Math.random() * 25);
    }

    const payload = {
      id: `SCN-${Math.floor(9000 + Math.random() * 999)}`,
      timestamp: new Date().toISOString(),
      type: selectedType,
      target: selectedType === 'EMAIL' ? 'verify-account@external-sec.net' : selectedType === 'URL' ? 'http://phishing-gate.com/login' : 'Live Scan Target Artifact',
      classification,
      risk_score: risk,
      riskScore: risk,
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
            <h2 className="text-xl font-bold font-mono text-white uppercase">Live System Scan Telemetry & Detection Dashboard</h2>
            <p className="text-xs text-slate-400">Real-time scan counter engine with zero hardcoded metrics. Total scans start at 0 and increment live on submission.</p>
          </div>
        </div>

        <button
          onClick={handleSimulateScan}
          disabled={isSimulating}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
        >
          {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>Submit Live Scan (+1)</span>
        </button>
      </div>

      {/* 4 Core Detection Scorecards (0 by default) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL SCANS */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-1 glow-cyan">
          <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
            <span>TOTAL SCANS PERFORMED</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-3xl font-bold font-mono text-white">{totalScans}</p>
          <p className="text-[11px] font-mono text-slate-400">Increments live on scan submission</p>
        </div>

        {/* CLEAN DETECTIONS */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-emerald-400">
            <span>CLEAN DETECTIONS</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-3xl font-bold font-mono text-emerald-400">{cleanCount}</p>
          <p className="text-[11px] font-mono text-slate-400">{cleanRatio}% clean verification ratio</p>
        </div>

        {/* SUSPICIOUS DETECTIONS */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-amber-400">
            <span>SUSPICIOUS DETECTIONS</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="text-3xl font-bold font-mono text-amber-400">{suspiciousCount}</p>
          <p className="text-[11px] font-mono text-slate-400">{suspiciousRatio}% flagged suspicious ratio</p>
        </div>

        {/* MALICIOUS DETECTIONS */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-rose-500/30 space-y-1">
          <div className="flex justify-between items-center text-xs font-mono text-rose-400">
            <span>MALICIOUS DETECTIONS</span>
            <ShieldAlert className="w-4 h-4" />
          </div>
          <p className="text-3xl font-bold font-mono text-rose-400">{maliciousCount}</p>
          <p className="text-[11px] font-mono text-slate-400">{maliciousRatio}% malicious threat ratio</p>
        </div>
      </div>

      {/* Real-Time Scan Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Chart */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold font-mono text-white">Live Scan Telemetry Timeline</h3>
          <p className="text-xs text-slate-400">Real-time scan volume per 3-hour window (Starts at 0)</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
                <Area type="monotone" dataKey="scans" stroke="#00f0ff" fillOpacity={1} fill="url(#colorScans)" name="Scans" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Donut */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold font-mono text-white">Detection Classification Breakdown</h3>
          <p className="text-xs text-slate-400">Clean vs Suspicious vs Malicious (0 by default)</p>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-800 text-[11px] font-mono text-center">
            <div>
              <p className="text-emerald-400 font-bold">{cleanCount}</p>
              <span className="text-slate-400 text-[10px]">Clean</span>
            </div>
            <div>
              <p className="text-amber-400 font-bold">{suspiciousCount}</p>
              <span className="text-slate-400 text-[10px]">Suspicious</span>
            </div>
            <div>
              <p className="text-rose-400 font-bold">{maliciousCount}</p>
              <span className="text-slate-400 text-[10px]">Malicious</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live System Scan Telemetry Feed Table */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
            Live System Scan Stream Table
          </h3>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
            REAL-TIME FIRESTORE STREAM ({scans.length} SCANS)
          </span>
        </div>

        {scans.length === 0 ? (
          <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
            No system scans recorded yet. Perform a scan in any PhishGuard tool or click "Submit Live Scan (+1)" above.
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default PhishGuardLiveScansPage;
