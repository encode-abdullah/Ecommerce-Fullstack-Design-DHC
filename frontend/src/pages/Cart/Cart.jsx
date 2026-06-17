import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, cartLoading, updateCart, removeFromCart, clearCart } = useCart();

  const cartTotal = cartItems?.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  ) || 0;

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

  if (cartLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems?.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            <ArrowLeft size={18} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems?.map((item) => (
                    <tr key={item.product?._id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={item.product?.image}
                            alt={item.product?.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <span className="font-medium">{item.product?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">${item.product?.price}</td>
                      <td className="px-6 py-4">
                        <select
                          value={item.quantity}
                          onChange={(e) => handleUpdate(item.product._id, Number(e.target.value))}
                          className="px-2 py-1 rounded border border-gray-300"
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ${(item.product?.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleRemove(item.product?._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button
                onClick={handleClear}
                className="text-red-600 hover:text-red-800 underline"
              >
                Clear Cart
              </button>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg mt-6 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;