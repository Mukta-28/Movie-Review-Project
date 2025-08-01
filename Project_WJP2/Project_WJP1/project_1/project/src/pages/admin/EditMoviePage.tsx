import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie, updateMovie } from '../../services/movieService';
import { Movie, MovieFormData } from '../../types';
import MovieForm from '../../components/admin/MovieForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const EditMoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      
      try {
        const movieData = await getMovie(parseInt(id));
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie:', error);
        toast.error('Failed to load movie');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovie();
  }, [id]);
  
  const handleSubmit = async (data: MovieFormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await updateMovie(parseInt(id), data);
      toast.success('Movie updated successfully!');
      navigate('/admin/movies');
    } catch (error) {
      console.error('Error updating movie:', error);
      toast.error('Failed to update movie');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="bg-gray-900 rounded-lg shadow-md p-8 text-center border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Movie Not Found</h2>
        <p className="text-gray-400 mb-6">
          The movie you're trying to edit doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/admin/movies')}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-md"
        >
          Back to Movies
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-6">Edit Movie: {movie.title}</h2>
      
      <MovieForm 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
        initialData={movie}
        buttonText="Update Movie"
      />
    </div>
  );
};

export default EditMoviePage;