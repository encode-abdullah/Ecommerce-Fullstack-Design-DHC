import { Link } from 'react-router-dom'
import { useWishlistStore } from '../context/store'
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi'
import { useCartStore } from '../context/store'

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore()
  const addItem = useCartStore(state => state.addItem)

  if (wishlist.length === 0) {
    return (
      <main className="text-center py-12">
        <FiHeart className="w-16 h-16 mx-auto text-red-500 mb-4" aria-hidden="true" />
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <Link to="/products" className="inline-flex items-center space-x-2 text-red-500 hover:underline">
          <FiArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Continue Shopping</span>
        </Link>
      </main>
    )
  }

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Your Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <article key={product._id} className="bg-black border border-red-900/30 rounded-lg overflow-hidden group transition-transform hover:scale-[1.02]">
            <Link to={`/products/${product._id}`}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.images[0] || '/placeholder.jpg'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); removeFromWishlist(product._id) }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-600 hover:bg-red-500 transition"
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <FiTrash2 className="w-4 h-4 text-white" aria-hidden="true" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-red-500 font-bold mb-2">${product.price}</p>
                
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); addItem({ product, quantity: 1 }) }}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 transition"
                >
                  <FiShoppingCart className="w-4 h-4" aria-hidden="true" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Wishlist
