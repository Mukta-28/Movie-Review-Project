import api from './api';
import { Movie, MovieFormData } from '../types';

//  Add token to headers if user is logged in
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

//  1. Get all movies
export const getMovies = async (): Promise<Movie[]> => {
  try {
    return (await api.get('/movies')).data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// 2. Get single movie by ID
export const getMovie = async (id: number): Promise<Movie> => {
  try {
    return (await api.get(`/movies/${id}`)).data;
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    throw error;
  }
};

//  3. Create movie (with auth token)
export const createMovie = async (movieData: MovieFormData): Promise<Movie> => {
  try {
    return (await api.post('/movies', movieData, getAuthHeaders())).data;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
};

//  4. Update movie
export const updateMovie = async (id: number, movieData: MovieFormData): Promise<Movie> => {
  try {
    return (await api.put(`/movies/${id}`, movieData, getAuthHeaders())).data;
  } catch (error) {
    console.error(`Error updating movie ${id}:`, error);
    throw error;
  }
};

//  5. Delete movie
export const deleteMovie = async (id: number): Promise<void> => {
  try {
    await api.delete(`/movies/${id}`, getAuthHeaders());
  } catch (error) {
    console.error(`Error deleting movie ${id}:`, error);
    throw error;
  }
};
