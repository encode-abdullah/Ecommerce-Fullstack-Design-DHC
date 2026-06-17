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

const ProductGridCard = ({ product, renderStars }) => (
  <div className="product-grid-card bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
    <Link to={`/products/${product._id}`} className="product-grid-card-image block p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain"
      />
    </Link>
    <div className="product-grid-card-body px-4 pb-4">
      <div className="flex items-start justify-between mb-1">
        <div className="product-grid-card-price flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showCount, setShowCount] = useState(10);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('any');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = { page, keyword, sort, pageSize: showCount };
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
  }, [page, keyword, category, sort, showCount]);

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

  useEffect(() => {
    const urlKeyword = searchParams.get('keyword') || '';
    const urlCategory = searchParams.get('category') || '';
    setKeyword(urlKeyword);
    if (urlCategory) setCategory(urlCategory);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchParams({ keyword, category, sort });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
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
        <a href="/" className="hover:text-blue-500 transition-colors">Home</a>
        <ChevronRight className="w-3 h-3" />
        <a href="/products" className="hover:text-blue-500 transition-colors">Clothings</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-400">Men's wear</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-400">Summer clothing</span>
      </nav>

      <div className="products-layout flex gap-6">
        {/* Left Sidebar Filters */}
        <aside className="products-sidebar w-64 flex-shrink-0 hidden lg:block">
          {/* Category */}
          <FilterSection title="Category">
            <div className="space-y-2">
              {['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span className="text-sm text-gray-600">{cat}</span>
                </label>
              ))}
              <button className="text-sm text-blue-500 hover:text-blue-600">See all</button>
            </div>
          </FilterSection>

          {/* Brands */}
          <FilterSection title="Brands">
            <div className="space-y-2">
              {['Samsung', 'Apple', 'Huawei', 'Pocoo', 'Lenovo'].map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 text-blue-500 rounded"
                  />
                  <span className="text-sm text-gray-600">{brand}</span>
                </label>
              ))}
              <button className="text-sm text-blue-500 hover:text-blue-600">See all</button>
            </div>
          </FilterSection>

          {/* Features */}
          <FilterSection title="Features">
            <div className="space-y-2">
              {['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'].map((feature) => (
                <label key={feature} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => toggleFeature(feature)}
                    className="w-4 h-4 text-blue-500 rounded"
                  />
                  <span className="text-sm text-gray-600">{feature}</span>
                </label>
              ))}
              <button className="text-sm text-blue-500 hover:text-blue-600">See all</button>
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
                  className="w-1/2 px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-1/2 px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{priceMin || '0'}</span>
                <span>{priceMax || '999999'}</span>
              </div>
              <button className="w-full py-1.5 border border-gray-200 rounded text-sm text-blue-500 hover:bg-blue-50 transition-colors">
                Apply
              </button>
            </div>
          </FilterSection>

          {/* Condition */}
          <FilterSection title="Condition">
            <div className="space-y-2">
              {['Any', 'Refurbished', 'Brand new', 'Old items'].map((cond) => (
                <label key={cond} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    checked={selectedCondition === cond.toLowerCase()}
                    onChange={() => setSelectedCondition(cond.toLowerCase())}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span className="text-sm text-gray-600">{cond}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Ratings */}
          <FilterSection title="Ratings">
            <div className="space-y-2">
              {[5, 4, 3, 2].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => toggleRating(rating)}
                    className="w-4 h-4 text-blue-500 rounded"
                  />
                  {renderStars(rating)}
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Manufacturer */}
          <FilterSection title="Manufacturer" defaultOpen={false}>
            <div className="space-y-2">
              {['Samsung', 'Apple', 'Huawei', 'Xiaomi', 'Sony'].map((mfr) => (
                <label key={mfr} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-500 rounded" />
                  <span className="text-sm text-gray-600">{mfr}</span>
                </label>
              ))}
              <button className="text-sm text-blue-500 hover:text-blue-600">See all</button>
            </div>
          </FilterSection>
        </aside>

        {/* Main Content */}
        <div className="products-main flex-1">
          {/* Top Bar */}
          <div className="products-topbar flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div className="products-result-count text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{products.length || 0}</span> items in{' '}
              <span className="font-semibold text-gray-900">{keyword || 'all products'}</span>
            </div>
            <div className="products-topbar-actions flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="text-sm text-gray-600">Verified only</span>
              </label>
              <select
                value={sort}
                onChange={handleSort}
                className="products-sort-select px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:border-blue-500 bg-white"
              >
                <option value="createdAt">Featured</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-createdAt">Newest</option>
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

          {/* Filter Chips */}
          {(selectedBrands.length > 0 || selectedFeatures.length > 0 || selectedRatings.length > 0) && (
            <div className="filter-chips flex flex-wrap items-center gap-2 mb-4">
              {selectedBrands.map((brand) => (
                <span key={brand} className="filter-chip flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                  {brand}
                  <button onClick={() => toggleBrand(brand)} className="hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {selectedFeatures.map((feature) => (
                <span key={feature} className="filter-chip flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                  {feature}
                  <button onClick={() => toggleFeature(feature)} className="hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {selectedRatings.map((rating) => (
                <span key={rating} className="filter-chip flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                  {rating} star
                  <button onClick={() => toggleRating(rating)} className="hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <button
                onClick={() => { setSelectedBrands([]); setSelectedFeatures([]); setSelectedRatings([]); }}
                className="text-sm text-blue-500 hover:text-blue-600 ml-1"
              >
                Clear all filter
              </button>
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
                          className="w-36 h-36 object-cover rounded-lg"
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
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="product-list-card-meta flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1">
                            {renderStars(4)}
                            <span className="text-sm text-gray-500 ml-1">7.5</span>
                          </div>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">154 orders</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-green-500 font-medium">Free Shipping</span>
                        </div>
                        <p className="product-list-card-description text-sm text-gray-500 mb-3 line-clamp-2">
                          {product.description || 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                        </p>
                        <Link
                          to={`/products/${product._id}`}
                          className="product-list-card-link text-sm text-blue-500 hover:text-blue-600 font-medium"
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
                    className="px-2 py-1 border border-gray-200 rounded text-sm outline-none focus:border-blue-500 bg-white"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
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
                {[...Array(Math.min(pages, 3)).keys()].map((x) => (
                  <button
                    key={x + 1}
                    onClick={() => setPage(x + 1)}
                    className={`pagination-btn w-8 h-8 rounded text-sm ${
                      page === x + 1
                        ? 'pagination-btn--active bg-blue-500 text-white'
                        : 'pagination-btn--inactive border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {x + 1}
                  </button>
                ))}
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
