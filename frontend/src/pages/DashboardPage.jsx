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
  Radio,
  Globe2,
  Zap,
  Lock,
  CheckCircle2
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

const MOCK_ATTACK_STREAMS = [
  { id: 'ATK-101', origin: '185.220.101.5 (Tor / Moscow Node)', target: '10.0.0.12 (PROD-DB-01)', vector: 'SSH Brute Force (T1110)', status: 'ACTIVE BLOCKED', severity: 'CRITICAL' },
  { id: 'ATK-102', origin: '45.33.32.156 (Ashburn USA)', target: '10.0.2.14 (K8S-NODE-02)', vector: 'SYN Port Scan (T1046)', status: 'MONITORED', severity: 'HIGH' },
  { id: 'ATK-103', origin: '103.253.41.88 (Tokyo Node)', target: '10.0.4.88 (WORKSTATION-04)', vector: 'Encoded PowerShell (T1059.001)', status: 'CONTAINED', severity: 'CRITICAL' },
  { id: 'ATK-104', origin: '194.26.29.112 (Frankfurt)', target: 'user.target@corp.internal', vector: 'PhishGuard Credential Link (T1566.002)', status: 'BLOCKED BY AI', severity: 'HIGH' },
];

const DashboardPage = () => {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [postureLevel, setPostureLevel] = useState('ELEVATED');
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeActions, setActiveActions] = useState([]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 600);
  };

  const handleTriggerAction = (actionName) => {
    if (!activeActions.includes(actionName)) {
      setActiveActions([...activeActions, actionName]);
    }
  };

  const filteredEvents = MOCK_RECENT_EVENTS.filter((event) => {
    if (filterSeverity === 'ALL') return true;
    return event.severity === filterSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Top Cyber Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c182b] to-slate-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40 glow-cyan">
              LIVE SOC STREAM
            </span>
            <span className="text-xs font-mono text-slate-400">
              System Sync: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <h2 className="text-2xl font-bold font-mono text-white tracking-tight uppercase">
            Global Security Operations Command
          </h2>
          <p className="text-xs text-slate-400">
            Real-time threat monitoring, ML anomaly detection, and correlation telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Posture Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 px-2 uppercase">Posture:</span>
            {['NORMAL', 'ELEVATED', 'SEVERE'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setPostureLevel(lvl)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                  postureLevel === lvl
                    ? lvl === 'SEVERE'
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <button
            onClick={handleSync}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Feed</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-400 font-mono text-xs font-bold glow-red">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>RISK SCORE: 78/100</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
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
          subtitle={`${MOCK_DASHBOARD_STATS.phishingBlocked} Phishing Vectors Blocked`}
        />
        <StatCard
          title="Threat Posture Status"
          value={postureLevel}
          icon={Activity}
          color="amber"
          subtitle="Defensive posture level"
        />
      </div>

      {/* Live Global Threat Matrix & Attack Vectors */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              Live Cyber Attack Telemetry Matrix & Vector Streams
            </h3>
            <p className="text-xs text-slate-400">
              Active incoming attack origins targeting internal network subnets
            </p>
          </div>
          <span className="text-xs font-mono text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded border border-rose-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            4 ACTIVE VECTOR STREAMS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {MOCK_ATTACK_STREAMS.map((atk) => (
            <div
              key={atk.id}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-2"
            >
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-cyan-400 font-bold">{atk.id}</span>
                <StatusBadge level={atk.severity} />
              </div>
              <p className="text-xs font-mono font-semibold text-slate-200 truncate">{atk.vector}</p>
              <div className="text-[11px] font-mono text-slate-400 space-y-0.5">
                <p className="truncate">Src: <span className="text-rose-300">{atk.origin}</span></p>
                <p className="truncate">Dst: <span className="text-cyan-300">{atk.target}</span></p>
              </div>
              <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono">
                <span className="text-emerald-400 font-bold">{atk.status}</span>
                <Link to="/ai-analyst" className="text-cyan-400 hover:underline flex items-center gap-0.5">
                  Brief <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 24-Hour Alert Volume Timeline */}
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

      {/* MITRE ATT&CK & Quick Action Remediation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <h3 className="text-sm font-bold font-mono text-white mb-1">
            Top MITRE ATT&CK Techniques Triggered
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Most frequent adversary tactics mapped over past 24 hours
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

        {/* Interactive Quick Action Controls */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                One-Click SOC Incident Controls
              </h3>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                ACTIVE CONTROLS
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Trigger automated defensive countermeasures across perimeter gateways
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => handleTriggerAction('isolate_db')}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-rose-500/40 flex items-center justify-between transition-all"
              >
                <div className="text-left">
                  <p className="text-xs font-mono font-bold text-slate-200">Isolate Compromised Host 10.0.0.12</p>
                  <p className="text-[11px] font-mono text-slate-400">Trigger NAC network quarantine script</p>
                </div>
                {activeActions.includes('isolate_db') ? (
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> ISOLATED
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded bg-rose-950 text-rose-400 text-[10px] font-mono font-bold border border-rose-500/30">
                    TRIGGER
                  </span>
                )}
              </button>

              <button
                onClick={() => handleTriggerAction('block_c2')}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-rose-500/40 flex items-center justify-between transition-all"
              >
                <div className="text-left">
                  <p className="text-xs font-mono font-bold text-slate-200">Block C2 IP 185.220.101.5</p>
                  <p className="text-[11px] font-mono text-slate-400">Push rule to pfSense Edge Firewall</p>
                </div>
                {activeActions.includes('block_c2') ? (
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> BLOCKED
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded bg-rose-950 text-rose-400 text-[10px] font-mono font-bold border border-rose-500/30">
                    TRIGGER
                  </span>
                )}
              </button>

              <button
                onClick={() => handleTriggerAction('enforce_mfa')}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-all"
              >
                <div className="text-left">
                  <p className="text-xs font-mono font-bold text-slate-200">Enforce Mandatory MFA Policy</p>
                  <p className="text-[11px] font-mono text-slate-400">Revoke active Kerberos auth tickets</p>
                </div>
                {activeActions.includes('enforce_mfa') ? (
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> ENFORCED
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
                    ENFORCE
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">PhishGuard Engine: Active</span>
            <Link to="/phishguard" className="text-cyan-400 hover:underline flex items-center gap-1">
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
                <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-cyan-400">{evt.id}</td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{evt.timestamp}</td>
                  <td className="py-3 px-3">
                    <StatusBadge level={evt.severity} />
                  </td>
                  <td className="py-3 px-3 font-sans font-medium text-slate-200">{evt.title}</td>
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
                    <Link to="/alerts" className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-cyan-400 inline-block">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
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
