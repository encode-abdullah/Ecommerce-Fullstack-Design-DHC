import React, { useState, useEffect, useId } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiUser, FiSun, FiMoon, FiMenu, FiX, FiSearch, FiLogOut } from 'react-icons/fi'
import { useAuthStore, useCartStore, useThemeStore, useWishlistStore } from '../../context/store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '../ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
import Menu from './Menu.jsx'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchId = useId()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const { cartItems } = useCartStore()
  const { wishlist } = useWishlistStore()
  const { isDark, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  // Sync search input with URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSearchQuery(params.get('keyword') || '')
  }, [location.search])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${searchQuery}`)
    } else {
      navigate('/products')
    }
  }

  const categoriesList = [
    { name: 'Gaming Mice', slug: 'mouse', desc: 'High DPI optical sensors and lightweight designs.' },
    { name: 'Keyboards', slug: 'keyboard', desc: 'Mechanical switches with responsive tactile feedback.' },
    { name: 'Headsets', slug: 'headset', desc: 'Immersive surround sound and crystal-clear microphones.' },
    { name: 'Monitors', slug: 'monitor', desc: 'Ultra-high refresh rates and low response times.' },
    { name: 'Controllers', slug: 'controller', desc: 'Console-grade gamepads for seamless PC gaming.' },
    { name: 'Gaming Chairs', slug: 'chair', desc: 'Ergonomic lumbar support for long marathon sessions.' },
  ]

  const menuList = [
    { id: 1, title: 'Products', url: '/products' },
    { id: 2, title: 'Categories', url: '#', dropdown: true, items: categoriesList.map((cat, i) => ({ id: i + 1, title: cat.name, url: `/products?category=${cat.slug}` })) },
    { id: 3, title: 'Deals', url: '/products?category=mouse' },
  ]

  const totalCartQty = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-red-900/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          
          {/* Logo - fixed width, single line */}
          <Link to="/" className="flex-shrink-0 text-lg font-bold tracking-wider text-red-500 hover:opacity-90 whitespace-nowrap">
            <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">Flux Digital Inferno</span>
          </Link>

          {/* Desktop Navigation - flexible */}
          <div className="hidden md:flex items-center flex-1 min-w-0">
            <Menu list={menuList} />
          </div>
          
          {/* Search + Actions */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xs min-w-[120px]">
              <div className="relative">
                <Input
                  id={searchId}
                  type="search"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 ps-8 pe-3 bg-black border-red-900/50 hover:border-red-500/50 focus-visible:ring-red-500 w-full text-xs"
                />
                <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-red-400/50 pointer-events-none">
                  <FiSearch className="w-3.5 h-3.5" />
                </div>
              </div>
            </form>
            
             {/* Mobile Search Toggle */}
             <button
               onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
               className="p-2 rounded-lg hover:bg-red-900/20 text-text/80 hover:text-red-500 transition md:hidden"
               aria-label="Search"
             >
              <FiSearch className="w-5 h-5" />
            </button>

             {/* Theme Toggle */}
             <button
               onClick={toggleTheme}
               className="p-2 rounded-lg hover:bg-red-900/20 text-text/80 hover:text-red-500 transition"
               aria-label="Toggle theme"
             >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

             {/* Wishlist Link */}
             <Link 
               to="/wishlist" 
               className="relative p-2 rounded-lg hover:bg-red-900/20 text-text/80 hover:text-red-500 transition"
               aria-label="Wishlist"
             >
              <FiHeart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-background text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

             {/* Cart Link */}
             <Link 
               to="/cart" 
               className="relative p-2 rounded-lg hover:bg-red-900/20 text-text/80 hover:text-red-500 transition"
               aria-label="Cart"
             >
              <FiShoppingCart className="w-5 h-5" />
              {totalCartQty > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-background text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {totalCartQty}
                </span>
              )}
            </Link>

            {/* Desktop User Section */}
            <div className="hidden md:flex items-center pl-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="text-xs text-text/80">
                    Hello, <span className="font-semibold text-red-500">{user?.name}</span>
                  </div>
                  {user?.isAdmin && (
                    <Link to="/admin/dashboard" className="text-xs bg-red-600/20 text-red-500 border border-red-600/30 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition">
                      Admin
                    </Link>
                  )}
                  <Button 
                    onClick={logout} 
                    variant="outline" 
                    size="sm" 
                    className="h-8 gap-1 border-gray-700 hover:border-red-500 hover:text-red-400"
                  >
                    <FiLogOut className="w-3.5 h-3.5" />
                    <span className="text-xs">Logout</span>
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button size="sm" className="h-8 gap-1">
                    <FiUser className="w-3.5 h-3.5" />
                    <span className="text-xs">Sign In</span>
                  </Button>
                </Link>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isMobileSearchOpen && (
          <form onSubmit={handleSearchSubmit} className="md:hidden pb-3 relative">
            <Input
              type="search"
              placeholder="Search gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 ps-8 pe-4 bg-black border-red-900/50 focus-visible:ring-red-500 w-full text-xs"
            />
            <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-2.5 text-muted pointer-events-none">
              <FiSearch className="w-4 h-4" />
            </div>
          </form>
        )}
      </div>
    </header>
  )
}

export default Header