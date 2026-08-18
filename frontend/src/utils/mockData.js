// Synthetic/Demo SOC Telemetry Data for CyberSentinel Phase 1

export const MOCK_DASHBOARD_STATS = {
  totalAssets: 1248,
  activeAlerts: 42,
  criticalAlerts: 7,
  openIncidents: 3,
  criticalVulnerabilities: 12,
  iocMatches: 89,
  phishingScansTotal: 158,
  phishingBlocked: 34,
  overallThreatLevel: 'ELEVATED', // LOW, GUARDED, ELEVATED, HIGH, SEVERE
  overallRiskScore: 78, // 0-100
};

export const MOCK_SEVERITY_BREAKDOWN = [
  { name: 'Critical', value: 7, color: '#ff3366' },
  { name: 'High', value: 14, color: '#ffaa00' },
  { name: 'Medium', value: 16, color: '#00f0ff' },
  { name: 'Low', value: 5, color: '#00ff88' },
];

export const MOCK_ALERT_TIMELINE = [
  { time: '00:00', critical: 1, high: 2, medium: 4, low: 2 },
  { time: '03:00', critical: 0, high: 1, medium: 3, low: 1 },
  { time: '06:00', critical: 2, high: 3, medium: 2, low: 3 },
  { time: '09:00', critical: 3, high: 5, medium: 6, low: 4 },
  { time: '12:00', critical: 1, high: 4, medium: 5, low: 2 },
  { time: '15:00', critical: 4, high: 6, medium: 8, low: 5 },
  { time: '18:00', critical: 2, high: 3, medium: 4, low: 3 },
  { time: '21:00', critical: 1, high: 2, medium: 3, low: 1 },
];

export const MOCK_MITRE_TECHNIQUES = [
  { id: 'T1110', name: 'Brute Force', count: 48, tactic: 'Credential Access' },
  { id: 'T1046', name: 'Network Scanning', count: 37, tactic: 'Discovery' },
  { id: 'T1566.002', name: 'Spearphishing Link', count: 29, tactic: 'Initial Access' },
  { id: 'T1059.001', name: 'PowerShell Execution', count: 21, tactic: 'Execution' },
  { id: 'T1078', name: 'Valid Accounts Abuse', count: 18, tactic: 'Defense Evasion' },
];

export const MOCK_RECENT_EVENTS = [
  {
    id: 'ALT-8902',
    timestamp: '2026-08-18 12:35:10',
    severity: 'CRITICAL',
    title: 'Multiple Failed SSH Auth Attempts (Brute Force)',
    sourceIp: '192.168.1.105',
    destIp: '10.0.0.12',
    rule: 'R-SSH-BRUTE',
    mitre: 'T1110',
    status: 'NEW',
  },
  {
    id: 'ALT-8901',
    timestamp: '2026-08-18 12:31:44',
    severity: 'HIGH',
    title: 'Suspicious PowerShell Script Execution (Encoded Command)',
    sourceIp: '10.0.4.88',
    destIp: '10.0.4.88',
    rule: 'R-POWERSHELL-ENCODED',
    mitre: 'T1059.001',
    status: 'INVESTIGATING',
  },
  {
    id: 'ALT-8900',
    timestamp: '2026-08-18 12:28:15',
    severity: 'CRITICAL',
    title: 'PhishGuard AI Flagged Malicious Credential Harvesting Email',
    sourceIp: '185.220.101.5',
    destIp: 'user.target@corp.internal',
    rule: 'R-PHISH-CREDENTIAL',
    mitre: 'T1566.002',
    status: 'CONTAINED',
  },
  {
    id: 'ALT-8899',
    timestamp: '2026-08-18 12:15:02',
    severity: 'MEDIUM',
    title: 'Internal Subnet Port Scanning (SYN Scan Detected)',
    sourceIp: '10.0.2.14',
    destIp: '10.0.2.0/24',
    rule: 'R-PORT-SCAN-SYN',
    mitre: 'T1046',
    status: 'NEW',
  },
  {
    id: 'ALT-8898',
    timestamp: '2026-08-18 11:59:30',
    severity: 'LOW',
    title: 'Unusual Outbound TLS Handshake to Low-Reputation IP',
    sourceIp: '10.0.3.45',
    destIp: '45.33.32.156',
    rule: 'R-IOC-IP-MALICIOUS',
    mitre: 'T1071.001',
    status: 'RESOLVED',
  },
];
