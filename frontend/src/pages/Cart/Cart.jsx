import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Truck, Shield, Headphones, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, cartLoading, updateCart, removeFromCart, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [savedForLater, setSavedForLater] = useState([]);

  const cartTotal = cartItems?.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  ) || 0;

  const discount = cartTotal * 0.04;
  const tax = cartTotal * 0.01;
  const total = cartTotal - discount + tax;

  const handleUpdate = (productId, quantity) => {
    updateCart(productId, quantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  const handleSaveForLater = (item) => {
    setSavedForLater([...savedForLater, item]);
    removeFromCart(item.product._id);
    toast.success('Saved for later');
  };

  const handleMoveToCart = (item) => {
    updateCart(item.product._id, 1);
    setSavedForLater(savedForLater.filter(i => i.product._id !== item.product._id));
    toast.success('Moved to cart');
  };

  if (cartLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="cart-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My cart ({cartItems?.length || 0})</h1>

      {cartItems?.length === 0 && savedForLater.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
          >
            <ArrowLeft size={18} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg border border-gray-100">
              {cartItems?.map((item, idx) => (
                <div key={item.product?._id} className={`flex gap-4 p-5 ${idx > 0 ? 'border-t border-gray-100' : ''}`}>
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.product?.name}</h3>
                      <span className="text-sm font-bold text-gray-900">${item.product?.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">Size: medium, Color: blue, Material: Plastic</p>
                    <p className="text-xs text-gray-500 mb-2">Seller: {item.product?.seller || 'Artel Market'}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRemove(item.product._id)}
                          className="text-xs text-red-500 hover:text-red-600 font-medium"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleSaveForLater(item)}
                          className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                        >
                          Save for later
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Qty:</span>
                        <select
                          value={item.quantity}
                          onChange={(e) => handleUpdate(item.product._id, Number(e.target.value))}
                          className="px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:border-blue-500 bg-white"
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom Actions */}
              <div className="flex items-center justify-between p-5 border-t border-gray-100">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition"
                >
                  <ArrowLeft size={16} />
                  Back to shop
                </Link>
                <button
                  onClick={handleClear}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Remove all
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            {/* Coupon */}
            <div className="bg-white rounded-lg border border-gray-100 p-4 mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Have a coupon?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 border border-gray-200 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Apply
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-lg border border-gray-100 p-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal:</span>
                  <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount:</span>
                  <span className="text-red-500">- ${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax:</span>
                  <span className="text-green-500">+ ${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full mt-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition">
                Checkout
              </button>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                </div>
                <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-500">MC</span>
                </div>
                <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-500">PP</span>
                </div>
                <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-500">VISA</span>
                </div>
                <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-500">Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { icon: <Shield className="w-6 h-6" />, title: 'Secure payment', desc: 'Have you ever finally just' },
          { icon: <Headphones className="w-6 h-6" />, title: 'Customer support', desc: 'Have you ever finally just' },
          { icon: <Truck className="w-6 h-6" />, title: 'Free delivery', desc: 'Have you ever finally just' },
        ].map((badge, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-white rounded-lg border border-gray-100 p-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
              {badge.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{badge.title}</p>
              <p className="text-xs text-gray-500">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Saved for Later */}
      {savedForLater.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved for later</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedForLater.map((item) => (
              <div key={item.product._id} className="bg-white rounded-lg border border-gray-100 p-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-36 object-contain mb-3"
                />
                <p className="text-lg font-bold text-gray-900 mb-1">${item.product.price}</p>
                <p className="text-xs text-gray-700 line-clamp-2 mb-3">{item.product.name}</p>
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="w-full flex items-center justify-center gap-2 py-2 border border-blue-500 text-blue-500 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Move to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Super Discount Banner */}
      <div className="bg-blue-500 rounded-lg p-6 flex items-center justify-between mt-8">
        <div>
          <h3 className="text-white text-lg font-bold">Super discount on more than 100 USD</h3>
          <p className="text-blue-100 text-sm">Have you ever finally just write dummy info</p>
        </div>
        <button className="bg-white text-blue-500 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default Cart;
