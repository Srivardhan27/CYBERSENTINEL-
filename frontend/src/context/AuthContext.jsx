import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { loginUser, logoutUser, DEMO_ACCOUNTS, USER_ROLES } from '../firebase/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(DEMO_ACCOUNTS.ADMIN); // Default to ADMIN for interactive exploration
  const [role, setRole] = useState(USER_ROLES.ADMIN);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const profile = userDoc.data();
            setCurrentUser({ ...user, ...profile });
            setRole(profile.role || USER_ROLES.SECURITY_ANALYST);
          } else {
            setCurrentUser(user);
            setRole(USER_ROLES.SECURITY_ANALYST);
          }
        } catch (e) {
          console.warn('Firebase Auth State listener using active demo state.');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const switchDemoAccount = (targetRole) => {
    if (targetRole === USER_ROLES.ADMIN) {
      setCurrentUser(DEMO_ACCOUNTS.ADMIN);
      setRole(USER_ROLES.ADMIN);
    } else if (targetRole === USER_ROLES.VIEWER) {
      setCurrentUser(DEMO_ACCOUNTS.VIEWER);
      setRole(USER_ROLES.VIEWER);
    } else {
      setCurrentUser(DEMO_ACCOUNTS.ANALYST);
      setRole(USER_ROLES.SECURITY_ANALYST);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    const result = await loginUser(email, password);
    if (result && result.profile) {
      setCurrentUser(result.profile);
      setRole(result.profile.role || USER_ROLES.SECURITY_ANALYST);
    }
    setLoading(false);
    return result;
  };

  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setRole(null);
  };

  // RBAC Permission checks
  const isAdmin = role === USER_ROLES.ADMIN;
  const isAnalyst = role === USER_ROLES.SECURITY_ANALYST || role === USER_ROLES.ADMIN;
  const isViewer = Boolean(role);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        loading,
        login,
        logout,
        switchDemoAccount,
        isAdmin,
        isAnalyst,
        isViewer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
