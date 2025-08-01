import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/movieService';
import { Movie } from '../types';
import MovieGrid from '../components/movie/MovieGrid';
import { Search, Filter } from 'lucide-react';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
  }, []);
  
  useEffect(() => {
    // Filter movies based on search term and selected genre
    let result = movies;
    
    if (searchTerm) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedGenre) {
      result = result.filter(movie => movie.genre === selectedGenre);
    }
    
    setFilteredMovies(result);
  }, [searchTerm, selectedGenre, movies]);
  
  // Get unique genres from movies
  const genres = [...new Set(movies.map(movie => movie.genre))].sort();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Browse Movies</h1>
      
      <div className="mb-8 bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search movies by title or description..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-900 text-gray-200 placeholder-gray-400 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* <div className="md:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
        </div>
      </div>
      
      <MovieGrid movies={filteredMovies} isLoading={isLoading} />
    </div>
  );
};

export default MoviesPage;