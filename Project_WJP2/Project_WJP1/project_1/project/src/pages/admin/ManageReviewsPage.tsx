import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllReviews, deleteReview } from '../../services/reviewService';
import { getMovies } from '../../services/movieService';
import { Review, Movie } from '../../types';
import { Eye, Trash2, Star } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const ManageReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [reviewsData, moviesData] = await Promise.all([getAllReviews(), getMovies()]);
        console.log('Fetched reviews:', reviewsData); // Debug: Check if userName is present
        setReviews(reviewsData);
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to load reviews');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteReview = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      try {
        setDeletingId(id);
        await deleteReview(id);
        setReviews((prev) => prev.filter((review) => review.id !== id));
        toast.success('Review deleted successfully');
      } catch (error) {
        console.error('Error deleting review:', error);
        toast.error('Failed to delete review');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const getMovieTitle = (movieId: number) => {
    const movie = movies.find((m) => m.id === movieId);
    return movie ? movie.title : `Movie #${movieId}`;
  };

  const filteredReviews = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return reviews.filter((review) => {
      const movieTitle = getMovieTitle(review.movieId).toLowerCase();
      const userName = review.userName ? review.userName.toLowerCase() : '';
      const comment = review.comment ? String(review.comment).toLowerCase() : '';

      return (
        movieTitle.includes(search) ||
        userName.includes(search) ||
        comment.includes(search)
      );
    });
  }, [reviews, movies, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white mb-4 sm:mb-0">Manage Reviews</h2>
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search reviews..."
            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-black text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No reviews found</p>
      ) : filteredReviews.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No reviews match your search</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Movie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Review</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {review.userName ? review.userName : 'Unknown User'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{getMovieTitle(review.movieId)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm text-white">{review.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white truncate max-w-xs" title={review.comment ?? 'No comment'}>
                      {review.comment ?? 'No comment'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link
                        to={`/movies/${review.movieId}`}
                        className="text-primary-600 hover:text-primary-400"
                        title="View Movie"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className={`text-accent-600 hover:text-accent-400 ${deletingId === review.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Delete Review"
                        disabled={deletingId === review.id}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageReviewsPage;
