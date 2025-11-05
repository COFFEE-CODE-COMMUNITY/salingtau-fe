import { useState } from 'react'
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

interface StarRatingProps {
  initialRating?: number
  readonly?: boolean
  size?: number
  showRatingText?: boolean
  onRatingChange?: (rating: number) => void
}

const customStyles = {
  itemShapes: Star,
  activeFillColor: '#facc15',
  inactiveFillColor: '#e5e7eb'
}

export const StarRating = ({
                             initialRating = 0,
                             readonly = true,
                             size = 20,
                             showRatingText = false,
                             onRatingChange
                           }: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating)

  const handleRating = (newRating: number) => {
    setRating(newRating)
    onRatingChange?.(newRating)
  }

  return (
    <div className="flex items-center gap-2">
      <Rating
        value={rating}
        onChange={handleRating}
        readOnly={readonly}
        style={{ maxWidth: size * 5 + 10 }}
        itemStyles={customStyles}
        halfFillMode="svg"
      />
      {showRatingText && (
        <span className="text-sm font-semibold text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}