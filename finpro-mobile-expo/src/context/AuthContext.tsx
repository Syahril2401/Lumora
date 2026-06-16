import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, removeToken, getBaseUrl } from '../services/api';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string | null;
  setIsLoggedIn: (value: boolean) => void;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  token: null,
  setIsLoggedIn: () => {},
  setToken: () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          // Verify if token is actually valid
          try {
            const baseUrl = getBaseUrl();
            // We use standard fetch here to avoid circular dependency with apiRequest
            const res = await fetch(`${baseUrl}/api/auth/me`, {
              headers: { 'Authorization': `Bearer ${storedToken}` }
            });
            if (res.ok) {
              setIsLoggedIn(true);
              setTokenState(storedToken);
            } else {
              await removeToken();
            }
          } catch (e) {
            // Network error but token might be valid, let them in for now
            setIsLoggedIn(true);
            setTokenState(storedToken);
          }
        }
      } catch (error) {
        console.log('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await removeToken();
    setIsLoggedIn(false);
    setTokenState(null);
  };

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      setIsLoggedIn(true);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, token, setIsLoggedIn, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
