import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ChevronRight, Heart, Check, Truck, Shield, MapPin, MessageSquare } from 'lucide-react';
import { fetchProductById, fetchProducts } from '../../api';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        const related = await fetchProducts({
          parentCategory: data.category?.parent?._id || data.category?._id,
          pageSize: 6,
        });
        setRelatedProducts((related.products || []).filter(p => p._id !== id));
      } catch (error) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product._id, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-64">
        <div className="loading-spinner animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found text-center py-12">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  const thumbnails = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <div className="product-details-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/products" className="hover:text-red-500 transition-colors">Products</Link>
        {product.category && (
          <>
            <ChevronRight className="w-3 h-3" />
            {product.category.parent ? (
              <>
                <Link
                  to={`/products?parentCategory=${product.category.parent._id}`}
                  className="hover:text-red-500 transition-colors"
                >
                  {product.category.parent.name}
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-500">{product.category.name}</span>
              </>
            ) : (
              <Link
                to={`/products?parentCategory=${product.category._id}`}
                className="hover:text-red-500 transition-colors"
              >
                {product.category.name}
              </Link>
            )}
          </>
        )}
      </nav>

      {/* Main Product Section */}
      <div className="product-main-section bg-white rounded-lg border border-gray-100 p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Product Image */}
          <div className="md:col-span-4">
            <div className="product-main-image bg-gray-50 rounded-lg p-4 mb-3">
              <img
                src={encodeURI(thumbnails[selectedThumbnail])}
                alt={product.name}
                className="w-full h-72 object-contain"
                onError={(e) => { e.target.src = '/placeholder.svg'; }}
              />
            </div>
            <div className="product-thumbnails flex gap-2">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedThumbnail(idx)}
                  className={`w-14 h-14 rounded-lg border-2 overflow-hidden ${selectedThumbnail === idx ? 'border-red-500' : 'border-gray-200'}`}
                >
                  <img
                    src={encodeURI(thumb)}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/placeholder.svg'; }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">In stock</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(4)}
                <span className="text-sm text-gray-500 ml-1">9.3</span>
              </div>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> 32 reviews
              </span>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-500">154 sold</span>
            </div>

            {/* Tiered Pricing */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                <p className="text-xs text-gray-500 mt-1">50-100 pcs</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <span className="text-lg font-bold text-gray-900">${(product.price * 0.9).toFixed(2)}</span>
                <p className="text-xs text-gray-500 mt-1">100-700 pcs</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-gray-900">${(product.price * 0.8).toFixed(2)}</span>
                <p className="text-xs text-gray-500 mt-1">700+ pcs</p>
              </div>
            </div>

            {/* Product Specs */}
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="w-28 text-gray-500">Price:</span>
                <span className="text-gray-900">Negotiable</span>
              </div>
              <div className="flex">
                <span className="w-28 text-gray-500">Type:</span>
                <span className="text-gray-900">Classic shoes</span>
              </div>
              <div className="flex">
                <span className="w-28 text-gray-500">Material:</span>
                <span className="text-gray-900">Plastic material</span>
              </div>
              <div className="flex">
                <span className="w-28 text-gray-500">Design:</span>
                <span className="text-gray-900">Modern nice</span>
              </div>
              <div className="flex border-t border-gray-100 pt-2 mt-2">
                <span className="w-28 text-gray-500">Customization:</span>
                <span className="text-gray-900">Customized logo and design custom packages</span>
              </div>
              <div className="flex">
                <span className="w-28 text-gray-500">Protection:</span>
                <span className="text-gray-900">Refund Policy</span>
              </div>
              <div className="flex">
                <span className="w-28 text-gray-500">Warranty:</span>
                <span className="text-gray-900">2 years full warranty</span>
              </div>
            </div>
          </div>

          {/* Supplier Card */}
          <div className="md:col-span-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">R</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Supplier</p>
                  <p className="text-sm font-medium text-gray-900">Guanjoi Trading LLC</p>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Germany, Berlin</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Verified Seller</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Worldwide shipping</span>
                </div>
              </div>
              <button className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors mb-2">
                Send inquiry
              </button>
              <button className="w-full py-2.5 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-colors mb-3">
                Seller's profile
              </button>
              <button className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-red-500 transition-colors mb-3">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Save for later</span>
              </button>
              <button
                onClick={() => {
                  addToCart(product._id, 1);
                  toast.success(`${product.name} added to cart`);
                }}
                className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and You May Like */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        {/* Tabs Section */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-lg border border-gray-100">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-100">
              {['description', 'reviews', 'shipping', 'about seller'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {product.description || 'No description available for this product.'}
                  </p>

                  {/* Features */}
                  {product.description && (
                    <div className="space-y-2">
                      {product.description.split(',').map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{feature.trim()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'reviews' && (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              )}
              {activeTab === 'shipping' && (
                <p className="text-sm text-gray-500">Shipping information will appear here.</p>
              )}
              {activeTab === 'about seller' && (
                <p className="text-sm text-gray-500">Seller information will appear here.</p>
              )}
            </div>
          </div>
        </div>

        {/* You May Like */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">You may like</h3>
            <div className="space-y-3">
              {relatedProducts.filter(p => p._id !== product._id).slice(0, 5).map((item) => (
                <Link key={item._id} to={`/products/${item._id}`} className="flex gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <img
                    src={encodeURI(item.image)}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded bg-gray-50"
                    onError={(e) => { e.target.src = '/placeholder.svg'; }}
                  />
                  <div>
                    <p className="text-xs text-gray-700 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">${item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-white rounded-lg border border-gray-100 p-6 mb-4">
        <h3 className="font-semibold text-gray-900 mb-4">Related products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {relatedProducts.slice(0, 6).map((p) => (
            <Link key={p._id} to={`/products/${p._id}`} className="group">
              <div className="bg-gray-50 rounded-lg p-3 mb-2">
                <img src={encodeURI(p.image)} alt={p.name} className="w-full h-28 object-contain group-hover:scale-105 transition-transform" onError={(e) => { e.target.src = '/placeholder.svg'; }} />
              </div>
              <p className="text-xs text-gray-700 line-clamp-1">{p.name}</p>
              <p className="text-xs text-gray-500">${p.price}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Super Discount Banner */}
      <div className="bg-blue-500 rounded-lg p-6 flex items-center justify-between">
        <div>
          <h3 className="text-white text-lg font-bold">Super discount on more than 100 USD</h3>
          <p className="text-blue-100 text-sm">Have you ever finally just write dummy info</p>
        </div>
        <button className="bg-white text-blue-500 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
