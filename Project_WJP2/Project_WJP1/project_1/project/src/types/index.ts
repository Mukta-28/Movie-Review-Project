
// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';  // User role for authorization
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Register data now includes role so admin can be created via registration form/backend
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
  adminKey?: string; // 👈 This must match backend DTO field name
}

  

// Movie Types
export interface Movie {
  id: number;
  title: string;
  genre: string;
  description: string;
  releaseDate: string;     // ISO date string format preferred
  posterUrl: string;
  averageRating?: number;  // Optional average rating of the movie
}



export interface MovieFormData {
  title: string;
  genre: string;
  description: string;
  releaseDate: string;
  posterUrl: string;
}

export interface Review {
  id: number;
  movieId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;          // ✅ FIXED: should always be a string
  createdAt: string;
}

export interface ReviewFormData {
  rating: number;
  comment: string;          // ✅ FIXED: should be a string
}

// Notification Types
export interface Notification {
  id: number;
  userId: number;
  reviewId: number;
  isRead: boolean;
  createdAt: string;
  review?: Review;          // Optional detailed review info
  movie?: Movie;            // Optional detailed movie info
}
