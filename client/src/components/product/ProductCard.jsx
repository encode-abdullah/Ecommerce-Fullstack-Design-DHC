import { Link } from 'react-router-dom'
import Rating from '../ui/Rating.jsx'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useCartStore, useWishlistStore } from '../../context/store'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const addItem = useCartStore(state => state.addItem)
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore()
  const [isWishlisted, setIsWishlisted] = useState(wishlist.some(i => i._id === product._id))

  const handleWishlist = (e) => {
    e.preventDefault()
    if (isWishlisted) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product)
    }
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem({ product, quantity: 1 })
  }

  return (
    <article className="bg-black rounded-lg overflow-hidden group transition-transform hover:scale-[1.02] border border-red-900/30">
      <Link to={`/products/${product._id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.images[0] || '/placeholder.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <button
            type="button"
            onClick={handleWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isWishlisted ? 'bg-red-500' : 'bg-black/50 border border-red-900/40'
            } transition`}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <FiHeart className={`w-4 h-4 ${isWishlisted ? 'text-white' : 'text-red-200'}`} aria-hidden="true" />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-red-500 font-bold mb-2">${product.price}</p>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-4 w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 transition"
          >
            <FiShoppingCart className="w-4 h-4" aria-hidden="true" />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
