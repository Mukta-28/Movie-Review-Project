import axios from 'axios';
import { Review, ReviewFormData } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

// Helper that reads the JWT from localStorage and returns a headers object
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token);
  if (!token) throw new Error('User not authenticated');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Create a new review
export const createReview = async (
  movieId: number,
  reviewData: ReviewFormData
): Promise<Review> => {
  const payload = {
    movieId,
    rating: reviewData.rating,
    comment: reviewData.comment.trim(),
  };

  try {
    const response = await axios.post<Review>(
      `${API_BASE_URL}/reviews`,
      payload,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Fetch all reviews for a specific movie (public)
export const getReviewsByMovie = async (
  movieId: number
): Promise<Review[]> => {
  const response = await axios.get<Review[]>(
    `${API_BASE_URL}/reviews/movie/${movieId}`
  );
  return response.data;
};

// Admin: Fetch all reviews
export const getAllReviews = async (): Promise<Review[]> => {
  const response = await axios.get<Review[]>(
    `${API_BASE_URL}/reviews`,
    getAuthHeaders()
  );
  return response.data;
};

// Delete a review by ID (admin or user who created it)
export const deleteReview = async (reviewId: number): Promise<void> => {
  await axios.delete(
    `${API_BASE_URL}/reviews/${reviewId}`,
    getAuthHeaders()
  );
};

// ✅ Fetch reviews created by a specific user
export const getUserReviews = async (userId: number): Promise<Review[]> => {
  const response = await axios.get<Review[]>(
    `${API_BASE_URL}/reviews/user/${userId}`,
    getAuthHeaders()
  );
  return response.data;
};
