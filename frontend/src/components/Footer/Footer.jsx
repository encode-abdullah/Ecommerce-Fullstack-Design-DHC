import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer bg-gray-900 text-gray-400">
      <div className="site-footer-container max-w-7xl mx-auto px-2 md:px-8 py-4 md:py-8">
        <button
          onClick={scrollToTop}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white text-xs md:text-sm font-medium py-2 md:py-3 transition-colors flex items-center justify-center gap-1 mb-4 md:mb-8"
        >
          <ChevronUp className="w-4 h-4" />
          Back to top
        </button>

        <div className="site-footer-grid grid grid-cols-4 gap-2 md:gap-8 mb-6 md:mb-8">
          <div className="site-footer-links min-w-0">
            <h4 className="site-footer-links-title text-white font-semibold text-[10px] md:text-sm mb-2 md:mb-4">Get to Know Us</h4>
            <ul className="site-footer-links-list space-y-1 md:space-y-2.5 text-[10px] md:text-sm">
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Careers</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Blog</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">About Us</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Investor Relations</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="site-footer-links min-w-0">
            <h4 className="site-footer-links-title text-white font-semibold text-[10px] md:text-sm mb-2 md:mb-4">Make Money with Us</h4>
            <ul className="site-footer-links-list space-y-1 md:space-y-2.5 text-[10px] md:text-sm">
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Sell on Dravix</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Sell under Dravix Accelerator</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Protect & Stickers</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Advertise Your Products</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Dravix Pay on Merchants</a></li>
            </ul>
          </div>

          <div className="site-footer-links min-w-0">
            <h4 className="site-footer-links-title text-white font-semibold text-[10px] md:text-sm mb-2 md:mb-4">Payment Products</h4>
            <ul className="site-footer-links-list space-y-1 md:space-y-2.5 text-[10px] md:text-sm">
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Business Card</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Shop with Points</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Reload Your Balance</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Currency Converter</a></li>
            </ul>
          </div>

          <div className="site-footer-links min-w-0">
            <h4 className="site-footer-links-title text-white font-semibold text-[10px] md:text-sm mb-2 md:mb-4">Let Us Help You</h4>
            <ul className="site-footer-links-list space-y-1 md:space-y-2.5 text-[10px] md:text-sm">
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Your Account</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Your Orders</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Shipping Rates</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Returns & Replacements</a></li>
              <li><a href="#" className="site-footer-link text-gray-400 hover:text-white transition-colors leading-tight block">Help</a></li>
            </ul>
          </div>
        </div>

        <div className="site-footer-bottom border-t border-gray-800 pt-4 md:pt-6">
          <div className="site-footer-bottom-content flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="site-footer-brand-logo flex items-center gap-2">
              <img src="/images/logo/Dravix.png" alt="Dravix" className="h-8 md:h-[60px] w-auto object-contain" />
            </div>
            <div className="site-footer-bottom-actions flex items-center gap-3 md:gap-4 flex-wrap justify-center">
              <button className="site-footer-language text-xs md:text-sm text-gray-500 hover:text-white transition-colors">
                English
              </button>
              <span className="text-gray-700 text-xs md:text-sm">$ USD</span>
            </div>
            <p className="site-footer-copyright text-xs md:text-sm text-gray-500">&copy; 2026 Dravix</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
