import React from 'react';
import { useForm } from 'react-hook-form';
import { ReviewFormData } from '../../types';
import RatingStars from '../common/RatingStars';
import { Send } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void;
  isSubmitting: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const rating = watch('rating');

  const handleRatingChange = (newRating: number) => {
    setValue('rating', newRating);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-900 p-6 rounded-lg shadow-md mb-6 border border-gray-800"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-200">Write a Review</h3>

      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-200 mb-2">
          Your Rating
        </label>
        <input
          id="rating"
          type="hidden"
          {...register('rating', {
            required: 'Rating is required',
            min: { value: 1, message: 'Please select a rating' },
          })}
        />
        <div className="flex items-center">
          <RatingStars
            rating={rating}
            size="lg"
            interactive={true}
            onRatingChange={handleRatingChange}
          />
          {rating > 0 && (
            <span className="ml-2 text-gray-400">
              {rating} {rating === 1 ? 'star' : 'stars'}
            </span>
          )}
        </div>
        {errors.rating && (
          <p className="text-accent-600 text-sm mt-1">{errors.rating.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-200 mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          aria-invalid={!!errors.comment}
          rows={4}
          className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-black text-gray-200 placeholder-gray-400"
          placeholder="Share your thoughts about this movie..."
          {...register('comment', {
            required: 'Review text is required',
            minLength: {
              value: 10,
              message: 'Review must be at least 10 characters',
            },
          })}
        ></textarea>
        {typeof errors.comment?.message === 'string' && (
  <p className="text-accent-600 text-sm mt-1">{errors.comment.message}</p>
)}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
      >
        {isSubmitting ? (
          <>Submitting...</>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" /> Submit Review
          </>
        )}
      </button>
    </form>
  );
};

export default ReviewForm;
