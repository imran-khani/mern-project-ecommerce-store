import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the AuthContextType interface for better type safety
interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, isAdmin: boolean) => void;
  logout: () => void;
  token: string | null; // Add token to the context
}

// Define the AuthProviderProps for type safety in the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Check localStorage on mount to maintain authentication state across refreshes
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedAdminStatus = localStorage.getItem('isAdmin') === 'true';

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      setIsAdmin(storedAdminStatus);
    }
  }, []);

  // Login function that stores the token and updates state
  const login = (token: string, admin: boolean) => {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', admin.toString());
    setToken(token);
    setIsAuthenticated(true);
    setIsAdmin(admin);
  };

  // Logout function that clears localStorage and updates state
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setToken(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
