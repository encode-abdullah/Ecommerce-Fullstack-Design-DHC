import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer bg-gray-900 text-gray-400 pt-10 pb-6">
      <div className="site-footer-container max-w-7xl mx-auto px-4 md:px-8">
        <div className="site-footer-grid grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="site-footer-brand col-span-2 md:col-span-1">
            <div className="site-footer-brand-logo flex items-center gap-2 mb-4">
              <div className="site-footer-brand-icon w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <span className="site-footer-brand-name text-xl font-bold text-white">Brand</span>
            </div>
            <p className="site-footer-brand-description text-sm text-gray-400 leading-relaxed">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="site-footer-social flex gap-3 mt-4">
              <a href="#" className="site-footer-social-link w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <span className="text-white text-xs">f</span>
              </a>
              <a href="#" className="site-footer-social-link w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <span className="text-white text-xs">t</span>
              </a>
              <a href="#" className="site-footer-social-link w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span className="text-white text-xs">in</span>
              </a>
              <a href="#" className="site-footer-social-link w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                <span className="text-white text-xs">yt</span>
              </a>
            </div>
          </div>

          <div className="site-footer-links">
            <h4 className="site-footer-links-title text-white font-semibold text-sm mb-4">About</h4>
            <ul className="site-footer-links-list space-y-2.5 text-sm">
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">Find store</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">Blogs</a></li>
            </ul>
          </div>

          <div className="site-footer-links">
            <h4 className="site-footer-links-title text-white font-semibold text-sm mb-4">Information</h4>
            <ul className="site-footer-links-list space-y-2.5 text-sm">
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">Money Refund</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">Contact us</a></li>
            </ul>
          </div>

          <div className="site-footer-links">
            <h4 className="site-footer-links-title text-white font-semibold text-sm mb-4">For users</h4>
            <ul className="site-footer-links-list space-y-2.5 text-sm">
              <li><Link to="/login" className="site-footer-link text-gray-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="site-footer-link text-gray-400 hover:text-white transition-colors">Register</Link></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">Settings</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors">My Orders</a></li>
            </ul>
          </div>

          <div className="site-footer-app">
            <h4 className="site-footer-app-title text-white font-semibold text-sm mb-4">Get app</h4>
            <div className="site-footer-app-buttons flex flex-col gap-2">
              <a href="#" className="site-footer-app-badge block hover:opacity-80 transition-opacity">
                <img src="/images/appstore.svg" alt="Download on the App Store" className="site-footer-app-icon w-36" />
              </a>
              <a href="#" className="site-footer-app-badge block hover:opacity-80 transition-opacity">
                <img src="/images/googleplay.svg" alt="Get it on Google Play" className="site-footer-app-icon w-36" />
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom border-t border-gray-800 pt-6">
          <div className="site-footer-bottom-content flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="site-footer-copyright text-sm text-gray-500">&copy; 2023 Ecommerce.</p>
            <div className="site-footer-bottom-actions flex items-center gap-4">
              <button className="site-footer-language text-sm text-gray-500 hover:text-white transition-colors">
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
