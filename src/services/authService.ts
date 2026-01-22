/**
 * Authentication API Service
 * Handles login and authentication-related API calls
 */

import apiClient from './apiClient';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email?: string;
    fullName?: string;
  };
  expiresIn: number;
}

export interface AuthApiService {
  login: (username: string, password: string) => Promise<LoginResponse>;
}

const authService: AuthApiService = {
  /**
   * Login with username and password
   * @param username - Employee ID or username
   * @param password - Password
   * @returns Promise with token and user data
   */
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        username,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Login failed. Please try again.',
        status: error.response?.status,
        error,
      };
    }
  },
};

export default authService;
