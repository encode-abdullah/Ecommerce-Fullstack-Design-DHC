import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '../../context/store'
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const { token } = useAuthStore()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const { data } = await axios.get('/api/products', config)
        setProducts(data.products)
      } catch (error) {
        console.error('Failed to fetch products')
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <button className="flex items-center space-x-2 bg-primary text-background px-4 py-2 rounded-lg">
          <FiPlus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-surface rounded-lg overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b border-gray-700">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3 text-right">
                  <button className="p-2 text-primary hover:bg-gray-700 rounded">
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-400 hover:bg-gray-700 rounded">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProducts