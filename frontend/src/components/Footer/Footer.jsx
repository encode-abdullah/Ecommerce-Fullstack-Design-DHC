import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Brand</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <span className="text-white text-xs">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <span className="text-white text-xs">t</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span className="text-white text-xs">in</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                <span className="text-white text-xs">yt</span>
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">About</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find store</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Partnership</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find store</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Information</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Money Refund</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* For users */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">For users</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Register</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Settings</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">My Orders</a></li>
            </ul>
          </div>

          {/* Get app */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get app</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-700 transition-colors">
                <span className="text-lg"></span>
                <div>
                  <div className="text-[10px] text-gray-400">Download on the</div>
                  <div className="text-xs text-white font-medium">App Store</div>
                </div>
              </a>
              <a href="#" className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-700 transition-colors">
                <span className="text-lg"></span>
                <div>
                  <div className="text-[10px] text-gray-400">Get it on</div>
                  <div className="text-xs text-white font-medium">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">&copy; 2023 Ecommerce.</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors">
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
