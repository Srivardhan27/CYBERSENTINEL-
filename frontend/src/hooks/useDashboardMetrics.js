import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { COLLECTIONS } from '../firebase/firestoreService';

/**
 * Custom React Hook providing real-time, zero-mock SOC Dashboard metrics
 * directly subscribed to Firestore collections via efficient onSnapshot listeners.
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
    // Lifecycle States
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    let unsubAssets, unsubAlerts, unsubIncidents, unsubVulns, unsubIocs, unsubPhish;

    try {
      // 1. Assets Subscription
      const assetsRef = collection(db, COLLECTIONS.ASSETS || 'assets');
      unsubAssets = onSnapshot(
        assetsRef,
        (snapshot) => {
          if (!isMounted) return;
          const docs = snapshot.docs.map((doc) => doc.data());
          const total = docs.length;

          // 7 days ago timestamp
          const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
          const thisWeek = docs.filter((d) => {
            const ts = d.createdAt ? new Date(d.createdAt).getTime() : (d.timestamp ? new Date(d.timestamp).getTime() : 0);
            return ts >= sevenDaysAgo;
          }).length;

          setMetrics((prev) => updateDerivedMetrics({ ...prev, totalAssets: total, assetsThisWeek: thisWeek }));
        },
        (err) => {
          console.error('Firestore assets subscription error:', err);
          if (isMounted) setMetrics((prev) => ({ ...prev, error: err.message }));
        }
      );

      // 2. Alerts Subscription
      const alertsRef = collection(db, COLLECTIONS.ALERTS || 'alerts');
      unsubAlerts = onSnapshot(
        alertsRef,
        (snapshot) => {
          if (!isMounted) return;
          const docs = snapshot.docs.map((doc) => doc.data());
          const activeStatuses = ['NEW', 'OPEN', 'UNRESOLVED', 'ACTIVE', 'INVESTIGATING'];
          const activeDocs = docs.filter((d) => activeStatuses.includes((d.status || '').toUpperCase()));

          const activeCount = activeDocs.length;
          const criticalCount = activeDocs.filter((d) => (d.severity || '').toUpperCase() === 'CRITICAL').length;

          // 60 mins ago timestamp
          const sixtyMinsAgo = Date.now() - 60 * 60 * 1000;
          const lastHourCount = activeDocs.filter((d) => {
            const ts = d.createdAt ? new Date(d.createdAt).getTime() : (d.timestamp ? new Date(d.timestamp).getTime() : 0);
            return ts >= sixtyMinsAgo;
          }).length;

          setMetrics((prev) =>
            updateDerivedMetrics({
              ...prev,
              activeAlerts: activeCount,
              alertsLastHour: lastHourCount,
              criticalAlerts: criticalCount,
            })
          );
        },
        (err) => {
          console.error('Firestore alerts subscription error:', err);
          if (isMounted) setMetrics((prev) => ({ ...prev, error: err.message }));
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

          setMetrics((prev) => updateDerivedMetrics({ ...prev, openIncidents: openCount }));
        },
        (err) => {
          console.error('Firestore incidents subscription error:', err);
          if (isMounted) setMetrics((prev) => ({ ...prev, error: err.message }));
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

          setMetrics((prev) => updateDerivedMetrics({ ...prev, criticalVulnerabilities: criticalCount }));
        },
        (err) => {
          console.error('Firestore vulnerabilities subscription error:', err);
          if (isMounted) setMetrics((prev) => ({ ...prev, error: err.message }));
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

          setMetrics((prev) => updateDerivedMetrics({ ...prev, maliciousIocMatches: maliciousCount }));
        },
        (err) => {
          console.error('Firestore IOCs subscription error:', err);
          if (isMounted) setMetrics((prev) => ({ ...prev, error: err.message }));
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
            const isPhishClass = (d.classification || '').toUpperCase() === 'PHISHING';
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
          console.error('Firestore phishingScans subscription error:', err);
          if (isMounted) setMetrics((prev) => ({ ...prev, loading: false, error: err.message }));
        }
      );
    } catch (err) {
      console.error('Error initializing dashboard real-time metrics:', err);
      if (isMounted) setMetrics((prev) => ({ ...prev, loading: false, error: err.message }));
    }

    return () => {
      isMounted = false;
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
 * Calculates dynamic overall risk score (0-100) and threat level classification
 * based exclusively on real current platform security metrics.
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

  // Composite Formula based on real security events
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
