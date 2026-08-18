import React, { useState } from 'react';
import { Binary, Search, ShieldAlert, Globe, Server, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const IOCAnalyzerPage = () => {
  const [iocValue, setIocValue] = useState('185.220.101.5');
  const [result, setResult] = useState({
    value: '185.220.101.5',
    ioc_type: 'IP',
    reputation: 'MALICIOUS',
    risk_score: 94,
    threat_category: 'C2 Server / Tor Exit Node',
    first_seen: '2026-08-10 04:12:00',
    last_seen: '2026-08-18 12:30:00',
    virustotal_positives: 42,
    abuseipdb_confidence: 100,
    related_campaigns: ['Operation Cobalt Strike', 'APT29 Recon'],
    related_alerts: ['ALT-8900', 'ALT-8898'],
    mitre_techniques: ['T1071.001', 'T1090'],
  });

  const handleLookup = () => {
    const val = iocValue.trim();
    if (!val) return;

    if (val === '185.220.101.5') {
      setResult({
        value: '185.220.101.5',
        ioc_type: 'IP',
        reputation: 'MALICIOUS',
        risk_score: 94,
        threat_category: 'C2 Server / Tor Exit Node',
        first_seen: '2026-08-10 04:12:00',
        last_seen: '2026-08-18 12:30:00',
        virustotal_positives: 42,
        abuseipdb_confidence: 100,
        related_campaigns: ['Operation Cobalt Strike', 'APT29 Recon'],
        related_alerts: ['ALT-8900', 'ALT-8898'],
        mitre_techniques: ['T1071.001', 'T1090'],
      });
    } else if (val.includes('8.8.8.8')) {
      setResult({
        value: '8.8.8.8',
        ioc_type: 'IP',
        reputation: 'BENIGN',
        risk_score: 0,
        threat_category: 'Public DNS Resolver (Google)',
        first_seen: '2020-01-01 00:00:00',
        last_seen: '2026-08-18 12:40:00',
        virustotal_positives: 0,
        abuseipdb_confidence: 0,
        related_campaigns: [],
        related_alerts: [],
        mitre_techniques: [],
      });
    } else {
      setResult({
        value: val,
        ioc_type: val.includes('.') ? 'DOMAIN' : 'HASH',
        reputation: 'SUSPICIOUS',
        risk_score: 72,
        threat_category: 'Suspicious External Indicator',
        first_seen: '2026-08-15 08:00:00',
        last_seen: '2026-08-18 12:00:00',
        virustotal_positives: 18,
        abuseipdb_confidence: 65,
        related_campaigns: ['Generic CyberSentinel Telemetry Match'],
        related_alerts: ['ALT-8902'],
        mitre_techniques: ['T1566.002'],
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Binary className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">IOC Reputation & Threat Intelligence Analyzer</h2>
            <p className="text-xs text-slate-400">Lookup IP addresses, Domains, URLs, or SHA-256 hashes against threat intelligence databases.</p>
          </div>
        </div>
      </div>

      {/* Lookup Bar */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={iocValue}
            onChange={(e) => setIocValue(e.target.value)}
            placeholder="Enter IP (e.g. 185.220.101.5), Domain, or Hash..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <button
          onClick={handleLookup}
          className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs transition-colors"
        >
          Analyze IOC
        </button>
      </div>

      {/* Results Display */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Card */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">IOC VALUE</span>
              <StatusBadge level={result.reputation} />
            </div>
            <p className="text-lg font-bold font-mono text-cyan-400 break-all">{result.value}</p>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Threat Risk Score:</span>
                <span className="font-bold text-rose-400">{result.risk_score}/100</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">IOC Type:</span>
                <span className="text-slate-200">{result.ioc_type}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Category:</span>
                <span className="text-slate-200">{result.threat_category}</span>
              </div>
            </div>
          </div>

          {/* Intelligence Feeds */}
          <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold font-mono text-white">Threat Intelligence Aggregation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <p className="text-xs font-mono text-slate-400">VirusTotal Detection Ratio</p>
                <p className="text-2xl font-bold font-mono text-rose-400 mt-1">
                  {result.virustotal_positives} / 70 engine hits
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <p className="text-xs font-mono text-slate-400">AbuseIPDB Confidence Score</p>
                <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
                  {result.abuseipdb_confidence}% Malicious Confidence
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <p className="text-xs font-mono text-slate-400">Related Adversary Campaigns & MITRE Techniques:</p>
              <div className="flex flex-wrap gap-2">
                {result.related_campaigns.map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 text-[10px] font-mono border border-rose-500/30">
                    {c}
                  </span>
                ))}
                {result.mitre_techniques.map((m) => (
                  <span key={m} className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                    MITRE {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IOCAnalyzerPage;
