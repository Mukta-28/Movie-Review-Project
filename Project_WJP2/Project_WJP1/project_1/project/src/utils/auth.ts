import { User } from '../types';

export const setAuth = (token: string, user: User): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuth = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const isAdmin = (): boolean => {
  const user = getUser();
  return !!user && user.role === 'ADMIN';
};