import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';
import RatingStars from './RatingStars';
import { Film } from 'lucide-react';


interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/movies/${movie.id}`}>
        <div className="relative h-[400px] overflow-hidden">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Film className="h-16 w-16 text-gray-400" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
            <div className="flex items-center justify-between text-white">
              <span className="bg-red-600 px-2 py-1 rounded text-sm">
                {movie.genre}
              </span>
             
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-300 text-sm line-clamp-3 mb-3">{movie.description}</p>
          
          {movie.averageRating && (
            <div className="flex items-center justify-between">
              <RatingStars rating={movie.averageRating} size="sm" />
              <span className="text-sm font-medium text-gray-400">
                {movie.averageRating.toFixed(1)} / 5
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;