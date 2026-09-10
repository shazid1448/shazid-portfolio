/**
 * Auth Context: React context provider for managing admin login session state persistently across tabs and reloads
 */

import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize admin state directly from localStorage if present
  const [admin, setAdmin] = useState(() => {
    try {
      const savedUser = localStorage.getItem('adminUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  /**
   * Validates active admin session with backend without clearing session on temporary network issues
   */
  useEffect(() => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('shazid_admin_token');
    
    if (token) {
      API.get('/auth/me')
        .then(res => {
          if (res.data.success && res.data.admin) {
            setAdmin(res.data.admin);
            localStorage.setItem('adminUser', JSON.stringify(res.data.admin));
          }
        })
        .catch(err => {
          // Only clear session if server explicitly returns 401 Unauthorized
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('shazid_admin_token');
            localStorage.removeItem('adminUser');
            setAdmin(null);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  /**
   * Synchronizes tab storage events so logging in/out in one tab updates all active browser tabs instantly
   */
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'adminUser') {
        if (e.newValue) {
          try { setAdmin(JSON.parse(e.newValue)); } catch (err) {}
        } else {
          setAdmin(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Authenticates admin credentials, saves returned JWT token & user profile to localStorage, and sets admin state
   */
  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.success) {
      const token = res.data.token;
      const adminData = res.data.admin;

      localStorage.setItem('adminToken', token);
      localStorage.setItem('shazid_admin_token', token);
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      
      setAdmin(adminData);
      return res.data;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  /**
   * Explicitly clears admin JWT token & saved state from localStorage and logs out admin session
   */
  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('shazid_admin_token');
    localStorage.removeItem('adminUser');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
