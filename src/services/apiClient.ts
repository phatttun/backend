/**
 * API Client - Axios instance with JWT interceptor
 * Automatically attaches JWT token to all requests
 */

import axios from 'axios';
import tokenManager from '@/utils/tokenManager';

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor - Attach JWT token to all requests
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    console.log(`[apiClient] ${config.method?.toUpperCase()} ${config.url} - Token: ${token ? 'Present (' + token.substring(0, 20) + '...)' : 'Missing'}`);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('[apiClient] No token found for request');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Handle authentication errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized, clear token and redirect to login
    if (error.response?.status === 401) {
      tokenManager.clearToken();
      // Dispatch custom event for auth context to handle logout
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
