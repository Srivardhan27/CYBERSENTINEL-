import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Server,
  AlertTriangle,
  Flame,
  Bug,
  Binary,
  Sparkles,
  Activity,
  ArrowUpRight,
  Filter,
  RefreshCw,
  Clock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_SEVERITY_BREAKDOWN,
  MOCK_ALERT_TIMELINE,
  MOCK_MITRE_TECHNIQUES,
  MOCK_RECENT_EVENTS,
} from '../utils/mockData';

const DashboardPage = () => {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const filteredEvents = MOCK_RECENT_EVENTS.filter((event) => {
    if (filterSeverity === 'ALL') return true;
    return event.severity === filterSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c182b] to-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              LIVE SOC STREAM
            </span>
            <span className="text-xs font-mono text-slate-400">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <h2 className="text-xl font-bold font-mono text-white mt-1">
            Global Security Operations Command
          </h2>
          <p className="text-xs text-slate-400">
            Real-time threat monitoring, ML anomaly detection, and correlation telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Feed</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>RISK SCORE: {MOCK_DASHBOARD_STATS.overallRiskScore}/100</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Monitored Assets"
          value={MOCK_DASHBOARD_STATS.totalAssets.toLocaleString()}
          icon={Server}
          color="cyan"
          subtitle="Cloud & On-Prem endpoints"
          trend="+12 this week"
        />
        <StatCard
          title="Active Alerts"
          value={MOCK_DASHBOARD_STATS.activeAlerts}
          icon={ShieldAlert}
          color="amber"
          subtitle="Unresolved detection events"
          trend="+5 in last hour"
        />
        <StatCard
          title="Critical Alerts"
          value={MOCK_DASHBOARD_STATS.criticalAlerts}
          icon={AlertTriangle}
          color="red"
          subtitle="Immediate action required"
          highlight={true}
        />
        <StatCard
          title="Open Incidents"
          value={MOCK_DASHBOARD_STATS.openIncidents}
          icon={Flame}
          color="red"
          subtitle="Active SOC escalations"
        />
        <StatCard
          title="Critical Vulnerabilities"
          value={MOCK_DASHBOARD_STATS.criticalVulnerabilities}
          icon={Bug}
          color="purple"
          subtitle="CVSS score > 9.0"
        />
        <StatCard
          title="IOC Malicious Matches"
          value={MOCK_DASHBOARD_STATS.iocMatches}
          icon={Binary}
          color="cyan"
          subtitle="Threat Intel hits"
        />
        <StatCard
          title="PhishGuard AI Scans"
          value={MOCK_DASHBOARD_STATS.phishingScansTotal}
          icon={Sparkles}
          color="green"
          subtitle={`${MOCK_DASHBOARD_STATS.phishingBlocked} Phishing Attacks Blocked`}
        />
        <StatCard
          title="Threat Level Status"
          value={MOCK_DASHBOARD_STATS.overallThreatLevel}
          icon={Activity}
          color="amber"
          subtitle="Defensive posture level"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 24-Hour Alert Volume Timeline (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                24-Hour Alert Ingestion Timeline
              </h3>
              <p className="text-xs text-slate-400">
                Breakdown of security events ingested per 3-hour window
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ALERT_TIMELINE}>
                <defs>
                  <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff3366" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff3366" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffaa00" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ffaa00" stopOpacity={0} />
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
                <Area
                  type="monotone"
                  dataKey="critical"
                  stroke="#ff3366"
                  fillOpacity={1}
                  fill="url(#colorCritical)"
                  name="Critical"
                />
                <Area
                  type="monotone"
                  dataKey="high"
                  stroke="#ffaa00"
                  fillOpacity={1}
                  fill="url(#colorHigh)"
                  name="High"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Distribution Donut Chart */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <h3 className="text-sm font-bold font-mono text-white mb-1">
            Severity Breakdown
          </h3>
          <p className="text-xs text-slate-400 mb-4">Distribution of active alerts</p>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_SEVERITY_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_SEVERITY_BREAKDOWN.map((entry, index) => (
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
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            {MOCK_SEVERITY_BREAKDOWN.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-mono text-slate-300">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MITRE ATT&CK Frequency & Threat Intelligence Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <h3 className="text-sm font-bold font-mono text-white mb-1">
            Top MITRE ATT&CK Techniques Triggered
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Most frequent adversary tactics mapped over the past 24 hours
          </p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_MITRE_TECHNIQUES} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis
                  dataKey="id"
                  type="category"
                  stroke="#64748b"
                  fontSize={11}
                  fontFamily="monospace"
                  width={75}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
                <Bar dataKey="count" fill="#00f0ff" radius={[0, 4, 4, 0]} name="Hits" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                PhishGuard AI Telemetry Summary
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                ACCURACY: 98.4%
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Multimodal email, URL, website & smishing detection stats
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-slate-200">Email Phishing Analyzed</p>
                  <p className="text-[11px] text-slate-400">92 suspicious messages scanned</p>
                </div>
                <span className="text-sm font-bold font-mono text-rose-400">21 Flagged</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-slate-200">URL & QR Phishing Scans</p>
                  <p className="text-[11px] text-slate-400">46 external links inspected</p>
                </div>
                <span className="text-sm font-bold font-mono text-amber-400">9 Malicious</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-slate-200">Smishing & Vishing Audio</p>
                  <p className="text-[11px] text-slate-400">20 transcripts processed</p>
                </div>
                <span className="text-sm font-bold font-mono text-cyan-400">4 High Risk</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Engine: BERT + Random Forest</span>
            <Link
              to="/phishguard"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              Open PhishGuard <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Real-time Security Event Feed Table */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold font-mono text-white">
              Recent Security Events & Alert Feed
            </h3>
            <p className="text-xs text-slate-400">
              Normalized stream of telemetry alerts from local SOC detectors
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-mono text-slate-400">Filter:</span>
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterSeverity(lvl)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold transition-colors ${
                  filterSeverity === lvl
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 bg-slate-950/40">
                <th className="py-2.5 px-3">Alert ID</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Event Description</th>
                <th className="py-2.5 px-3">Source IP</th>
                <th className="py-2.5 px-3">Rule / MITRE</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filteredEvents.map((evt) => (
                <tr
                  key={evt.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="py-3 px-3 font-semibold text-cyan-400">{evt.id}</td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    {evt.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge level={evt.severity} />
                  </td>
                  <td className="py-3 px-3 font-sans font-medium text-slate-200">
                    {evt.title}
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono">{evt.sourceIp}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                      {evt.mitre} ({evt.rule})
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge level={evt.status} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-cyan-400">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
