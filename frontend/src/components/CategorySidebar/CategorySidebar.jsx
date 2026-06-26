import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../api';

export default function CategorySidebar({ isOpen, onClose }) {
  const [allCategories, setAllCategories] = useState([]);
  const [childrenMap, setChildrenMap] = useState({});
  const [navStack, setNavStack] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const loadAll = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories();
        const cats = data || [];
        setAllCategories(cats);

        const map = {};
        for (const cat of cats) {
          const parentId = cat.parent?._id || cat.parent;
          if (parentId) {
            if (!map[parentId]) map[parentId] = [];
            map[parentId].push(cat);
          }
        }
        setChildrenMap(map);
        setNavStack([]);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, [isOpen]);

  const currentLevel = navStack.length === 0
    ? allCategories.filter(c => !c.parent)
    : childrenMap[navStack[navStack.length - 1]._id] || [];

  const goDeeper = (cat) => {
    const children = childrenMap[cat._id];
    if (children && children.length > 0) {
      setNavStack(prev => [...prev, cat]);
    } else {
      navigate(`/products?category=${cat._id}&parentCategory=${navStack.length > 0 ? navStack[0]._id : cat._id}`);
      onClose();
    }
  };

  const goBack = () => {
    setNavStack(prev => prev.slice(0, -1));
  };

  const handleCategoryClick = (cat) => {
    goDeeper(cat);
  };

  const handleViewAll = (cat) => {
    if (navStack.length > 0) {
      navigate(`/products?category=${navStack[0]._id}&parentCategory=${navStack[0]._id}`);
    } else {
      navigate(`/products?parentCategory=${cat._id}`);
    }
    onClose();
  };

  if (!isOpen) return null;

  const breadcrumbs = navStack.map(c => c.name);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col animate-slide-in-left">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
          <div className="flex items-center gap-2">
            {navStack.length > 0 ? (
              <button onClick={goBack} className="flex items-center gap-1 text-sm hover:text-gray-300">
                <ArrowLeft className="w-4 h-4" />
                <span>MAIN MENU</span>
              </button>
            ) : (
              <span className="text-sm font-semibold">Browse Categories</span>
            )}
          </div>
          <button onClick={onClose} className="hover:text-gray-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {breadcrumbs.length > 0 && (
          <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
              <button onClick={() => setNavStack([])} className="hover:text-blue-500">All</button>
              {breadcrumbs.map((name, i) => (
                <React.Fragment key={i}>
                  <ChevronRight className="w-3 h-3" />
                  <button
                    onClick={() => setNavStack(prev => prev.slice(0, i + 1))}
                    className={`hover:text-blue-500 ${i === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''}`}
                  >
                    {name}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : currentLevel.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-400 text-sm">
              No categories found
            </div>
          ) : (
            <div>
              {navStack.length > 0 && (
                <button
                  onClick={() => handleViewAll(navStack[navStack.length - 1])}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 border-b border-gray-100"
                >
                  View all in {navStack[navStack.length - 1].name}
                </button>
              )}
              {currentLevel.map((cat) => {
                const hasChildren = childrenMap[cat._id] && childrenMap[cat._id].length > 0;
                return (
                  <button
                    key={cat._id}
                    onClick={() => handleCategoryClick(cat)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-50"
                  >
                    <span className={hasChildren ? '' : 'font-medium'}>{cat.name}</span>
                    {hasChildren ? (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
