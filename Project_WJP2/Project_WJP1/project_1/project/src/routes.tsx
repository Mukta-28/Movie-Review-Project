import React from 'react';
import { Navigate, createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminOverview from './pages/admin/AdminOverview';
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import ManageReviewsPage from './pages/admin/ManageReviewsPage';
import AddMoviePage from './pages/admin/AddMoviePage';
import EditMoviePage from './pages/admin/EditMoviePage';
import { isAuthenticated, isAdmin } from './utils/auth';

// Protected Route: only logged-in users can access
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Admin Route: only admin users can access
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: 'movies/:id', element: <MovieDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },

      // User dashboard (for authenticated users)
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <UserDashboardPage />
          </ProtectedRoute>
        ),
      },

      // Admin routes with nested pages
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <AdminOverview /> },
          { path: 'movies', element: <ManageMoviesPage /> },
          { path: 'reviews', element: <ManageReviewsPage /> },
          { path: 'add-movie', element: <AddMoviePage /> },
          { path: 'edit-movie/:id', element: <EditMoviePage /> },
        ],
      },

      // Catch-all for 404 - redirects to home
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
