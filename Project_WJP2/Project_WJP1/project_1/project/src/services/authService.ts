import api from './api';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types/index';

// Login user
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Store token in localStorage
    localStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Register user
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    // userData should contain name, email, password, role, secretKey (if used)
    const response = await api.post<AuthResponse>('/auth/register', userData);

    // Store token in localStorage
    localStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Get current user details from backend
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    // Include auth header automatically if api instance is set up correctly with interceptors
    const response = await api.get<User>('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Logout function (utility)
export const logout = () => {
  localStorage.removeItem('token');
};
