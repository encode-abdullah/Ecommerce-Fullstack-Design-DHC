import { Link } from 'react-router-dom'
import Rating from '../ui/Rating.jsx'

const ProductListCard = ({ product }) => {
  return (
    <div className="bg-surface rounded-lg overflow-hidden flex flex-col sm:flex-row">
      <Link to={`/products/${product._id}`} className="sm:w-48 flex-shrink-0">
        <img 
          src={product.images[0] || '/placeholder.jpg'} 
          alt={product.name}
          className="w-full h-48 sm:h-full object-cover"
        />
      </Link>
      
      <div className="p-4 flex-grow">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        </Link>
        <p className="text-muted text-sm mb-2 line-clamp-2">{product.description}</p>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <p className="text-primary font-bold mt-2">${product.price}</p>
      </div>
    </div>
  )
}

export default ProductListCard