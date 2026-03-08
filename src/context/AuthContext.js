import React, { createContext, useContext, useState, useCallback } from 'react';

const AUTH_KEY = 'kitchensaratov_admin_auth';

const getAdminPassword = () => {
  try {
    return process.env.REACT_APP_ADMIN_PASSWORD ?? null;
  } catch {
    return null;
  }
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const login = useCallback((password) => {
    const envPassword = getAdminPassword();
    if (envPassword !== null && password === envPassword) {
      setAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {
        /* private mode */
      }
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* private mode */
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
