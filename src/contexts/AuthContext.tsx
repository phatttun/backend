/**
 * Authentication Context
 * Provides authentication state and methods to all components
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import tokenManager from '@/utils/tokenManager';
import authService from '@/services/authService';

export interface User {
  id: string;
  username: string;
  email?: string;
  fullName?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 * Wraps the app and provides auth context
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize auth state from stored token
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const tokenData = tokenManager.getTokenData();
        if (tokenData) {
          setToken(tokenData.token);
          setUser(tokenData.user);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Listen for unauthorized events (401 responses)
   */
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  /**
   * Handle login
   */
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(username, password);

      // Store token and user data
      tokenManager.setToken(response.token, response.user, response.expiresIn);
      setToken(response.token);
      setUser(response.user);
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle logout
   */
  const logout = () => {
    tokenManager.clearToken();
    setToken(null);
    setUser(null);
    setError(null);
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
