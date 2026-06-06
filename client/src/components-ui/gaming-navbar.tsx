import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Heart, User, Sun, Moon, Menu, X, Search, Gamepad2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';
import { useAuthStore, useCartStore, useThemeStore, useWishlistStore } from '../../context/store';

const navLinks = [
  { to: '/', label: 'Home', icon: Gamepad2 },
  { to: '/products', label: 'Products', icon: Gamepad2 },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
]

export const GamingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const { cartItems } = useCartStore()
  const { wishlist } = useWishlistStore()
  const { isDark, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              GameGear
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink 
                key={to} 
                to={to} 
                className={({ isActive }) => 
                  cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-cyan-500/20 text-cyan-400" 
                      : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                  )
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-cyan-400" /> : <Moon className="w-5 h-5 text-purple-400" />}
            </button>

            <Link to="/wishlist" className="relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition">
              <Heart className="w-5 h-5 text-purple-400" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-300">{user?.name}</span>
                <button 
                  onClick={logout}
                  className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-medium text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition">
                <User className="w-5 h-5 text-cyan-400" />
              </Link>
            )}

            <button 
              className="md:hidden p-2 rounded-lg bg-slate-800/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden border-t border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink 
                key={to} 
                to={to} 
                className="flex items-center space-x-3 py-3 px-3 rounded-lg hover:bg-slate-800/50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="w-5 h-5 text-cyan-400" />
                <span className="text-slate-300">{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}