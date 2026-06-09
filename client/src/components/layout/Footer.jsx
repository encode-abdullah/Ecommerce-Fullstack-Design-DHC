import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-red-900/30 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h3 className="font-bold text-xl tracking-wider text-red-500">
              <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">Flux Digital Inferno</span>
            </h3>
            <p className="text-red-300/60 text-sm leading-relaxed">
              Equip yourself with premium battle station gear. Engineered for absolute accuracy, speed, and durability.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded bg-black border border-red-900/30 hover:border-red-500 text-muted hover:text-red-500 transition">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded bg-black border border-red-900/30 hover:border-red-500 text-muted hover:text-red-500 transition">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded bg-black border border-red-900/30 hover:border-red-500 text-muted hover:text-red-500 transition">
                <FiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <nav aria-label="Shop categories">
            <h4 className="font-bold text-sm tracking-wider uppercase text-text/90 mb-4">Shop Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products?category=mouse" className="text-red-300/60 hover:text-red-500 transition">Gaming Mice</Link>
              </li>
              <li>
                <Link to="/products?category=keyboard" className="text-red-300/60 hover:text-red-500 transition">Keyboards</Link>
              </li>
              <li>
                <Link to="/products?category=headset" className="text-red-300/60 hover:text-red-500 transition">Headsets</Link>
              </li>
              <li>
                <Link to="/products?category=monitor" className="text-red-300/60 hover:text-red-500 transition">Monitors</Link>
              </li>
            </ul>
          </nav>
          
          <nav aria-label="Support and FAQ">
            <h4 className="font-bold text-sm tracking-wider uppercase text-text/90 mb-4">Support & FAQ</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="text-red-300/60 hover:text-red-500 transition">Setup Guide</a>
              </li>
              <li>
                <a href="#" className="text-red-300/60 hover:text-red-500 transition">Warranty & Returns</a>
              </li>
              <li>
                <a href="#" className="text-red-300/60 hover:text-red-500 transition">Shipping Rates</a>
              </li>
              <li>
                <a href="#" className="text-red-300/60 hover:text-red-500 transition">Contact Support</a>
              </li>
            </ul>
          </nav>
          
          <section aria-labelledby="newsletter-heading" className="space-y-4">
            <h4 id="newsletter-heading" className="font-bold text-sm tracking-wider uppercase text-text/90 mb-4">Join the Guild</h4>
            <p className="text-red-300/60 text-sm leading-relaxed">
              Subscribe to get notified about beta items, hardware deals, and tournament updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <div className="relative flex-grow">
                <Input
                  type="email"
                  placeholder="Enter email..."
                  className="bg-black border-red-900/50 focus-visible:ring-red-500 h-9 w-full text-xs ps-8"
                />
                <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-2.5 text-muted pointer-events-none">
                  <FiMail className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </div>
              <Button type="submit" size="sm" className="h-9 px-3 text-xs font-semibold bg-red-600 hover:bg-red-500">
                Join
              </Button>
            </form>
          </section>
        </div>
        
        <div className="border-t border-red-900/30 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-red-300/60">
          <p>&copy; {new Date().getFullYear()} Flux Digital Inferno. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex space-x-4">
            <a href="#" className="hover:text-red-500">Privacy Policy</a>
            <a href="#" className="hover:text-red-500">Terms of Service</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
