import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ChevronDown, User, MessageSquare, ShoppingCart, X, Check, LogOut, Settings } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCategories, searchSuggestions } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const suggestionTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, handleLogout } = useAuth();
  const { cartItems } = useCart();

  const cartCount = cartItems?.length || 0;

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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (query) => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setSuggestionsLoading(true);
    try {
      const results = await searchSuggestions(query.trim());
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setSuggestionsLoading(false);
    }
  }, []);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (suggestionTimeoutRef.current) clearTimeout(suggestionTimeoutRef.current);
    if (value.trim().length >= 2) {
      suggestionTimeoutRef.current = setTimeout(() => fetchSuggestions(value), 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchFocus = () => {
    if (suggestions.length > 0 && searchQuery.trim().length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('keyword', searchQuery.trim());
    if (selectedCategories.length >= 1) params.set('parentCategory', selectedCategories[0]);
    navigate(`/products?${params.toString()}`);
    setShowDropdown(false);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/products/${productId}`);
  };

  const handleSuggestionKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      searchInputRef.current?.blur();
    }
  };

  const toggleCategory = (catId) => {
    setSelectedCategories(prev =>
      prev.includes(catId)
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    );
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const getCategoryLabel = () => {
    if (selectedCategories.length === 0) return 'All category';
    if (selectedCategories.length === 1) {
      const cat = categories.find(c => c._id === selectedCategories[0]);
      return cat ? cat.name : 'All category';
    }
    return `${selectedCategories.length} categories`;
  };

  const handleLogoutClick = () => {
    handleLogout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="site-header w-full bg-white border-b border-gray-200 relative z-50">
      <div className="site-header-container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        
        <Link to="/" className="site-logo flex items-center gap-1 flex-shrink-0">
          <img src="/images/logo/Dravix.png" alt="Dravix" className="h-[60px] w-auto object-contain" />
        </Link>

        <form onSubmit={handleSearch} className="site-search flex-1 max-w-3xl flex items-center border-2 border-blue-500 rounded-lg relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={handleSearchFocus}
            onKeyDown={handleSuggestionKeyDown}
            autoComplete="off"
            className="site-search-input flex-1 px-4 py-2.5 outline-none text-sm"
          />

          {searchQuery.trim().length > 0 && (
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSuggestions([]); setShowSuggestions(false); searchInputRef.current?.focus(); }}
              className="absolute right-[180px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <div className="relative" ref={dropdownRef}>
            <div
              className="site-search-category flex items-center gap-1 px-4 py-2.5 border-l border-gray-200 bg-white cursor-pointer hover:bg-gray-50"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="site-search-category-text text-sm text-gray-700 whitespace-nowrap">{getCategoryLabel()}</span>
              <ChevronDown className={`site-search-category-icon w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showDropdown && (
              <div className="category-dropdown absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
                <div className="category-dropdown-header flex items-center justify-between px-3 py-2 border-b border-gray-100">
                  <span className="text-xs font-medium text-gray-500">Select categories</span>
                  {selectedCategories.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCategories}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                {categories.length === 0 ? (
                  <div className="px-3 py-4 text-center text-gray-400 text-sm">No categories available</div>
                ) : (
                  categories.map((cat) => (
                    <label
                      key={cat._id}
                      className="category-dropdown-item flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                        selectedCategories.includes(cat._id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedCategories.includes(cat._id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat._id)}
                        onChange={() => toggleCategory(cat._id)}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-700">{cat.name}</span>
                    </label>
                  ))
                )}
              </div>
            )}
          </div>

          <button type="submit" className="site-search-btn bg-blue-500 text-white px-6 py-2.5 font-medium hover:bg-[#0f766e] transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </button>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-0 z-50">
              <div className="bg-white rounded-b-lg shadow-xl border border-gray-200 border-t-0 max-h-[60vh] overflow-y-auto">
                {suggestionsLoading ? (
                  <div className="px-4 py-8 text-center text-gray-400 text-sm">
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-500 mb-2"></div>
                    <p>Searching...</p>
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-400 text-sm">
                    No products found for &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {suggestions.map((product) => (
                      <button
                        key={product._id}
                        type="button"
                        onClick={() => handleSuggestionClick(product._id)}
                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <img
                          src={encodeURI(product.image)}
                          alt={product.name}
                          className="w-12 h-12 object-contain rounded bg-gray-50 flex-shrink-0"
                          onError={(e) => { e.target.src = '/placeholder.svg'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm font-bold text-red-500">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        <Search className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
                {!suggestionsLoading && suggestions.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full px-4 py-3 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100"
                  >
                    View all results for &quot;{searchQuery}&quot;
                  </button>
                )}
              </div>
            </div>
          )}
        </form>

        <div className="site-nav-icons flex items-center gap-6 flex-shrink-0">
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="site-nav-icon-item flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
                <span className="site-nav-icon-label text-xs">{user?.name?.split(' ')[0] || 'User'}</span>
              </button>
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4" />
                    My Orders
                  </Link>
                  {user?.role === 'admin' && (
                    <>
                      <Link
                        to="/admin/products"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                      >
                        <Settings className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="site-nav-icon-item flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <User className="site-nav-icon w-5 h-5" />
              <span className="site-nav-icon-label text-xs">Login</span>
            </Link>
          )}
          <button className="site-nav-icon-item flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
            <MessageSquare className="site-nav-icon w-5 h-5" />
            <span className="site-nav-icon-label text-xs">Message</span>
          </button>
          <Link to="/cart" className="site-nav-icon-item flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors relative">
            <div className="relative">
              <ShoppingCart className="site-nav-icon w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
            <span className="site-nav-icon-label text-xs">My cart</span>
          </Link>
        </div>

      </div>

      {/* Search Suggestions Overlay */}
      {showSuggestions && (
        <div
          className="fixed left-0 right-0 bottom-0 bg-black/50 z-40"
          style={{ top: '88px' }}
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </header>
  );
}
