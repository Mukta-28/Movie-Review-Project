import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo } from 'react';
import { User } from '../types';
import { getUser, setAuth, clearAuth } from '../utils/auth';
import { login as loginService, register as registerService } from '../services/authService';
import { LoginCredentials, RegisterData } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await loginService(credentials);
      setAuth(response.token, response.user);
      setUser(response.user);
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error('Invalid email or password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await registerService(userData);
      setAuth(response.token, response.user);
      setUser(response.user);
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    toast.success('Successfully logged out');
  };

  const isLoggedIn = useMemo(() => !!user, [user]);
  const isAdmin = useMemo(() => !!user && user.role === 'ADMIN', [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        isAdmin,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
