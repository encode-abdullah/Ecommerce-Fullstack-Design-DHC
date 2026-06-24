import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../../api';
import { toast } from 'react-toastify';

const CategoryModal = ({ category, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: category?.name || '',
    description: category?.description || '',
    parent: category?.parent?._id || category?.parent || '',
  });
  const [saving, setSaving] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCategories();
        setAllCategories(data || []);
      } catch (e) {}
    };
    load();
  }, []);

  const parentCategories = allCategories.filter(c => !c.parent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.parent) delete payload.parent;
      await onSave(payload);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{category ? 'Edit Category' : 'Add Category'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category (leave empty for top-level)</label>
            <select value={form.parent} onChange={(e) => setForm({ ...form, parent: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white">
              <option value="">None (Top-level)</option>
              {parentCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

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

  useEffect(() => { loadCategories(); }, []);

  const handleAdd = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteCategory(id);
      toast.success('Category deleted');
      setCategories(categories.filter(c => c._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  const handleSave = async (formData) => {
    if (editingCategory) {
      const updated = await updateCategory(editingCategory._id, formData);
      setCategories(categories.map(c => c._id === editingCategory._id ? updated : c));
      toast.success('Category updated');
    } else {
      const created = await createCategory(formData);
      setCategories([...categories, created]);
      toast.success('Category created');
    }
  };

  const getParentName = (cat) => {
    if (!cat.parent) return '-';
    if (typeof cat.parent === 'object') return cat.parent.name;
    const parent = categories.find(c => c._id === cat.parent);
    return parent ? parent.name : '-';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <button onClick={handleAdd}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{category.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{category.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{getParentName(category)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-[200px]">{category.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(category)} className="text-blue-600 hover:text-blue-800">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(category._id)} className="text-red-600 hover:text-red-800">
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

      {modalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Categories;
