import React, { useState, useEffect } from 'react';
import { getUserReviews } from '../services/reviewService';
import { getMovie } from '../services/movieService';
import { Review, Movie } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/common/ReviewCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Film, Star, User } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<(Review & { movie?: Movie })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        const reviewsData = await getUserReviews(user.id);
        const reviewsWithMovies = await Promise.all(
          reviewsData.map(async (review) => {
            try {
              const movie = await getMovie(review.movieId);
              return { ...review, movie };
            } catch {
              return review;
            }
          })
        );
        reviewsWithMovies.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReviews(reviewsWithMovies);
      } catch (err) {
        console.error('Error fetching user reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserReviews();
  }, [user]);

  const chartData = reviews.map((review) => ({
    title: review.movie?.title || `Movie #${review.movieId}`,
    rating: review.rating,
  }));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-lg">Please log in to view your dashboard.</p>
          <Link
            to="/login"
            className="mt-4 inline-block px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-red-600 rounded-full p-3">
              <User className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}'s Dashboard</h1>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center space-x-4">
            <Star className="text-red-500 w-8 h-8" />
            <div>
              <p className="text-gray-400 text-sm">Total Reviews</p>
              <p className="text-2xl font-bold">{reviews.length}</p>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center space-x-4">
            <Film className="text-red-500 w-8 h-8" />
            <div>
              <p className="text-gray-400 text-sm">Movies Reviewed</p>
              <p className="text-2xl font-bold">
                {[...new Set(reviews.map((r) => r.movieId))].length}
              </p>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center space-x-4">
            <Star className="text-red-500 w-8 h-8" />
            <div>
              <p className="text-gray-400 text-sm">Average Rating</p>
              <p className="text-2xl font-bold">
                {reviews.length > 0
                  ? (
                      reviews.reduce((acc, r) => acc + r.rating, 0) /
                      reviews.length
                    ).toFixed(1)
                  : '0.0'}
              </p>
            </div>
          </div>
        </div>

        {/* Ratings Chart */}
        <div className="bg-gray-900 rounded-lg p-6 mb-10 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Ratings by Movie</h2>
          {chartData.length > 0 ? (
            <div style={{ width: '100%', height: 260 }} className="bg-gray-800 rounded-lg shadow-inner p-4">
              <ResponsiveContainer>
                <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 30, bottom: 40 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#f87171" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 5]} allowDecimals={false} stroke="#f3f4f6" label={{ value: 'Rating', position: 'insideBottom', offset: -10, fill: '#f3f4f6', fontWeight: 500 }} tick={{ fill: '#f3f4f6', fontWeight: 500 }} />
                  <YAxis dataKey="title" type="category" stroke="#f3f4f6" width={120} tick={{ fill: '#f3f4f6', fontWeight: 500 }} label={{ value: 'Movies', angle: -90, position: 'insideLeft', fill: '#f3f4f6', fontWeight: 500 }} />
                  <Tooltip contentStyle={{ background: '#1f2937', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 500 }} cursor={{ fill: '#ef444420' }} />
                  <Bar dataKey="rating" fill="url(#barGradient)" radius={[0, 12, 12, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-400">No ratings available to show chart.</p>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Your Recent Reviews</h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : reviews.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>You haven't reviewed any movies yet.</p>
              <Link
                to="/movies"
                className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Browse Movies to Review
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.slice(0, 5).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
