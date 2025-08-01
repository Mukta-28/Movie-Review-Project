import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovie } from '../../services/movieService';
import { Movie } from '../../types';
import { Pencil, Trash2, Eye, Film } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const ManageMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        toast.error('Failed to load movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleDeleteMovie = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this movie? This action cannot be undone.')) {
      try {
        await deleteMovie(id);
        setMovies(movies.filter(movie => movie.id !== id));
        toast.success('Movie deleted successfully');
      } catch (error) {
        console.error('Error deleting movie:', error);
        toast.error('Failed to delete movie');
      }
    }
  };

  const filteredMovies = movies.filter((movie) =>
    (movie.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (movie.genre?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

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
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          🎬 Manage Movies
        </h2>
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-black text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">🎥 No movies found in your database.</p>
          <Link
            to="/admin/add-movie"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            Add Your First Movie
          </Link>
        </div>
      ) : filteredMovies.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No movies match your search</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Movie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Avg. Rating
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-800 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden bg-gray-800 shadow-sm">
                        {movie.posterUrl ? (
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <Film className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-white">{movie.title}</div>
                        <div className="text-xs text-gray-400">{movie.genre}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {movie.averageRating ? movie.averageRating.toFixed(1) : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link
                        to={`/movies/${movie.id}`}
                        className="text-primary-600 hover:text-primary-400 p-1 rounded-md transition"
                        title="View Movie"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/admin/edit-movie/${movie.id}`}
                        className="text-blue-400 hover:text-blue-200 p-1 rounded-md transition"
                        title="Edit Movie"
                      >
                        <Pencil className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteMovie(movie.id)}
                        className="text-accent-600 hover:text-accent-400 p-1 rounded-md transition"
                        title="Delete Movie"
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

export default ManageMoviesPage;
