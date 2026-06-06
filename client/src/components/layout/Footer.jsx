import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Footer = () => {
  return (
    <footer className="bg-surface/50 border-t border-gray-700 py-12 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl tracking-wider text-primary">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">GameGear</span>
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              Equip yourself with premium battle station gear. Engineered for absolute accuracy, speed, and durability.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded bg-surface border border-gray-700 hover:border-primary text-muted hover:text-primary transition">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded bg-surface border border-gray-700 hover:border-primary text-muted hover:text-primary transition">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded bg-surface border border-gray-700 hover:border-primary text-muted hover:text-primary transition">
                <FiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase text-text/90 mb-4">Shop Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products?category=mouse" className="text-muted hover:text-primary transition">Gaming Mice</Link>
              </li>
              <li>
                <Link to="/products?category=keyboard" className="text-muted hover:text-primary transition">Keyboards</Link>
              </li>
              <li>
                <Link to="/products?category=headset" className="text-muted hover:text-primary transition">Headsets</Link>
              </li>
              <li>
                <Link to="/products?category=monitor" className="text-muted hover:text-primary transition">Monitors</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Support resources */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase text-text/90 mb-4">Support & FAQ</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="text-muted hover:text-primary transition">Setup Guide</a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition">Warranty & Returns</a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition">Shipping Rates</a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition">Contact Support</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider uppercase text-text/90 mb-4">Join the Guild</h4>
            <p className="text-muted text-sm leading-relaxed">
              Subscribe to get notified about beta items, hardware deals, and tournament updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <div className="relative flex-grow">
                <Input
                  type="email"
                  placeholder="Enter email..."
                  className="bg-background border-gray-700 focus-visible:ring-primary h-9 w-full text-xs ps-8"
                />
                <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-2.5 text-muted pointer-events-none">
                  <FiMail className="w-3.5 h-3.5" />
                </div>
              </div>
              <Button type="submit" size="sm" className="h-9 px-3 text-xs font-semibold">
                Join
              </Button>
            </form>
          </div>
        </div>
        
        {/* Border and copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} GameGear. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer