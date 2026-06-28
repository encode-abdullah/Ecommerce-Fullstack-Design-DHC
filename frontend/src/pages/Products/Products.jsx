import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Star, Grid, List, Heart, ChevronLeft, X, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { fetchProducts, fetchCategories } from '../../api';
import { useCart } from '../../context/CartContext';
import PageLoader from '../../components/PageLoader/PageLoader';
import { toast } from 'react-toastify';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-3"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const ProductGridCard = ({ product, renderStars, onAddToCart }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <Link to={`/products/${product._id}`} className="block relative">
        <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
          <img
            src={encodeURI(product.image)}
            alt={product.name}
            className="w-full h-full object-contain"
            onError={(e) => { e.target.src = '/placeholder.svg'; }}
          />
        </div>
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
            -{discountPct}%
          </span>
        )}
      </Link>
      <div className="px-3 pb-3 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-1">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <button className="text-gray-300 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-1 mb-2">
          {renderStars(4)}
          <span className="text-sm text-gray-500 ml-1">7.5</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">{product.name}</p>
        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product._id);
              toast.success(`${product.name} added to cart`);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [parentCategory, setParentCategory] = useState(searchParams.get('parentCategory') || '');
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showCount, setShowCount] = useState(12);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [appliedPriceMin, setAppliedPriceMin] = useState('');
  const [appliedPriceMax, setAppliedPriceMax] = useState('');
  const { addToCart } = useCart();

  const activeFilterCount = (parentCategory ? 1 : 0) + (priceMin ? 1 : 0) + (priceMax ? 1 : 0);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = { page, keyword, sort, pageSize: showCount };
        if (category) params.category = category;
        else if (parentCategory) params.parentCategory = parentCategory;
        if (appliedPriceMin) params.priceMin = appliedPriceMin;
        if (appliedPriceMax) params.priceMax = appliedPriceMax;
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
  }, [page, keyword, category, parentCategory, sort, showCount, appliedPriceMin, appliedPriceMax]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories((data || []).filter(c => !c.parent));
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
    setSubSubCategories([]);
    setSelectedSubCat('');
  }, [parentCategory]);

  useEffect(() => {
    if (selectedSubCat) {
      const loadSubSubCats = async () => {
        try {
          const data = await fetchCategories({ parent: selectedSubCat });
          setSubSubCategories(data || []);
        } catch (error) {
          console.error('Failed to load sub-sub-categories:', error);
        }
      };
      loadSubSubCats();
    } else {
      setSubSubCategories([]);
    }
  }, [selectedSubCat]);

  useEffect(() => {
    const urlKeyword = searchParams.get('keyword') || '';
    const urlCategory = searchParams.get('category') || '';
    const urlParentCategory = searchParams.get('parentCategory') || '';
    setKeyword(urlKeyword);
    setCategory(urlCategory);
    setParentCategory(urlParentCategory);
  }, [searchParams]);

  const handleParentCatClick = (catId) => {
    if (parentCategory === catId) {
      setParentCategory('');
      setCategory('');
    } else {
      setParentCategory(catId);
      setCategory('');
    }
    setPage(1);
    setShowMobileFilter(false);
  };

  const handleSubCatClick = (catId) => {
    if (selectedSubCat === catId) {
      setSelectedSubCat('');
      setCategory('');
      setSubSubCategories([]);
    } else {
      setSelectedSubCat(catId);
      setCategory(catId);
      setSubSubCategories([]);
    }
    setPage(1);
    setShowMobileFilter(false);
  };

  const handleSubSubCatClick = (catId) => {
    setCategory(category === catId ? '' : catId);
    setPage(1);
    setShowMobileFilter(false);
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
    </div>
  );

  const renderFilterContent = () => (
    <>
      <FilterSection title="Categories">
        <div className="space-y-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { setParentCategory(''); setCategory(''); setPage(1); setShowMobileFilter(false); }}
          >
            <input
              type="radio"
              name="category"
              checked={!parentCategory}
              readOnly
              className="w-4 h-4 text-red-500 pointer-events-none"
            />
            <span className={`text-sm ${!parentCategory ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
              All Categories
            </span>
          </div>
          {categories.map((cat) => (
            <div key={cat._id}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleParentCatClick(cat._id)}
              >
                <input
                  type="radio"
                  name="category"
                  checked={parentCategory === cat._id}
                  readOnly
                  className="w-4 h-4 text-red-500 pointer-events-none"
                />
                <span className={`text-sm ${parentCategory === cat._id ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                  {cat.name}
                </span>
              </div>
              {parentCategory === cat._id && subCategories.length > 0 && (
                <div className="ml-5 mt-1 space-y-1">
                  {subCategories.map((sub) => (
                    <div key={sub._id}>
                      <button
                        onClick={() => handleSubCatClick(sub._id)}
                        className={`block text-xs text-left w-full break-words ${selectedSubCat === sub._id ? 'text-red-500 font-semibold' : 'text-gray-500 hover:text-red-500'}`}
                      >
                        {sub.name}
                      </button>
                      {selectedSubCat === sub._id && subSubCategories.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                          {subSubCategories.map((subSub) => (
                            <button
                              key={subSub._id}
                              onClick={() => handleSubSubCatClick(subSub._id)}
                              className={`block text-xs text-left w-full break-words ${category === subSub._id ? 'text-red-500 font-semibold' : 'text-gray-400 hover:text-red-500'}`}
                            >
                              {subSub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </FilterSection>

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
          <button
            onClick={() => { setAppliedPriceMin(priceMin); setAppliedPriceMax(priceMax); setPage(1); }}
            className="w-full py-1.5 border border-gray-200 rounded text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            Apply
          </button>
        </div>
      </FilterSection>

      <FilterSection title="Ratings" defaultOpen={false}>
        <div className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-red-500 rounded" />
              {renderStars(rating)}
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );

  if (loading && products.length === 0) {
    return <PageLoader show={true} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-hidden">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-shrink-0">
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

      <div className="flex gap-6 min-w-0">
        {/* Left Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          {renderFilterContent()}
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div className="text-sm text-gray-600 truncate">
              <span className="font-semibold text-gray-900">{products.length || 0}</span> items in{' '}
              <span className="font-semibold text-gray-900">
                {category
                  ? subCategories.find(c => c._id === category)?.name || 'all'
                  : parentCategory
                    ? categories.find(c => c._id === parentCategory)?.name || 'all'
                    : 'all products'
                }
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              <button
                onClick={() => setShowMobileFilter(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded text-sm bg-white hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="px-3 py-1.5 border border-gray-200 rounded text-sm outline-none bg-white"
              >
                <option value="createdAt">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </select>
              <div className="flex border border-gray-200 rounded overflow-hidden">
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

          {/* Products */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
                  {products.map((product) => (
                    <ProductGridCard key={product._id} product={product} renderStars={renderStars} onAddToCart={addToCart} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product._id} className="bg-white border border-gray-100 rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow">
                      <Link to={`/products/${product._id}`} className="flex-shrink-0">
                        <div className="w-36 h-36 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                          <img
                            src={encodeURI(product.image)}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = '/placeholder.svg'; }}
                          />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                          <button className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice > 0 && (
                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(4)}
                          <span className="text-sm text-gray-500 ml-1">7.5</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description || ''}</p>
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/products/${product._id}`}
                            className="text-sm text-red-500 hover:text-red-600 font-medium"
                          >
                            View details
                          </Link>
                          <button
                            onClick={() => {
                              addToCart(product._id);
                              toast.success(`${product.name} added to cart`);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-end mt-6 gap-2">
                <div className="flex items-center gap-2 mr-4">
                  <span className="text-sm text-gray-500">Show</span>
                  <select
                    value={showCount}
                    onChange={(e) => { setShowCount(Number(e.target.value)); setPage(1); }}
                    className="px-2 py-1 border border-gray-200 rounded text-sm outline-none bg-white"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(Math.min(pages, 5)).keys()].map((x) => {
                  const pageNum = x + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 rounded text-sm ${
                        page === pageNum
                          ? 'bg-red-500 text-white'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(Math.min(pages, page + 1))}
                  disabled={page === pages}
                  className="p-2 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl flex flex-col animate-slide-in-left">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {renderFilterContent()}
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
