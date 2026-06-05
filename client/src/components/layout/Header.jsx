import { Link, NavLink } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiUser, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useAuthStore, useCartStore, useThemeStore, useWishlistStore } from '../../context/store'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const { cartItems } = useCartStore()
  const { wishlist } = useWishlistStore()
  const { isDark, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: 'Cart' },
  ]

  return (
    <header className="bg-surface border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            GameGear
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                className={({ isActive }) => 
                  `hover:text-primary transition ${isActive ? 'text-primary' : 'text-text'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-gray-700 transition">
              <FiHeart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-background text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-700 transition">
              <FiShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-background text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm hidden sm:block">{user?.name}</span>
                <button 
                  onClick={logout}
                  className="px-3 py-1 bg-accent text-white rounded hover:opacity-90 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 rounded-lg hover:bg-gray-700 transition">
                <FiUser className="w-5 h-5" />
              </Link>
            )}

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-surface border-t border-gray-700">
          <div className="px-4 py-2 space-y-2">
            {navLinks.map(link => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                className="block py-2 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header