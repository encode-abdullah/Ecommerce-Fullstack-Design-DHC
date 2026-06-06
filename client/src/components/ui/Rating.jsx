import { FiStar } from 'react-icons/fi'

const Rating = ({ value, text, readOnly = false, onRatingChange }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`w-4 h-4 cursor-${readOnly ? 'default' : 'pointer'} ${
            star <= value ? 'text-primary fill-primary' : 'text-red-900/40'
          }`}
          onClick={() => !readOnly && onRatingChange && onRatingChange(star)}
        />
      ))}
      {text && <span className="ml-2 text-sm text-muted">{text}</span>}
    </div>
  )
}

export default Rating