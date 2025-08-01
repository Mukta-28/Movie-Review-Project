// src/pages/MovieDetailPage.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie } from '../services/movieService';
import { getReviewsByMovie, createReview } from '../services/reviewService';
import { Movie, Review, ReviewFormData } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ReviewForm from '../components/movie/ReviewForm';
import ReviewCard from '../components/common/ReviewCard';
import { useAuth } from '../contexts/AuthContext';
import { Clock, Film } from 'lucide-react';
import toast from 'react-hot-toast';
import RatingStars from '../components/common/RatingStars';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = id ? parseInt(id) : NaN;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [isLoadingMovie, setIsLoadingMovie] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [movieLoadError, setMovieLoadError] = useState(false);
  const [reviewsLoadError, setReviewsLoadError] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const { isLoggedIn, user } = useAuth();
  const reviewFormRef = useRef<HTMLDivElement>(null);

  // Redirect if movieId is invalid (NaN)
  useEffect(() => {
    if (isNaN(movieId)) {
      navigate('/movies');
      return;
    }
  }, [movieId, navigate]);

  // Fetch movie details
  useEffect(() => {
    if (isNaN(movieId)) return;

    const fetchMovie = async () => {
      setIsLoadingMovie(true);
      setMovieLoadError(false);
      try {
        const movieData = await getMovie(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie:', error);
        toast.error('Failed to load movie details');
        setMovieLoadError(true);
      } finally {
        setIsLoadingMovie(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  // Fetch reviews only after movie is successfully loaded
  useEffect(() => {
    if (!movie) return;

    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      setReviewsLoadError(false);
      try {
        const reviewsData = await getReviewsByMovie(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to load reviews');
        setReviewsLoadError(true);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [movie, movieId]);

  // Memoized userId for efficiency
  const userId = user?.id;

  // Memoized check if user already reviewed
  const hasUserReviewed = useMemo(() => {
    if (!userId) return false;
    return reviews.some((r) => r.userId === userId);
  }, [userId, reviews]);

  const handleReviewSubmit = async (data: ReviewFormData) => {
    if (isNaN(movieId) || !isLoggedIn) {
      toast.error('Please log in to submit a review');
      return;
    }
    if (hasUserReviewed) {
      toast.error('You have already submitted a review for this movie.');
      return;
    }

    setIsSubmittingReview(true);
    try {
      const newReview = await createReview(movieId, data); // Make sure token goes in headers in service
      setReviews((prev) => [newReview, ...prev]);
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleReviewClick = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to write a review');
      navigate('/login', { state: { from: { pathname: `/movies/${movieId}` } } });
      return;
    }
    reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Loading or error states for movie
  if (isLoadingMovie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (movieLoadError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to load movie details.</h2>
        <button
          onClick={() => navigate('/movies')}
          className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          aria-label="Back to Movies"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Movie Not Found</h2>
        <p className="text-gray-600">The movie you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/movies')}
          className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          aria-label="Back to Movies"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-12">
      {/* Movie Header */}
      <div className="relative">
        <div className="absolute inset-0 h-[500px] overflow-hidden">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={`${movie.title} backdrop`}
              className="w-full h-full object-cover blur-sm opacity-30"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <Film className="h-16 w-16 text-gray-500" aria-label="No backdrop available" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <div className="md:w-1/3">
              <div className="w-full aspect-[2/3] rounded-lg overflow-hidden shadow-xl border border-gray-800 bg-gray-900">
                {movie.posterUrl ? (
                  <img
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Film className="h-16 w-16 text-gray-500" aria-label="No poster available" />
                  </div>
                )}
              </div>
            </div>

            {/* Movie Info */}
            <div className="md:w-2/3">
              <div className="flex items-center mb-2">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {movie.genre}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">{movie.title}</h1>

              {movie.averageRating !== null && movie.averageRating !== undefined ? (
                <div className="flex items-center mb-6" aria-label={`Average rating ${movie.averageRating.toFixed(1)} out of 5`}>
                  <RatingStars rating={movie.averageRating} size="md" />
                  <span className="ml-2 font-medium text-red-400">
                    {movie.averageRating.toFixed(1)} / 5
                  </span>
                </div>
              ) : (
                <div className="flex items-center mb-6 text-gray-400">
                  No ratings yet
                </div>
              )}

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">{movie.description}</p>

              <button
                onClick={handleReviewClick}
                disabled={isSubmittingReview}
                aria-label="Write a Review"
                className={`px-6 py-3 bg-red-600 text-white rounded-md font-medium transition flex items-center hover:bg-red-700 shadow-md ${isSubmittingReview ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Reviews</h2>
          <div className="flex items-center text-gray-400">
            <Clock className="h-5 w-5 mr-2" aria-hidden="true" />
            <span>Latest reviews first</span>
          </div>
        </div>

        {/* Review Form */}
        {isLoggedIn && !hasUserReviewed && (
          <div ref={reviewFormRef} className="scroll-mt-8">
            <ReviewForm onSubmit={handleReviewSubmit} isSubmitting={isSubmittingReview} />
          </div>
        )}

        {isLoggedIn && hasUserReviewed && (
          <div className="text-center mb-8 text-green-500 font-medium" role="alert">
            You have already submitted a review for this movie.
          </div>
        )}

        {/* Reviews List */}
        <div className="mt-8">
          {isLoadingReviews ? (
            <div className="py-8 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : reviewsLoadError ? (
            <div className="text-center text-red-600 font-medium py-8">
              Failed to load reviews.
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-900 rounded-lg shadow-md border border-gray-800">
              <p className="text-gray-400 text-lg mb-4">No reviews yet. Be the first to review!</p>
              {isLoggedIn ? (
                <button
                  onClick={handleReviewClick}
                  aria-label="Write the first review"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Write a Review
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login', { state: { from: { pathname: `/movies/${movieId}` } } })}
                  aria-label="Login to write a review"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Login to Write Review
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
