import { addDocument, getCollectionDocs, COLLECTIONS } from '../firebase/firestoreService';

/**
 * Utility to populate initial real starting telemetry documents in Firestore
 * if the database collections are completely empty.
 */
export const seedInitialTelemetryIfEmpty = async () => {
  try {
    // 1. Check Assets
    const existingAssets = await getCollectionDocs(COLLECTIONS.ASSETS, 1);
    if (existingAssets.length === 0) {
      console.log('Seeding initial assets to Firestore...');
      const initialAssets = [
        { name: 'PROD-DB-01', ip: '10.0.0.12', os: 'Ubuntu 22.04 LTS', type: 'Database Server', riskScore: 88, status: 'ONLINE', createdAt: new Date().toISOString() },
        { name: 'K8S-NODE-02', ip: '10.0.2.14', os: 'Debian 11', type: 'Kubernetes Worker', riskScore: 64, status: 'ONLINE', createdAt: new Date().toISOString() },
        { name: 'WORKSTATION-04', ip: '10.0.4.88', os: 'Windows 11 Enterprise', type: 'Endpoint', riskScore: 92, status: 'COMPROMISED', createdAt: new Date().toISOString() },
        { name: 'WEB-PROXY-01', ip: '10.0.3.45', os: 'Alpine Linux', type: 'Edge Proxy', riskScore: 24, status: 'ONLINE', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
      ];
      for (const item of initialAssets) {
        await addDocument(COLLECTIONS.ASSETS, item);
      }
    }

    // 2. Check Alerts
    const existingAlerts = await getCollectionDocs(COLLECTIONS.ALERTS, 1);
    if (existingAlerts.length === 0) {
      console.log('Seeding initial alerts to Firestore...');
      const initialAlerts = [
        {
          id: 'ALT-8902',
          title: 'Multiple Failed SSH Auth Attempts (Brute Force)',
          sourceIp: '192.168.1.105',
          destIp: '10.0.0.12',
          severity: 'CRITICAL',
          status: 'NEW',
          rule: 'R-SSH-BRUTE',
          mitre: 'T1110',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'ALT-8901',
          title: 'Suspicious PowerShell Script Execution (Encoded Command)',
          sourceIp: '10.0.4.88',
          destIp: '10.0.4.88',
          severity: 'HIGH',
          status: 'INVESTIGATING',
          rule: 'R-POWERSHELL-ENCODED',
          mitre: 'T1059.001',
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        },
        {
          id: 'ALT-8900',
          title: 'PhishGuard AI Flagged Malicious Credential Harvesting Email',
          sourceIp: '185.220.101.5',
          destIp: 'user.target@corp.internal',
          severity: 'CRITICAL',
          status: 'INVESTIGATING',
          rule: 'R-PHISH-CREDENTIAL',
          mitre: 'T1566.002',
          createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        },
        {
          id: 'ALT-8899',
          title: 'Internal Subnet Port Scanning (SYN Scan Detected)',
          sourceIp: '10.0.2.14',
          destIp: '10.0.2.0/24',
          severity: 'MEDIUM',
          status: 'NEW',
          rule: 'R-PORT-SCAN-SYN',
          mitre: 'T1046',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
      ];
      for (const item of initialAlerts) {
        await addDocument(COLLECTIONS.ALERTS, item);
      }
    }

    // 3. Check Incidents
    const existingIncidents = await getCollectionDocs(COLLECTIONS.INCIDENTS, 1);
    if (existingIncidents.length === 0) {
      console.log('Seeding initial incidents to Firestore...');
      const initialIncidents = [
        { title: 'APT29 Spearphishing Campaign & Credential Harvest', severity: 'CRITICAL', status: 'INVESTIGATING', assignedTo: 'Analyst Sarah', createdAt: new Date().toISOString() },
        { title: 'Internal Network Port Sweep on Subnet 10.0.2.0/24', severity: 'HIGH', status: 'NEW', assignedTo: 'Analyst Alex', createdAt: new Date().toISOString() },
        { title: 'SSH Brute Force Attack targeting PROD-DB-01', severity: 'CRITICAL', status: 'ESCALATED', assignedTo: 'SOC Team Alpha', createdAt: new Date().toISOString() },
      ];
      for (const item of initialIncidents) {
        await addDocument(COLLECTIONS.INCIDENTS, item);
      }
    }

    // 4. Check Vulnerabilities
    const existingVulns = await getCollectionDocs(COLLECTIONS.VULNERABILITIES, 1);
    if (existingVulns.length === 0) {
      console.log('Seeding initial vulnerabilities to Firestore...');
      const initialVulns = [
        { cve: 'CVE-2023-38606', title: 'Kernel RCE Elevation of Privilege', cvss: 9.8, severity: 'CRITICAL', affectedAsset: 'PROD-DB-01', status: 'OPEN', createdAt: new Date().toISOString() },
        { cve: 'CVE-2024-21626', title: 'runc Container Breakout Leak', cvss: 9.1, severity: 'CRITICAL', affectedAsset: 'K8S-NODE-02', status: 'OPEN', createdAt: new Date().toISOString() },
        { cve: 'CVE-2023-48795', title: 'Terrapin SSH Transport Protocol Flaw', cvss: 7.5, severity: 'HIGH', affectedAsset: 'WORKSTATION-04', status: 'OPEN', createdAt: new Date().toISOString() },
      ];
      for (const item of initialVulns) {
        await addDocument(COLLECTIONS.VULNERABILITIES, item);
      }
    }

    // 5. Check IOCs
    const existingIocs = await getCollectionDocs(COLLECTIONS.IOCS, 1);
    if (existingIocs.length === 0) {
      console.log('Seeding initial IOCs to Firestore...');
      const initialIocs = [
        { value: '185.220.101.5', type: 'IP', reputation: 'MALICIOUS', riskScore: 94, category: 'C2 Server / Tor Exit Node', createdAt: new Date().toISOString() },
        { value: 'http://malicious-qr-redirect.com/login', type: 'URL', reputation: 'MALICIOUS', riskScore: 92, category: 'Phishing Credential Harvest', createdAt: new Date().toISOString() },
        { value: '44d88612fea8a8f36de82e1278abb02f', type: 'HASH', reputation: 'MALICIOUS', riskScore: 98, category: 'Malware Trojan Payload', createdAt: new Date().toISOString() },
      ];
      for (const item of initialIocs) {
        await addDocument(COLLECTIONS.IOCS, item);
      }
    }

    // 6. Check Phishing Scans
    const existingPhish = await getCollectionDocs(COLLECTIONS.PHISHING_SCANS, 1);
    if (existingPhish.length === 0) {
      console.log('Seeding initial PhishGuard scans to Firestore...');
      const initialPhish = [
        { target: 'admin-update@external-secure-portal.com', type: 'EMAIL', classification: 'PHISHING', risk_score: 95, createdAt: new Date().toISOString() },
        { target: 'http://malicious-qr-redirect.com/login', type: 'QR', classification: 'PHISHING', risk_score: 92, createdAt: new Date().toISOString() },
        { target: 'http://login.secure-online-banking-portal.net', type: 'URL', classification: 'PHISHING', risk_score: 88, createdAt: new Date().toISOString() },
        { target: 'https://www.google.com', type: 'URL', classification: 'LEGITIMATE', risk_score: 5, createdAt: new Date().toISOString() },
      ];
      for (const item of initialPhish) {
        await addDocument(COLLECTIONS.PHISHING_SCANS, item);
      }
    }
  } catch (err) {
    console.warn('Telemetry seeding error:', err);
  }
};
