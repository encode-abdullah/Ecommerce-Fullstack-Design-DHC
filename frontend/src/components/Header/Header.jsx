import React from 'react';
import { Search, ChevronDown, User, MessageSquare, ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-500">Brand</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl flex items-center border-2 border-blue-500 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-4 py-2.5 outline-none text-sm"
          />
          <div className="flex items-center gap-1 px-4 py-2.5 border-l border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-gray-700">All category</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <button className="bg-blue-500 text-white px-6 py-2.5 font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <a href="/login" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </a>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Message</span>
          </button>
          <a href="#" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </a>
          <a href="/cart" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">My cart</span>
          </a>
        </div>

      </div>
    </header>
  );
}
