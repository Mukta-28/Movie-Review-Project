import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index);
    }
  };
  
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = interactive
          ? starValue <= (hoverRating || rating)
          : starValue <= rating;
          
        return (
          <button
            key={index}
            type="button"
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} p-0.5 focus:outline-none`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isFilled
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;