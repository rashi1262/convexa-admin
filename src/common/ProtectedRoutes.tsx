import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: any) => void;  // Pass user data when logging in
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);  // State to hold user data

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));  // Parse and set user data if available
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setUserData(userData);  // Store user data in state
    localStorage.setItem('userData', JSON.stringify(userData));  // Store user data in localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);  // Clear user data from state
    localStorage.removeItem('userData');  // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
