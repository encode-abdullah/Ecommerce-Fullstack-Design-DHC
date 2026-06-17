import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [activeCategory, setActiveCategory] = useState(null);

  const navItems = [
    { label: 'All category', hasIcon: true },
    { label: 'Hot offers' },
    { label: 'Gift boxes' },
    { label: 'Projects' },
    { label: 'Menu item' },
    { label: 'Help', hasDropdown: true },
  ];

  return (
    <nav className="navbar w-full bg-white border-b border-gray-100">
      <div className="navbar-container max-w-7xl mx-auto px-6 flex items-center justify-between h-12">
        <div className="navbar-links flex items-center gap-6">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(item.label)}
              className={`navbar-link flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-gray-900 ${
                activeCategory === item.label
                  ? 'navbar-link--active text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              {item.hasIcon && <Menu className="navbar-link-icon w-4 h-4" />}
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="navbar-link-dropdown w-3.5 h-3.5 text-gray-400" />
              )}
            </button>
          ))}
        </div>

        <div className="navbar-settings flex items-center gap-6">
          <button className="navbar-language flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            English, USD
            <ChevronDown className="navbar-language-icon w-3.5 h-3.5 text-gray-400" />
          </button>

          <button className="navbar-ship-to flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Ship to
            <span className="navbar-flag inline-flex items-center justify-center w-5 h-4 rounded-sm overflow-hidden border border-gray-200">
              <svg viewBox="0 0 5 3" className="navbar-flag-svg w-full h-full">
                <rect width="5" height="1" y="0" fill="#000000" />
                <rect width="5" height="1" y="1" fill="#DD0000" />
                <rect width="5" height="1" y="2" fill="#FFCE00" />
              </svg>
            </span>
            <ChevronDown className="navbar-ship-to-icon w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>
    </nav>
  );
}
