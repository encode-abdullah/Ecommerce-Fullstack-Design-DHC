import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import { getMyOrders } from '../../api';
import PageLoader from '../../components/PageLoader/PageLoader';
import { toast } from 'react-toastify';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orders = await getMyOrders();
        const found = orders.find(o => o._id === id);
        setOrder(found);
      } catch (error) {
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [id]);

  if (loading) {
    return <PageLoader show={true} />;
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg mb-4">Order not found</p>
        <Link to="/" className="text-blue-500 hover:text-blue-600 font-medium">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg border border-gray-100 p-8 text-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-1">Thank you for your purchase.</p>
        <p className="text-sm text-gray-400">Order ID: {order._id}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Summary
        </h2>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
              <img
                src={item.image ? encodeURI(item.image) : '/placeholder.svg'}
                alt={item.name}
                className="w-14 h-14 object-contain rounded"
                onError={(e) => { e.target.src = '/placeholder.svg'; }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-100 mt-2">
          <span className="font-semibold text-gray-900">Total:</span>
          <span className="font-bold text-gray-900">${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Status</h2>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
          <span className="text-xs text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          to="/products"
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
