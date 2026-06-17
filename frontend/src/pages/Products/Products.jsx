import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { fetchProducts, fetchCategories } from '../../api';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = { page, keyword, sort };
        if (category) params.category = category;
        const data = await fetchProducts(params);
        setProducts(data.products || []);
        setPages(data.pages || 1);
        setPage(data.page || 1);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page, keyword, category, sort]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchParams({ keyword, category, sort });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1);
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Products</h1>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full md:w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </form>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={handleSort}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
          >
            <option value="createdAt">Newest</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group">
                <Link to={`/products/${product._id}`}>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
                </Link>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-600 text-xl">${product.price}</span>
                    <button
                      onClick={() => addToCart(product._id, 1)}
                      className="bg-gray-900 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition flex items-center space-x-1"
                    >
                      <svg size={14} className="w-4 h-4">
                        <use href="#shopping-cart-icon"></use>
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(pages).keys()].map((x) => (
              <button
                key={x + 1}
                onClick={() => setPage(x + 1)}
                className={`px-4 py-2 rounded-lg ${
                  page === x + 1 ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {x + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;