import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userData: any;
  role: string | null;
  login: (userData: any) => void;
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
  const [userData, setUserData] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setRole(parsedData.role || null);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: any) => {
    setUserData(userData);
    setRole(userData.role || null);
    setIsAuthenticated(true);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUserData(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
