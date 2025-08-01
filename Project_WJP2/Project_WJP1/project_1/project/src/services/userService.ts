import api from './api';
import { User } from '../types';

// Fetch all users (for AdminOverview mapping)
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/users');  // Make sure your backend has this API
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
};
