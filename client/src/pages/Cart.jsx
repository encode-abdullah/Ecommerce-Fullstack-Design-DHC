import { Link } from 'react-router-dom'
import { useCartStore } from '../context/store'
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi'

const Cart = () => {
  const { cartItems, updateQuantity, removeItem } = useCartStore()

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 20
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="inline-flex items-center space-x-2 text-primary hover:underline">
          <FiArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map(item => (
          <div key={item.product._id} className="bg-surface rounded-lg p-4 flex items-center space-x-4">
            <img 
              src={item.product.images[0] || '/placeholder.jpg'} 
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded"
            />
            
            <div className="flex-1">
              <Link to={`/products/${item.product._id}`} className="font-medium hover:text-primary">
                {item.product.name}
              </Link>
              <p className="text-primary font-bold">${item.product.price}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                className="p-1 rounded bg-gray-700 hover:bg-gray-600"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product._id, Math.min(item.product.stock, item.quantity + 1))}
                className="p-1 rounded bg-gray-700 hover:bg-gray-600"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>
            
            <button
              onClick={() => removeItem(item.product._id)}
              className="p-2 text-red-400 hover:text-red-300"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-lg p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        
        <div className="space-y-3 border-b border-gray-700 pb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
          </div>
        </div>
        
        <div className="flex justify-between text-xl font-bold mt-4 mb-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <Link 
          to="/checkout"
          className="w-full block text-center bg-primary text-background py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart