/**
 * Token Manager - Handles JWT storage and retrieval
 * Uses memory storage with optional localStorage fallback for security
 */

interface TokenData {
  token: string;
  user: {
    id: string;
    username: string;
    email?: string;
  };
  expiresAt: number;
}

class TokenManager {
  private static instance: TokenManager;
  private memoryStorage: TokenData | null = null;
  private readonly storageKey = 'auth_token_data';
  private readonly useSecureStorage = true; // Use memory-first approach

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  /**
   * Store token and user data
   * Strategy: Store in memory primarily, optional localStorage for persistence
   */
  setToken(token: string, user: TokenData['user'], expiresIn: number): void {
    const expiresAt = Date.now() + expiresIn * 1000;
    const tokenData: TokenData = { token, user, expiresAt };

    console.log('[tokenManager] setToken called:', { user: user.id, expiresIn, token: token.substring(0, 20) + '...' });

    // Store in memory
    this.memoryStorage = tokenData;

    // Optional: Also store in localStorage for persistence across page refresh
    try {
      if (this.useSecureStorage) {
        localStorage.setItem(this.storageKey, JSON.stringify(tokenData));
        console.log('[tokenManager] Token stored in localStorage');
      }
    } catch (error) {
      console.warn('Failed to store token in localStorage:', error);
    }
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    const data = this.getTokenData();
    const token = data?.token ?? null;
    console.log(`[tokenManager] getToken called - ${token ? 'Found (' + token.substring(0, 20) + '...)' : 'Not found'}`);
    return token;
  }

  /**
   * Get user info
   */
  getUser(): TokenData['user'] | null {
    const data = this.getTokenData();
    return data?.user ?? null;
  }

  /**
   * Get complete token data
   */
  getTokenData(): TokenData | null {
    // Check memory first
    if (this.memoryStorage) {
      if (!this.isTokenExpired(this.memoryStorage.expiresAt)) {
        return this.memoryStorage;
      }
      // Token expired, clear it
      this.memoryStorage = null;
    }

    // Try to restore from localStorage
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data: TokenData = JSON.parse(stored);
        if (!this.isTokenExpired(data.expiresAt)) {
          this.memoryStorage = data;
          return data;
        }
        // Expired token in storage, remove it
        localStorage.removeItem(this.storageKey);
      }
    } catch (error) {
      console.warn('Failed to retrieve token from storage:', error);
    }

    return null;
  }

  /**
   * Check if token exists and is valid
   */
  isTokenValid(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Clear all stored tokens
   */
  clearToken(): void {
    this.memoryStorage = null;
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.warn('Failed to clear token from localStorage:', error);
    }
  }

  /**
   * Check if token is expired
   */
  private isTokenExpired(expiresAt: number): boolean {
    return Date.now() > expiresAt;
  }

  /**
   * Get time until token expiration in seconds
   */
  getTokenExpiresIn(): number | null {
    const data = this.getTokenData();
    if (!data) return null;
    const expiresIn = Math.floor((data.expiresAt - Date.now()) / 1000);
    return expiresIn > 0 ? expiresIn : null;
  }
}

export default TokenManager.getInstance();
