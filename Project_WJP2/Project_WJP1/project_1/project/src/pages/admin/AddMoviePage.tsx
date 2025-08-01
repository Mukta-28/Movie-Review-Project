import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../../services/movieService';
import { MovieFormData } from '../../types';
import MovieForm from '../../components/admin/MovieForm';
import toast from 'react-hot-toast';

const AddMoviePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: MovieFormData) => {
    setIsSubmitting(true);
    try {
      await createMovie(data);
      toast.success('Movie added successfully!');
      navigate('/admin/movies');
    } catch (error) {
      console.error('Error adding movie:', error);
      toast.error('Failed to add movie');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-6">Add New Movie</h2>
      <MovieForm onSubmit={handleSubmit} isSubmitting={isSubmitting} buttonText="Add Movie" />
    </div>
  );
};

export default AddMoviePage;
