import React, { createContext, useContext, useState, useCallback } from 'react';
import { apiUrl } from '../config/api';

const TOKEN_KEY = 'kitchensaratov_admin_jwt';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const authenticated = Boolean(token);

  const login = useCallback(async (password) => {
    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (!data?.token) return false;
      try {
        sessionStorage.setItem(TOKEN_KEY, data.token);
      } catch {
        /* private mode */
      }
      setToken(data.token);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* private mode */
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
