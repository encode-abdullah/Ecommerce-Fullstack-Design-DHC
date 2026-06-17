import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, User, MessageSquare, ShoppingCart, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../api';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('keyword', searchQuery.trim());
    if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
    navigate(`/products?${params.toString()}`);
    setShowDropdown(false);
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

  return (
    <header className="site-header w-full bg-white border-b border-gray-200">
      <div className="site-header-container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        
        <div className="site-logo flex items-center gap-2 flex-shrink-0">
          <div className="site-logo-icon w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <span className="site-logo-text text-2xl font-bold text-blue-500">Brand</span>
        </div>

        <form onSubmit={handleSearch} className="site-search flex-1 max-w-3xl flex items-center border-2 border-blue-500 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="site-search-input flex-1 px-4 py-2.5 outline-none text-sm"
          />
          
          <div className="relative" ref={dropdownRef}>
            <div
              className="site-search-category flex items-center gap-1 px-4 py-2.5 border-l border-gray-200 bg-white cursor-pointer hover:bg-gray-50"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="site-search-category-text text-sm text-gray-700 whitespace-nowrap">{getCategoryLabel()}</span>
              <ChevronDown className={`site-search-category-icon w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showDropdown && (
              <div className="category-dropdown absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
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

          <button type="submit" className="site-search-btn bg-blue-500 text-white px-6 py-2.5 font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </button>
        </form>

        <div className="site-nav-icons flex items-center gap-6 flex-shrink-0">
          <a href="/login" className="site-nav-icon-item flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
            <User className="site-nav-icon w-5 h-5" />
            <span className="site-nav-icon-label text-xs">Profile</span>
          </a>
          <button className="site-nav-icon-item flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
            <MessageSquare className="site-nav-icon w-5 h-5" />
            <span className="site-nav-icon-label text-xs">Message</span>
          </button>
          <a href="/cart" className="site-nav-icon-item flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
            <ShoppingCart className="site-nav-icon w-5 h-5" />
            <span className="site-nav-icon-label text-xs">My cart</span>
          </a>
        </div>

      </div>
    </header>
  );
}
