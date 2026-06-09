import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCartStore, useWishlistStore } from '../context/store'
import { getProductById } from '../services/api.js'
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
    getProductById(id).then(data => {
      setProduct(data)
      setLoading(false)
    })
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
      <main className="space-y-6">
        <TextSkeleton lines={5} />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="text-center py-12" role="alert">
        <p>Product not found</p>
      </main>
    )
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="relative h-96 bg-black rounded-xl overflow-hidden border border-red-900/20">
          <img 
            src={product.images[0] || '/placeholder.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleWishlist}
            type="button"
            className={`absolute top-4 right-4 p-3 rounded-full ${
              wishlist.some(i => i._id === product._id) ? 'bg-red-600' : 'bg-black/80 border border-red-900/40'
            } transition`}
            aria-label={wishlist.some(i => i._id === product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart className={`w-5 h-5 ${wishlist.some(i => i._id === product._id) ? 'text-white' : 'text-red-200'}`} aria-hidden="true" />
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, i) => (
            <img 
              key={i}
              src={img}
              alt={`${product.name} ${i + 1}`}
              className="h-20 object-cover rounded cursor-pointer hover:opacity-80 border border-red-900/20"
            />
          ))}
        </div>
      </div>

      <section aria-labelledby="product-title" className="space-y-6">
        <h1 id="product-title" className="text-3xl font-bold">{product.name}</h1>
        
        <div className="flex items-center space-x-4">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          <span className="text-sm text-red-300/60">Brand: {product.brand}</span>
        </div>

        <p className="text-3xl font-bold text-red-500">${product.price}</p>

        <p className="text-red-300/60">{product.description}</p>

        <div className="border-t border-red-900/30 pt-4">
          <h2 className="font-semibold mb-3">Specifications</h2>
          <table className="w-full text-sm">
            <caption className="sr-only">Product specifications</caption>
            <tbody>
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <tr key={key} className="border-b border-red-900/20">
                  <th scope="row" className="py-2 text-left text-red-300/60 font-normal">{key}</th>
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
              type="button"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="p-2 rounded-lg bg-black border border-red-900/30 hover:border-red-500"
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              className="p-2 rounded-lg bg-black border border-red-900/30 hover:border-red-500"
              aria-label="Increase quantity"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-red-300/60">{product.stock} in stock</span>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-500 transition"
          >
            <FiShoppingCart className="w-5 h-5" aria-hidden="true" />
            <span>Add to Cart</span>
          </button>
          <Link 
            to="/cart"
            className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition"
          >
            <span>Buy Now</span>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ProductDetail
