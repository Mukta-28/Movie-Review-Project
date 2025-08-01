// import React, { useState, useEffect } from 'react';
// import { getMovies } from '../services/movieService';
// import { Movie } from '../types';
// import MovieGrid from '../components/movie/MovieGrid';
// import { ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import chhavaVideo from '../components/movie/Chhaava.mp4';
import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/movieService';
import { Movie } from '../types';
//import MovieGrid from '../components/movie/MovieGrid';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// import of video file
import shershahVideo from '../components/movie/Mufasa_ The Lion King _ Official Trailer.mp4';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <p className="text-accent-600 text-lg">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={shershahVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Reduced opacity overlay for clearer video */}
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Discover and Review <span className="text-red-600">Your Favorite Movies</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of movie enthusiasts. Browse movies, read reviews, and share your
              own opinions on the films you love (or hate).
            </p>
            <Link
              to="/movies"
              className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 rounded-md font-medium transition text-white text-lg"
            >
              Explore Movies <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* ... rest of your page ... */}
    </>
  );
};

export default HomePage;
