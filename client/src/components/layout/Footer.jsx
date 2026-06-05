import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-gray-700 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-primary font-bold text-xl mb-4">GameGear</h3>
            <p className="text-muted">Premium gaming gear for the ultimate experience.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products?category=mouse" className="text-muted hover:text-primary transition">Gaming Mice</Link></li>
              <li><Link to="/products?category=keyboard" className="text-muted hover:text-primary transition">Keyboards</Link></li>
              <li><Link to="/products?category=headset" className="text-muted hover:text-primary transition">Headsets</Link></li>
              <li><Link to="/products?category=monitor" className="text-muted hover:text-primary transition">Monitors</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted hover:text-primary transition">Contact</a></li>
              <li><a href="#" className="text-muted hover:text-primary transition">FAQs</a></li>
              <li><a href="#" className="text-muted hover:text-primary transition">Shipping</a></li>
              <li><a href="#" className="text-muted hover:text-primary transition">Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted hover:text-primary transition"><FiGithub className="w-5 h-5" /></a>
              <a href="#" className="text-muted hover:text-primary transition"><FiTwitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted hover:text-primary transition"><FiLinkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-muted">
          <p>&copy; 2024 GameGear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer