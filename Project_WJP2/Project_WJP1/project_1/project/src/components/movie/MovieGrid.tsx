import React from 'react';
import { Movie } from '../../types';
import MovieCard from '../common/MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;