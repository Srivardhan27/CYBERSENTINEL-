import React, { useState } from 'react';
import { Radio, Search, ShieldCheck, AlertTriangle, ExternalLink, RefreshCw, Database } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const MOCK_INTEL_FEEDS = [
  {
    id: 'IOC-9901',
    indicator: '185.220.101.5',
    type: 'IP',
    source: 'VirusTotal / Tor Exit Node',
    reputation: 'MALICIOUS',
    score: 94,
    category: 'C2 Command & Control',
    lastUpdated: '2026-08-18 12:45:10',
  },
  {
    id: 'IOC-9902',
    indicator: 'malicious-login-portal-verify.com',
    type: 'DOMAIN',
    source: 'PhishGuard AI Feed',
    reputation: 'MALICIOUS',
    score: 92,
    category: 'Credential Harvesting',
    lastUpdated: '2026-08-18 12:30:00',
  },
  {
    id: 'IOC-9903',
    indicator: '45.33.32.156',
    type: 'IP',
    source: 'AbuseIPDB Mass Scanner',
    reputation: 'SUSPICIOUS',
    score: 68,
    category: 'Network Recon / SYN Scan',
    lastUpdated: '2026-08-18 12:15:22',
  },
  {
    id: 'IOC-9904',
    indicator: 'c2-beacon-subdomain.internal-net.ru',
    type: 'DOMAIN',
    source: 'EmergingThreats Ruleset',
    reputation: 'MALICIOUS',
    score: 98,
    category: 'APT29 Infrastructure',
    lastUpdated: '2026-08-18 11:50:00',
  },
  {
    id: 'IOC-9905',
    indicator: '8.8.8.8',
    type: 'IP',
    source: 'Google Public DNS',
    reputation: 'BENIGN',
    score: 0,
    category: 'Legitimate Infrastructure',
    lastUpdated: '2026-08-18 10:00:00',
  },
];

const ThreatIntelPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [intelList, setIntelList] = useState(MOCK_INTEL_FEEDS);

  const filteredFeeds = intelList.filter(
    (item) =>
      item.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white">Global Threat Intelligence Feed Integration</h2>
            <p className="text-xs text-slate-400">Multi-source indicator aggregation from VirusTotal, AbuseIPDB, CISA KEV, and PhishGuard AI.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            FEEDS ACTIVE: 4/4
          </span>
        </div>
      </div>

      {/* Intelligence Search Bar */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search indicator IP, domain, category, or feed source..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Threat Feeds Table */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 bg-slate-950/40">
                <th className="py-2.5 px-3">Indicator ID</th>
                <th className="py-2.5 px-3">Indicator Value</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Reputation</th>
                <th className="py-2.5 px-3">Threat Category</th>
                <th className="py-2.5 px-3">Intelligence Source</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">Last Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filteredFeeds.map((feed) => (
                <tr key={feed.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-cyan-400">{feed.id}</td>
                  <td className="py-3 px-3 font-bold text-slate-100">{feed.indicator}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {feed.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge level={feed.reputation} />
                  </td>
                  <td className="py-3 px-3 text-slate-200">{feed.category}</td>
                  <td className="py-3 px-3 text-slate-400">{feed.source}</td>
                  <td className="py-3 px-3 font-bold text-rose-400">{feed.score}/100</td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{feed.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThreatIntelPage;
