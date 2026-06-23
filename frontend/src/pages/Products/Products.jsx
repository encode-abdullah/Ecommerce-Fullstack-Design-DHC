import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Star, Grid, List, Heart, ChevronLeft, X } from 'lucide-react';
import { fetchProducts, fetchCategories } from '../../api';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="filter-section border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="filter-section-header w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-3"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="filter-section-content">{children}</div>}
    </div>
  );
};

const ProductGridCard = ({ product, renderStars }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="product-grid-card bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/products/${product._id}`} className="product-grid-card-image block p-4 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain"
          onError={(e) => { e.target.src = '/placeholder.png'; }}
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
            -{discountPct}%
          </span>
        )}
      </Link>
      <div className="product-grid-card-body px-4 pb-4">
        <div className="flex items-start justify-between mb-1">
          <div className="product-grid-card-price flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button className="product-grid-card-wishlist text-gray-300 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="product-grid-card-rating flex items-center gap-1 mb-2">
          {renderStars(4)}
          <span className="text-sm text-gray-500 ml-1">7.5</span>
        </div>
        <p className="product-grid-card-name text-sm text-gray-700 line-clamp-2">
          {product.name}
        </p>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showCount, setShowCount] = useState(12);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = { page, keyword, sort, pageSize: showCount };
        if (category) params.category = category;
        else if (parentCategory) params.parentCategory = parentCategory;
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
  }, [page, keyword, category, parentCategory, sort, showCount]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        const cats = data || [];
        setCategories(cats.filter(c => !c.parent));
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (parentCategory) {
      const loadSubCats = async () => {
        try {
          const data = await fetchCategories({ parent: parentCategory });
          setSubCategories(data || []);
        } catch (error) {
          console.error('Failed to load sub-categories:', error);
        }
      };
      loadSubCats();
    } else {
      setSubCategories([]);
    }
  }, [parentCategory]);

  useEffect(() => {
    const urlKeyword = searchParams.get('keyword') || '';
    const urlCategory = searchParams.get('category') || '';
    const urlParentCategory = searchParams.get('parentCategory') || '';
    setKeyword(urlKeyword);
    if (urlCategory) setCategory(urlCategory);
    if (urlParentCategory) setParentCategory(urlParentCategory);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchParams({ keyword, category, parentCategory, sort });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleParentCatClick = (catId) => {
    if (parentCategory === catId) {
      setParentCategory('');
      setCategory('');
    } else {
      setParentCategory(catId);
      setCategory('');
    }
    setPage(1);
  };

  const handleSubCatClick = (catId) => {
    if (category === catId) {
      setCategory('');
    } else {
      setCategory(catId);
    }
    setPage(1);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-64">
        <div className="loading-spinner animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="products-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Breadcrumb */}
      <nav className="products-breadcrumb flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/products" className="hover:text-red-500 transition-colors">Products</Link>
        {parentCategory && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium">
              {categories.find(c => c._id === parentCategory)?.name || ''}
            </span>
          </>
        )}
        {category && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-500">
              {subCategories.find(c => c._id === category)?.name || ''}
            </span>
          </>
        )}
      </nav>

      <div className="products-layout flex gap-6">
        {/* Left Sidebar Filters */}
        <aside className="products-sidebar w-64 flex-shrink-0 hidden lg:block">
          {/* Categories */}
          <FilterSection title="Categories">
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat._id}>
                  <label
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleParentCatClick(cat._id)}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={parentCategory === cat._id}
                      readOnly
                      className="w-4 h-4 text-red-500"
                    />
                    <span className={`text-sm ${parentCategory === cat._id ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                      {cat.name}
                    </span>
                  </label>
                  {parentCategory === cat._id && subCategories.length > 0 && (
                    <div className="ml-5 mt-1 space-y-1">
                      <button
                        onClick={() => setCategory('')}
                        className={`block text-xs ${!category ? 'text-red-500 font-semibold' : 'text-gray-500 hover:text-red-500'}`}
                      >
                        All
                      </button>
                      {subCategories.map((sub) => (
                        <button
                          key={sub._id}
                          onClick={() => handleSubCatClick(sub._id)}
                          className={`block text-xs ${category === sub._id ? 'text-red-500 font-semibold' : 'text-gray-500 hover:text-red-500'}`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price range">
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-1/2 px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:border-red-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-1/2 px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:border-red-500"
                />
              </div>
              <button className="w-full py-1.5 border border-gray-200 rounded text-sm text-red-500 hover:bg-red-50 transition-colors">
                Apply
              </button>
            </div>
          </FilterSection>

          {/* Condition */}
          <FilterSection title="Condition" defaultOpen={false}>
            <div className="space-y-2">
              {['Any', 'Refurbished', 'Brand new', 'Old items'].map((cond) => (
                <label key={cond} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    className="w-4 h-4 text-red-500"
                  />
                  <span className="text-sm text-gray-600">{cond}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Ratings */}
          <FilterSection title="Ratings" defaultOpen={false}>
            <div className="space-y-2">
              {[5, 4, 3, 2].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-red-500 rounded"
                  />
                  {renderStars(rating)}
                </label>
              ))}
            </div>
          </FilterSection>
        </aside>

        {/* Main Content */}
        <div className="products-main flex-1">
          {/* Top Bar */}
          <div className="products-topbar flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div className="products-result-count text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{products.length || 0}</span> items in{' '}
              <span className="font-semibold text-gray-900">
                {category
                  ? subCategories.find(c => c._id === category)?.name || 'all products'
                  : parentCategory
                    ? categories.find(c => c._id === parentCategory)?.name || 'all products'
                    : 'all products'
                }
              </span>
            </div>
            <div className="products-topbar-actions flex items-center gap-4">
              <select
                value={sort}
                onChange={handleSort}
                className="products-sort-select px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:border-red-500 bg-white"
              >
                <option value="createdAt">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </select>
              <div className="products-view-toggle flex border border-gray-200 rounded overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Category Tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto mb-4 pb-2">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleParentCatClick(cat._id)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  parentCategory === cat._id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sub-category Tabs */}
          {parentCategory && subCategories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto mb-4 pb-2">
              <button
                onClick={() => setCategory('')}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  !category
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {subCategories.map((sub) => (
                <button
                  key={sub._id}
                  onClick={() => handleSubCatClick(sub._id)}
                  className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    category === sub._id
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}

          {/* Product Grid / List */}
          {products.length === 0 ? (
            <div className="products-empty text-center py-12">
              <p className="products-empty-text text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="products-grid grid grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductGridCard key={product._id} product={product} renderStars={renderStars} />
                  ))}
                </div>
              ) : (
                <div className="products-list space-y-4">
                  {products.map((product) => (
                    <div key={product._id} className="product-list-card bg-white border border-gray-100 rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow">
                      <Link to={`/products/${product._id}`} className="product-list-card-image flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-36 h-36 object-contain rounded-lg bg-gray-50"
                          onError={(e) => { e.target.src = '/placeholder.png'; }}
                        />
                      </Link>
                      <div className="product-list-card-info flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="product-list-card-name font-semibold text-gray-900 mb-1">{product.name}</h3>
                          <button className="product-list-card-wishlist text-gray-300 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="product-list-card-price flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice > 0 && (
                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="product-list-card-meta flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1">
                            {renderStars(4)}
                            <span className="text-sm text-gray-500 ml-1">7.5</span>
                          </div>
                        </div>
                        <p className="product-list-card-description text-sm text-gray-500 mb-3 line-clamp-2">
                          {product.description || ''}
                        </p>
                        <Link
                          to={`/products/${product._id}`}
                          className="product-list-card-link text-sm text-red-500 hover:text-red-600 font-medium"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="products-pagination flex items-center justify-end mt-6 gap-2">
                <div className="flex items-center gap-2 mr-4">
                  <span className="text-sm text-gray-500">Show</span>
                  <select
                    value={showCount}
                    onChange={(e) => { setShowCount(Number(e.target.value)); setPage(1); }}
                    className="px-2 py-1 border border-gray-200 rounded text-sm outline-none focus:border-red-500 bg-white"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="pagination-btn p-2 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(Math.min(pages, 5)).keys()].map((x) => {
                  const pageNum = x + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`pagination-btn w-8 h-8 rounded text-sm ${
                        page === pageNum
                          ? 'pagination-btn--active bg-red-500 text-white'
                          : 'pagination-btn--inactive border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(Math.min(pages, page + 1))}
                  disabled={page === pages}
                  className="pagination-btn p-2 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
