import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { COLLECTIONS } from '../firebase/firestoreService';

/**
 * Custom React Hook providing pure 0-base, real-time SOC Dashboard metrics.
 * Guaranteed zero-delay initialization (loading: false) with instant fallbacks.
 */
export const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    // Assets
    totalAssets: 0,
    assetsThisWeek: 0,
    // Alerts
    activeAlerts: 0,
    alertsLastHour: 0,
    criticalAlerts: 0,
    // Incidents
    openIncidents: 0,
    // Vulnerabilities
    criticalVulnerabilities: 0,
    // IOC Matches
    maliciousIocMatches: 0,
    // PhishGuard Scans
    phishingScans: 0,
    phishingThreatsBlocked: 0,
    // Threat Level & Risk Score
    threatLevel: 'LOW',
    riskScore: 0,
    // Real-Time Graph Data (Default: 0)
    severityBreakdown: [
      { name: 'Critical', value: 0, color: '#ff3366' },
      { name: 'High', value: 0, color: '#ffaa00' },
      { name: 'Medium', value: 0, color: '#00f0ff' },
      { name: 'Low', value: 0, color: '#00ff88' },
    ],
    alertTimeline: [
      { time: '00:00', critical: 0, high: 0, medium: 0, low: 0 },
      { time: '03:00', critical: 0, high: 0, medium: 0, low: 0 },
      { time: '06:00', critical: 0, high: 0, medium: 0, low: 0 },
      { time: '09:00', critical: 0, high: 0, medium: 0, low: 0 },
      { time: '12:00', critical: 0, high: 0, medium: 0, low: 0 },
      { time: '15:00', critical: 0, high: 0, medium: 0, low: 0 },
      { time: '18:00', critical: 0, high: 0, medium: 0, low: 0 },
      { time: '21:00', critical: 0, high: 0, medium: 0, low: 0 },
    ],
    mitreTechniques: [
      { id: 'T1110', name: 'Brute Force', count: 0, tactic: 'Credential Access' },
      { id: 'T1046', name: 'Network Scanning', count: 0, tactic: 'Discovery' },
      { id: 'T1566.002', name: 'Spearphishing Link', count: 0, tactic: 'Initial Access' },
      { id: 'T1059.001', name: 'PowerShell Execution', count: 0, tactic: 'Execution' },
      { id: 'T1078', name: 'Valid Accounts Abuse', count: 0, tactic: 'Defense Evasion' },
    ],
    recentEvents: [],
    // Always initialize loading to false after brief check so UI never gets stuck on '—'
    loading: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    let unsubAssets, unsubAlerts, unsubIncidents, unsubVulns, unsubIocs, unsubPhish;

    // Safety timeout: ensure loading is false within 300ms
    const timer = setTimeout(() => {
      if (isMounted) {
        setMetrics((prev) => ({ ...prev, loading: false }));
      }
    }, 300);

    try {
      // 1. Assets Subscription
      const assetsRef = collection(db, COLLECTIONS.ASSETS || 'assets');
      unsubAssets = onSnapshot(
        assetsRef,
        (snapshot) => {
          if (!isMounted) return;
          const docs = snapshot.docs.map((doc) => ({ _docId: doc.id, ...doc.data() }));
          const total = docs.length;

          const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
          const thisWeek = docs.filter((d) => {
            const ts = d.createdAt ? new Date(d.createdAt).getTime() : (d.timestamp ? new Date(d.timestamp).getTime() : 0);
            return ts >= sevenDaysAgo;
          }).length;

          setMetrics((prev) => updateDerivedMetrics({ ...prev, totalAssets: total, assetsThisWeek: thisWeek, loading: false }));
        },
        (err) => {
          console.warn('Firestore assets snapshot notice:', err.message);
          if (isMounted) setMetrics((prev) => updateDerivedMetrics({ ...prev, loading: false }));
        }
      );

      // 2. Alerts Subscription
      const alertsRef = collection(db, COLLECTIONS.ALERTS || 'alerts');
      unsubAlerts = onSnapshot(
        alertsRef,
        (snapshot) => {
          if (!isMounted) return;
          const docs = snapshot.docs.map((doc) => ({ _docId: doc.id, ...doc.data() }));
          const activeStatuses = ['NEW', 'OPEN', 'UNRESOLVED', 'ACTIVE', 'INVESTIGATING'];
          const activeDocs = docs.filter((d) => activeStatuses.includes((d.status || '').toUpperCase()));

          const activeCount = activeDocs.length;
          const criticalCount = activeDocs.filter((d) => (d.severity || '').toUpperCase() === 'CRITICAL').length;
          const highCount = activeDocs.filter((d) => (d.severity || '').toUpperCase() === 'HIGH').length;
          const mediumCount = activeDocs.filter((d) => (d.severity || '').toUpperCase() === 'MEDIUM').length;
          const lowCount = activeDocs.filter((d) => (d.severity || '').toUpperCase() === 'LOW').length;

          const sixtyMinsAgo = Date.now() - 60 * 60 * 1000;
          const lastHourCount = activeDocs.filter((d) => {
            const ts = d.createdAt ? new Date(d.createdAt).getTime() : (d.timestamp ? new Date(d.timestamp).getTime() : 0);
            return ts >= sixtyMinsAgo;
          }).length;

          const severityBreakdown = [
            { name: 'Critical', value: criticalCount, color: '#ff3366' },
            { name: 'High', value: highCount, color: '#ffaa00' },
            { name: 'Medium', value: mediumCount, color: '#00f0ff' },
            { name: 'Low', value: lowCount, color: '#00ff88' },
          ];

          const timeBuckets = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
          const alertTimeline = timeBuckets.map((t) => {
            const bHour = parseInt(t.split(':')[0]);
            const inBucket = activeDocs.filter((d) => {
              if (!d.createdAt && !d.timestamp) return false;
              const h = new Date(d.createdAt || d.timestamp).getHours();
              return h >= bHour && h < bHour + 3;
            });

            return {
              time: t,
              critical: inBucket.filter((d) => (d.severity || '').toUpperCase() === 'CRITICAL').length,
              high: inBucket.filter((d) => (d.severity || '').toUpperCase() === 'HIGH').length,
              medium: inBucket.filter((d) => (d.severity || '').toUpperCase() === 'MEDIUM').length,
              low: inBucket.filter((d) => (d.severity || '').toUpperCase() === 'LOW').length,
            };
          });

          const mitreCounts = {};
          activeDocs.forEach((d) => {
            if (d.mitre) {
              mitreCounts[d.mitre] = (mitreCounts[d.mitre] || 0) + 1;
            }
          });

          const mitreTechniques = [
            { id: 'T1110', name: 'Brute Force', count: mitreCounts['T1110'] || 0, tactic: 'Credential Access' },
            { id: 'T1046', name: 'Network Scanning', count: mitreCounts['T1046'] || 0, tactic: 'Discovery' },
            { id: 'T1566.002', name: 'Spearphishing Link', count: mitreCounts['T1566.002'] || 0, tactic: 'Initial Access' },
            { id: 'T1059.001', name: 'PowerShell Execution', count: mitreCounts['T1059.001'] || 0, tactic: 'Execution' },
            { id: 'T1078', name: 'Valid Accounts Abuse', count: mitreCounts['T1078'] || 0, tactic: 'Defense Evasion' },
          ];

          setMetrics((prev) =>
            updateDerivedMetrics({
              ...prev,
              activeAlerts: activeCount,
              alertsLastHour: lastHourCount,
              criticalAlerts: criticalCount,
              severityBreakdown,
              alertTimeline,
              mitreTechniques,
              recentEvents: docs.slice(0, 10),
              loading: false,
            })
          );
        },
        (err) => {
          console.warn('Firestore alerts snapshot notice:', err.message);
          if (isMounted) setMetrics((prev) => updateDerivedMetrics({ ...prev, loading: false }));
        }
      );

      // 3. Incidents Subscription
      const incidentsRef = collection(db, COLLECTIONS.INCIDENTS || 'incidents');
      unsubIncidents = onSnapshot(
        incidentsRef,
        (snapshot) => {
          if (!isMounted) return;
          const docs = snapshot.docs.map((doc) => doc.data());
          const openStatuses = ['NEW', 'OPEN', 'INVESTIGATING', 'ESCALATED', 'IN_PROGRESS'];
          const openCount = docs.filter((d) => openStatuses.includes((d.status || '').toUpperCase())).length;

          setMetrics((prev) => updateDerivedMetrics({ ...prev, openIncidents: openCount, loading: false }));
        },
        (err) => {
          console.warn('Firestore incidents snapshot notice:', err.message);
          if (isMounted) setMetrics((prev) => updateDerivedMetrics({ ...prev, loading: false }));
        }
      );

      // 4. Vulnerabilities Subscription
      const vulnsRef = collection(db, COLLECTIONS.VULNERABILITIES || 'vulnerabilities');
      unsubVulns = onSnapshot(
        vulnsRef,
        (snapshot) => {
          if (!isMounted) return;
          const docs = snapshot.docs.map((doc) => doc.data());
          const openStatuses = ['OPEN', 'UNRESOLVED', 'IN_PROGRESS', 'NEW'];
          const criticalCount = docs.filter((d) => {
            const isOpen = openStatuses.includes((d.status || 'OPEN').toUpperCase());
            const isHighCvss = Number(d.cvss || 0) >= 9.0;
            const isCritSev = (d.severity || '').toUpperCase() === 'CRITICAL';
            return isOpen && (isHighCvss || isCritSev);
          }).length;

          setMetrics((prev) => updateDerivedMetrics({ ...prev, criticalVulnerabilities: criticalCount, loading: false }));
        },
        (err) => {
          console.warn('Firestore vulns snapshot notice:', err.message);
          if (isMounted) setMetrics((prev) => updateDerivedMetrics({ ...prev, loading: false }));
        }
      );

      // 5. IOC Matches Subscription
      const iocsRef = collection(db, COLLECTIONS.IOCS || 'iocs');
      unsubIocs = onSnapshot(
        iocsRef,
        (snapshot) => {
          if (!isMounted) return;
          const docs = snapshot.docs.map((doc) => doc.data());
          const maliciousCount = docs.filter((d) => {
            const isMaliciousRep = (d.reputation || '').toUpperCase() === 'MALICIOUS';
            const isHighRisk = Number(d.riskScore || d.risk_score || d.threatScore || 0) >= 75;
            return isMaliciousRep || isHighRisk;
          }).length;

          setMetrics((prev) => updateDerivedMetrics({ ...prev, maliciousIocMatches: maliciousCount, loading: false }));
        },
        (err) => {
          console.warn('Firestore IOCs snapshot notice:', err.message);
          if (isMounted) setMetrics((prev) => updateDerivedMetrics({ ...prev, loading: false }));
        }
      );

      // 6. PhishGuard AI Scans Subscription
      const phishRef = collection(db, COLLECTIONS.PHISHING_SCANS || 'phishingScans');
      unsubPhish = onSnapshot(
        phishRef,
        (snapshot) => {
          if (!isMounted) return;
          const docs = snapshot.docs.map((doc) => doc.data());
          const totalScans = docs.length;
          const blockedCount = docs.filter((d) => {
            const isPhishClass = (d.classification || '').toUpperCase() === 'PHISHING' || (d.classification || '').toUpperCase() === 'MALICIOUS';
            const isHighRisk = Number(d.risk_score || d.riskScore || 0) >= 50;
            return isPhishClass || isHighRisk;
          }).length;

          setMetrics((prev) =>
            updateDerivedMetrics({
              ...prev,
              phishingScans: totalScans,
              phishingThreatsBlocked: blockedCount,
              loading: false,
            })
          );
        },
        (err) => {
          console.warn('Firestore phishingScans snapshot notice:', err.message);
          if (isMounted) setMetrics((prev) => updateDerivedMetrics({ ...prev, loading: false }));
        }
      );
    } catch (err) {
      console.warn('Error initializing dashboard real-time metrics:', err.message);
      if (isMounted) setMetrics((prev) => updateDerivedMetrics({ ...prev, loading: false }));
    }

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (unsubAssets) unsubAssets();
      if (unsubAlerts) unsubAlerts();
      if (unsubIncidents) unsubIncidents();
      if (unsubVulns) unsubVulns();
      if (unsubIocs) unsubIocs();
      if (unsubPhish) unsubPhish();
    };
  }, []);

  return metrics;
};

/**
 * Calculates dynamic overall risk score (0-100) and threat level classification.
 */
function updateDerivedMetrics(current) {
  const {
    activeAlerts = 0,
    criticalAlerts = 0,
    openIncidents = 0,
    criticalVulnerabilities = 0,
    maliciousIocMatches = 0,
    phishingThreatsBlocked = 0,
  } = current;

  let rawScore =
    criticalAlerts * 15 +
    (activeAlerts - criticalAlerts) * 4 +
    openIncidents * 12 +
    criticalVulnerabilities * 8 +
    maliciousIocMatches * 6 +
    phishingThreatsBlocked * 5;

  const riskScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  let threatLevel = 'LOW';
  if (riskScore >= 90) threatLevel = 'CRITICAL';
  else if (riskScore >= 75) threatLevel = 'HIGH';
  else if (riskScore >= 50) threatLevel = 'ELEVATED';
  else if (riskScore >= 25) threatLevel = 'GUARDED';

  return {
    ...current,
    riskScore,
    threatLevel,
    loading: false,
  };
}

export default useDashboardMetrics;
