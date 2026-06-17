import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { fetchProducts } from '../../../api';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({ pageSize: 100 });
        setProducts(data.products || []);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-64">
        <div className="loading-spinner animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="admin-products-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="admin-products-header flex justify-between items-center mb-6">
        <h1 className="admin-products-title text-3xl font-bold">Product Management</h1>
        <button className="admin-products-add-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="admin-products-table-wrapper bg-white rounded-lg shadow overflow-hidden">
        <table className="admin-products-table w-full">
          <thead className="admin-products-table-header bg-gray-50">
            <tr>
              <th className="admin-products-th px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="admin-products-th px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="admin-products-th px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="admin-products-th px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
              <th className="admin-products-th px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="admin-products-table-body divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="admin-products-row">
                <td className="admin-products-td px-6 py-4 flex items-center">
                  <img src={product.image} alt={product.name} className="admin-products-image w-12 h-12 object-cover rounded mr-3" />
                  {product.name}
                </td>
                <td className="admin-products-td px-6 py-4">${product.price}</td>
                <td className="admin-products-td px-6 py-4">{product.stock}</td>
                <td className="admin-products-td px-6 py-4">
                  <span className={`admin-products-featured-badge px-2 py-1 rounded text-xs ${product.featured ? 'admin-products-featured-badge--yes bg-green-100 text-green-800' : 'admin-products-featured-badge--no bg-gray-100 text-gray-800'}`}>
                    {product.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="admin-products-td px-6 py-4">
                  <div className="admin-products-actions flex space-x-2">
                    <button className="admin-products-edit-btn text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button className="admin-products-delete-btn text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
