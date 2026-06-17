import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { fetchCategories } from '../../../api';
import { toast } from 'react-toastify';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (error) {
        toast.error('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-64">
        <div className="loading-spinner animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="admin-categories-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="admin-categories-header flex justify-between items-center mb-6">
        <h1 className="admin-categories-title text-3xl font-bold">Category Management</h1>
        <button className="admin-categories-add-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="admin-categories-table-wrapper bg-white rounded-lg shadow overflow-hidden">
        <table className="admin-categories-table w-full">
          <thead className="admin-categories-table-header bg-gray-50">
            <tr>
              <th className="admin-categories-th px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="admin-categories-th px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="admin-categories-th px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="admin-categories-th px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="admin-categories-table-body divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category._id} className="admin-categories-row">
                <td className="admin-categories-td px-6 py-4 font-medium">{category.name}</td>
                <td className="admin-categories-td px-6 py-4">{category.slug}</td>
                <td className="admin-categories-td px-6 py-4">{category.description}</td>
                <td className="admin-categories-td px-6 py-4">
                  <div className="admin-categories-actions flex space-x-2">
                    <button className="admin-categories-edit-btn text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button className="admin-categories-delete-btn text-red-600 hover:text-red-800">
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

export default Categories;
