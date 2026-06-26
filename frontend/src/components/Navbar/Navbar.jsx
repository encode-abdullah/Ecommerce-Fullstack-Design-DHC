import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';

const countries = [
  { code: 'PK', name: 'Pakistan', flag: '/images/flags/Property 1=PK.svg' },
  { code: 'AE', name: 'UAE', flag: '/images/flags/Property 1=AE.png' },
  { code: 'CA', name: 'Canada', flag: '/images/flags/Property 1=CA.svg' },
  { code: 'US', name: 'US', flag: '/images/flags/Property 1=US.png' },
];

export default function Navbar({ onOpenCategorySidebar }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              onClick={() => {
                if (item.label === 'All category' && onOpenCategorySidebar) {
                  onOpenCategorySidebar();
                } else {
                  setActiveCategory(item.label);
                }
              }}
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

          <div className="relative" ref={countryDropdownRef}>
            <button
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="navbar-ship-to flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Ship to
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="navbar-flag w-5 h-4 object-cover rounded-sm border border-gray-200"
              />
              <ChevronDown className={`navbar-ship-to-icon w-3.5 h-3.5 text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showCountryDropdown && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country);
                      setShowCountryDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                      selectedCountry.code === country.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="w-5 h-4 object-cover rounded-sm border border-gray-200"
                    />
                    {country.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
