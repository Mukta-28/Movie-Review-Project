import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboardPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/movies')) {
      setActiveTab('movies');
    } else if (path.includes('/admin/reviews')) {
      setActiveTab('reviews');
    } else if (path.includes('/admin/add-movie')) {
      setActiveTab('add-movie');
    } else {
      setActiveTab('overview');
    }
  }, [location]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You don't have permission to access the admin dashboard.</p>
          <Link
            to="/"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-lg mb-6 text-gray-300">
          Manage movies, reviews, and other content from the control panel below.
        </p>

        {/* Navigation Tabs */}
        <div className="bg-gray-900 rounded-lg shadow-md mb-6">
          <div className="flex overflow-x-auto">
            <Link
              to="/admin"
              className={`px-6 py-4 text-base font-medium transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-b-4 border-red-500 text-red-500 bg-gray-800'
                  : 'text-gray-300 hover:text-red-400 border-b-4 border-transparent'
              }`}
            >
              Overview
            </Link>
            <Link
              to="/admin/movies"
              className={`px-6 py-4 text-base font-medium transition-all whitespace-nowrap ${
                activeTab === 'movies'
                  ? 'border-b-4 border-red-500 text-red-500 bg-gray-800'
                  : 'text-gray-300 hover:text-red-400 border-b-4 border-transparent'
              }`}
            >
              Movies
            </Link>
            <Link
              to="/admin/reviews"
              className={`px-6 py-4 text-base font-medium transition-all whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-b-4 border-red-500 text-red-500 bg-gray-800'
                  : 'text-gray-300 hover:text-red-400 border-b-4 border-transparent'
              }`}
            >
              Reviews
            </Link>
            <Link
              to="/admin/add-movie"
              className={`px-6 py-4 text-base font-medium transition-all whitespace-nowrap ${
                activeTab === 'add-movie'
                  ? 'border-b-4 border-red-500 text-red-500 bg-gray-800'
                  : 'text-gray-300 hover:text-red-400 border-b-4 border-transparent'
              }`}
            >
              Add Movie
            </Link>
          </div>
        </div>

        {/* Content area */}
        <div className="bg-gray-950 p-6 rounded-lg shadow-md text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
