// AdminOverview.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../../services/movieService';
import { getAllReviews } from '../../services/reviewService';
import { getUsers } from '../../services/userService';
import { Movie, Review, User } from '../../types';
import { Film, Star, Users, TrendingUp as Trending, Activity, Pencil } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 mr-1 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

const AdminOverview: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [moviesData, reviewsData, usersData] = await Promise.all([
          getMovies(),
          getAllReviews(),
          getUsers()
        ]);
        setMovies(moviesData);
        setReviews(reviewsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching admin overview data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const uniqueUserIds = new Set(reviews.map(review => review.userId));

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length).toFixed(1)
    : '0.0';

  const movieReviewCounts = movies.map(movie => {
    const count = reviews.filter(review => review.movieId === movie.id).length;
    return { ...movie, reviewCount: count };
  });

  const mostReviewedMovie = movieReviewCounts.length > 0
    ? movieReviewCounts.reduce((prev, current) =>
        (prev.reviewCount > current.reviewCount) ? prev : current
      )
    : null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-gray-800 rounded-full p-3 mr-4">
              <Film className="h-6 w-6 text-primary-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Total Movies</p>
              <p className="text-2xl font-bold text-white">{movies.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-gray-800 rounded-full p-3 mr-4">
              <Star className="h-6 w-6 text-primary-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Total Reviews</p>
              <p className="text-2xl font-bold text-white">{reviews.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-gray-800 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-primary-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-white">{uniqueUserIds.size}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-gray-800 rounded-full p-3 mr-4">
              <Trending className="h-6 w-6 text-primary-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Average Rating</p>
              <p className="text-2xl font-bold text-white">{averageRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/admin/add-movie" className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-white">
            <Film className="h-5 w-5 text-primary-400 mr-3" />
            <span>Add New Movie</span>
          </Link>
          <Link to="/admin/movies" className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-white">
            <Pencil className="h-5 w-5 text-primary-400 mr-3" />
            <span>Edit Movies</span>
          </Link>
          <Link to="/admin/reviews" className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-white">
            <Activity className="h-5 w-5 text-primary-400 mr-3" />
            <span>Manage Reviews</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        {reviews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Movie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {reviews
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((review) => {
                    const movie = movies.find(m => m.id === review.movieId);
                    return (
                      <tr key={review.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {movie ? movie.title : `Movie #${review.movieId}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StarRating rating={review.rating} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">No activity yet</p>
        )}
        <div className="mt-4 text-right">
          <Link to="/admin/reviews" className="text-primary-400 hover:text-primary-200 text-sm font-medium">
            View all activity →
          </Link>
        </div>
      </div>

      {/* Top Movies */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-white mb-4">Top Movies</h2>
        {mostReviewedMovie ? (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Most Reviewed Movie</h3>
            <div className="flex items-center">
              <div className="w-16 h-20 bg-gray-700 rounded overflow-hidden mr-4">
                {mostReviewedMovie.posterUrl ? (
                  <img
                    src={mostReviewedMovie.posterUrl}
                    alt={mostReviewedMovie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Film className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium text-white">{mostReviewedMovie.title}</p>
                <p className="text-sm text-gray-300">{mostReviewedMovie.genre}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">{mostReviewedMovie.reviewCount}</span> reviews
                </p>
              </div>
              <div className="ml-auto">
                <Link to={`/movies/${mostReviewedMovie.id}`} className="text-primary-600 hover:text-primary-400 text-sm">
                  View →
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">No movie data available</p>
        )}
        <div className="mt-4 text-right">
          <Link to="/admin/movies" className="text-primary-600 hover:text-primary-400 text-sm font-medium">
            Manage all movies →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
