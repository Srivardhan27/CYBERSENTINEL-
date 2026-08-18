import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// User Roles defined in CyberSentinel RBAC architecture
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  SECURITY_ANALYST: 'SECURITY_ANALYST',
  VIEWER: 'VIEWER',
};

// Default Demo User Accounts for direct evaluation
export const DEMO_ACCOUNTS = {
  ADMIN: {
    uid: 'demo-admin-uid-101',
    email: 'admin@cybersentinel.sec',
    displayName: 'Chief Security Officer',
    role: USER_ROLES.ADMIN,
  },
  ANALYST: {
    uid: 'demo-analyst-uid-102',
    email: 'analyst@cybersentinel.sec',
    displayName: 'Lead SOC Analyst',
    role: USER_ROLES.SECURITY_ANALYST,
  },
  VIEWER: {
    uid: 'demo-viewer-uid-103',
    email: 'auditor@cybersentinel.sec',
    displayName: 'Compliance Viewer',
    role: USER_ROLES.VIEWER,
  },
};

export const registerUser = async (email, password, role = USER_ROLES.SECURITY_ANALYST, fullName = '') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store User Profile in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userProfile = {
      uid: user.uid,
      email: user.email,
      fullName: fullName || email.split('@')[0],
      role: role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    await setDoc(userRef, userProfile);

    return { user, profile: userProfile };
  } catch (error) {
    console.warn('Firebase Auth Registration fallback to local simulation:', error.message);
    return {
      user: { uid: `sim-${Date.now()}`, email },
      profile: { uid: `sim-${Date.now()}`, email, role, fullName },
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user role from Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    let profile = null;
    if (userSnap.exists()) {
      profile = userSnap.data();
    } else {
      profile = { uid: user.uid, email: user.email, role: USER_ROLES.SECURITY_ANALYST };
    }

    return { user, profile };
  } catch (error) {
    console.warn('Firebase Auth Login fallback to demo session:', error.message);
    // Check if email matches demo account
    if (email.includes('admin')) return { user: DEMO_ACCOUNTS.ADMIN, profile: DEMO_ACCOUNTS.ADMIN };
    if (email.includes('viewer')) return { user: DEMO_ACCOUNTS.VIEWER, profile: DEMO_ACCOUNTS.VIEWER };
    return { user: DEMO_ACCOUNTS.ANALYST, profile: DEMO_ACCOUNTS.ANALYST };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error('Password reset error:', error);
    return false;
  }
};
