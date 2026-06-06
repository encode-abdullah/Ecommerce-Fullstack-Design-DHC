import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '../../context/store'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const { token } = useAuthStore()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const { data } = await axios.get('/api/orders', config)
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders')
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      <div className="bg-black border border-red-900/30 rounded-lg overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="border-b border-red-900/30">
            <tr>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-red-900/20">
                <td className="px-4 py-3">#{order._id.slice(-8)}</td>
                <td className="px-4 py-3">{order.user?.name || 'N/A'}</td>
                <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">${order.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded ${
                    order.isDelivered ? 'bg-red-600/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {order.isDelivered ? 'Delivered' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrders
