import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './config';

// 15 Standard Firestore Collections in CyberSentinel Architecture
export const COLLECTIONS = {
  USERS: 'users',
  ASSETS: 'assets',
  LOGS: 'logs',
  ALERTS: 'alerts',
  INCIDENTS: 'incidents',
  IOCS: 'iocs',
  VULNERABILITIES: 'vulnerabilities',
  MITRE_TECHNIQUES: 'mitreTechniques',
  THREAT_INTEL: 'threatIntelligence',
  RISK_ASSESSMENTS: 'riskAssessments',
  PHISHING_SCANS: 'phishingScans',
  NETWORK_EVENTS: 'networkEvents',
  REPORTS: 'reports',
  AUDIT_LOGS: 'auditLogs',
  DETECTION_RULES: 'detectionRules',
};

// Generic Collection Fetcher
export const getCollectionDocs = async (collectionName, maxItems = 50) => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, limit(maxItems));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn(`Firestore read warning for ${collectionName}:`, error.message);
    return [];
  }
};

// Real-Time Document Listener
export const subscribeToCollection = (collectionName, callback, maxItems = 20) => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, limit(maxItems));
    return onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        callback(data);
      },
      (error) => {
        console.warn(`Firestore real-time listener fallback for ${collectionName}:`, error.message);
      }
    );
  } catch (error) {
    console.warn(`Error setting up real-time listener for ${collectionName}`);
    return () => {};
  }
};

// Add Document to Firestore
export const addDocument = async (collectionName, data) => {
  try {
    const colRef = collection(db, collectionName);
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const docRef = await addDoc(colRef, payload);
    return { id: docRef.id, ...payload };
  } catch (error) {
    console.warn(`Firestore write fallback for ${collectionName}:`, error.message);
    return { id: `sim-${Date.now()}`, ...data, createdAt: new Date().toISOString() };
  }
};

// Audit Log Helper
export const logAuditEvent = async (user, action, resource, details = {}) => {
  const auditEntry = {
    user: user?.email || 'system@sentinel.sec',
    role: user?.role || 'SYSTEM',
    action,
    resource,
    details,
    timestamp: new Date().toISOString(),
  };
  return await addDocument(COLLECTIONS.AUDIT_LOGS, auditEntry);
};
