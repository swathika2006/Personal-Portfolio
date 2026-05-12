// ============================================
// Auth Context — JWT Authentication management
// ============================================
import { createContext, useContext, useEffect, useState } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

/**
 * Custom hook to access auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Auth Provider — manages JWT token and user state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get('/auth/me');
        setUser(res.data.data);
      } catch (error) {
        // Token is invalid — clear it
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  /**
   * Login — store token and user data
   */
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  /**
   * Logout — clear token and user data
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
