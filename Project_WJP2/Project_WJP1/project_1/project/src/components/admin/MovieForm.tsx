import React from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { MovieFormData, Movie } from '../../types';

interface MovieFormProps {
  onSubmit: (data: MovieFormData) => void;
  isSubmitting: boolean;
  buttonText?: string;
  initialData?: Movie;
}

const MovieForm: React.FC<MovieFormProps> = ({
  onSubmit,
  isSubmitting,
  buttonText = 'Save Movie',
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormData>({
    defaultValues: initialData ?? {
      title: '',
      genre: '',
      description: '',
      posterUrl: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">
          Movie Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title', {
            required: 'Title is required',
            maxLength: 100,
          })}
          className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200 placeholder-gray-400"
        />
        {errors.title && <p className="text-accent-600 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-200 mb-1">
          Genre
        </label>
        <select
          id="genre"
          {...register('genre', { required: 'Genre is required' })}
          className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200"
        >
          <option value="">Select a genre</option>
          {[
            'Action', 'Adventure', 'Animation', 'Biography', 'Comedy','ComedyDrama' ,'Crime',
            'Drama', 'Fantasy','Historic', 'Horror', 'Mystery', 'Romance','romCom', 'Sci-Fi', 'Thriller'
          ].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        {errors.genre && <p className="text-accent-600 text-sm mt-1">{errors.genre.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 20, message: 'At least 20 characters' },
          })}
          className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200 placeholder-gray-400"
        />
        {errors.description && <p className="text-accent-600 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="posterUrl" className="block text-sm font-medium text-gray-200 mb-1">
          Poster URL
        </label>
        <input
          id="posterUrl"
          type="url"
          {...register('posterUrl', {
            required: 'Poster URL is required',
            pattern: {
              value: /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/,
              message: 'Enter a valid image URL',
            },
          })}
          placeholder="https://example.com/movie.jpg" 
          className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200 placeholder-gray-400"
        />
        {errors.posterUrl && <p className="text-accent-600 text-sm mt-1">{errors.posterUrl.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center justify-center disabled:opacity-70 shadow-md"
      >
        {isSubmitting ? 'Processing...' : (
          <>
            <Save className="h-4 w-4 mr-2" /> {buttonText}
          </>
        )}
      </button>
    </form>
  );
};

export default MovieForm;