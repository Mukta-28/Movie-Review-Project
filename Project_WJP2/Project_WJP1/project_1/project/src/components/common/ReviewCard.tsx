import React from 'react';
import { Review } from '../../types';
import RatingStars from './RatingStars';
import { format } from 'date-fns';
import { User, Calendar, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ReviewCardProps {
  review: Review;
  onDelete?: (reviewId: number) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete }) => {
  const { isAdmin } = useAuth();

  // Format the date if createdAt exists
  const formattedDate = review.createdAt
    ? format(new Date(review.createdAt), 'PPP') // Example: Jan 1, 2024
    : '';

  return (
    <article className="bg-gray-800 p-4 rounded-lg shadow mb-4 animate-fade-in" aria-label={`Review by ${review.userName || 'User'}`}>
      <header className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="bg-gray-700 rounded-full p-2 mr-3" aria-hidden="true">
            <User className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-medium text-white">{review.userName || 'Anonymous'}</h4>
            <div className="flex items-center space-x-2">
              <RatingStars rating={review.rating} size="sm" />
              {formattedDate && (
                <time dateTime={review.createdAt} className="flex items-center text-gray-400 text-xs">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formattedDate}
                </time>
              )}
            </div>
          </div>
        </div>

        {isAdmin && onDelete && (
          <button
            onClick={() => onDelete(review.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            aria-label={`Delete review by ${review.userName || 'user'}`}
            title="Delete review"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </header>

      <p className="mt-2 text-gray-200 whitespace-pre-line">{review.comment}</p>
    </article>
  );
};

export default ReviewCard;
