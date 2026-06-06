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

  const totalCartQty = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="bg-surface/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Left Side: Logo & Main Navigation */}
          <div className="flex items-center gap-6 flex-1">
            
            {/* Mobile Menu Trigger (Popover) */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-9 md:hidden border border-gray-700 hover:bg-gray-800"
                  variant="ghost"
                  size="icon"
                >
                  <FiMenu className="w-5 h-5 text-text" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-64 p-3 md:hidden bg-surface border-gray-700">
                <nav className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Navigation</div>
                  <Link to="/products" className="py-1 text-sm font-medium hover:text-primary transition">All Products</Link>
                  
                  <div className="text-xs font-semibold text-muted uppercase tracking-wider mt-2 mb-1">Categories</div>
                  <div className="grid grid-cols-1 gap-1 pl-2 border-l border-gray-700">
                    {categoriesList.map(cat => (
                      <Link 
                        key={cat.slug} 
                        to={`/products?category=${cat.slug}`}
                        className="py-1 text-xs hover:text-primary transition"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 my-2" />
                  
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="text-xs text-muted">Signed in as <span className="text-text font-medium">{user?.name}</span></div>
                      {user?.isAdmin && (
                        <Link to="/admin/dashboard" className="block text-xs text-accent hover:underline">Admin Panel</Link>
                      )}
                      <Button onClick={logout} variant="destructive" size="sm" className="w-full justify-start gap-2">
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  ) : (
                    <Link to="/login">
                      <Button className="w-full text-xs" size="sm">Sign In</Button>
                    </Link>
                  )}
                </nav>
              </PopoverContent>
            </Popover>

            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-wider text-primary hover:opacity-90">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">GameGear</span>
            </Link>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  
                  {/* Products Link */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to="/products"
                        className={({ isActive }) => 
                          `text-sm font-medium px-3 py-2 rounded-md hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-text/80'}`
                        }
                      >
                        Products
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Categories Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-text/80 hover:text-primary bg-transparent py-2">
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-surface border border-gray-700 rounded-lg">
                        {categoriesList.map((cat) => (
                          <li key={cat.slug}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/products?category=${cat.slug}`}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-gray-800 transition"
                              >
                                <div className="text-sm font-semibold text-primary">{cat.name}</div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted mt-1">
                                  {cat.desc}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Deals Link */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/products?category=mouse"
                        className="text-sm font-medium px-3 py-2 text-text/80 hover:text-primary transition-colors"
                      >
                        Deals
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                </NavigationMenuList>
                <NavigationMenuViewport />
              </NavigationMenu>
            </div>
          </div>

          {/* Center Search Bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative max-w-xs w-full">
            <Input
              id={searchId}
              type="search"
              placeholder="Search gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 ps-8 pe-4 bg-background border-gray-700 hover:border-gray-600 focus-visible:ring-primary w-full text-xs"
            />
            <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-2.5 text-muted pointer-events-none">
              <FiSearch className="w-4 h-4" />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 text-text/80 hover:text-primary transition md:hidden"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-800 text-text/80 hover:text-primary transition"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* Wishlist Link */}
            <Link 
              to="/wishlist" 
              className="relative p-2 rounded-lg hover:bg-gray-800 text-text/80 hover:text-primary transition"
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
              className="relative p-2 rounded-lg hover:bg-gray-800 text-text/80 hover:text-primary transition"
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
                    Hello, <span className="font-semibold text-primary">{user?.name}</span>
                  </div>
                  {user?.isAdmin && (
                    <Link to="/admin/dashboard" className="text-xs bg-accent/20 text-accent border border-accent/30 px-2 py-1 rounded hover:bg-accent hover:text-white transition">
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
              className="h-9 ps-8 pe-4 bg-background border-gray-700 focus-visible:ring-primary w-full text-xs"
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