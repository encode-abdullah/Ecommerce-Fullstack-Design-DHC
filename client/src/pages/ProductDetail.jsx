import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useCartStore, useWishlistStore } from '../context/store'
import { FiHeart, FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi'
import Rating from '../components/ui/Rating.jsx'
import { TextSkeleton } from '../components/ui/Skeleton.jsx'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore(state => state.addItem)
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`)
        setProduct(data)
      } catch (error) {
        console.error('Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addItem({ product, quantity })
  }

  const handleWishlist = () => {
    const isWishlisted = wishlist.some(i => i._id === product._id)
    if (isWishlisted) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <TextSkeleton lines={5} />
      </div>
    )
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="relative h-96 bg-surface rounded-xl overflow-hidden">
          <img 
            src={product.images[0] || '/placeholder.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleWishlist}
            className={`absolute top-4 right-4 p-3 rounded-full ${
              wishlist.some(i => i._id === product._id) ? 'bg-primary' : 'bg-gray-800/50'
            } transition`}
          >
            <FiHeart className={`w-5 h-5 ${wishlist.some(i => i._id === product._id) ? 'text-background' : 'text-text'}`} />
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, i) => (
            <img 
              key={i}
              src={img}
              alt={`${product.name} ${i + 1}`}
              className="h-20 object-cover rounded cursor-pointer hover:opacity-80"
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        
        <div className="flex items-center space-x-4">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          <span className="text-sm text-muted">Brand: {product.brand}</span>
        </div>

        <p className="text-3xl font-bold text-primary">${product.price}</p>

        <p className="text-muted">{product.description}</p>

        <div className="border-t border-gray-700 pt-4">
          <h3 className="font-semibold mb-3">Specifications</h3>
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-700">
                  <td className="py-2 text-muted">{key}</td>
                  <td className="py-2 font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="p-2 rounded-lg bg-surface hover:bg-gray-700"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              className="p-2 rounded-lg bg-surface hover:bg-gray-700"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-muted">{product.stock} in stock</span>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center space-x-2 bg-primary text-background py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
          <Link 
            to="/cart"
            className="flex-1 flex items-center justify-center space-x-2 bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <span>Buy Now</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail