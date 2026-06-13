import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore, useAuthStore } from '../../context/store'

const NavBar = ({ currentPage, onNavigate, cartCount }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { isAuthenticated } = useAuthStore()
  const { cartItems } = useCartStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-[rgba(94,94,94,0.22)] border-b border-white/10 rounded-b-[36px] md:rounded-b-[46px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 md:h-[90px] flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="shrink-0 font-['Unbounded',sans-serif] font-extrabold text-xl md:text-3xl tracking-wider"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, #FB4949 0%, #CA2E2E 50%, #B22121 75%, #991414 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            INFERNO
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('products')}
              className={`font-['Unbounded',sans-serif] font-light text-[15px] tracking-wide transition-colors ${currentPage === 'products' ? 'text-[#FF4444]' : 'text-white hover:text-[#FF4444]'}`}
            >
              Products
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="font-['Unbounded',sans-serif] font-light text-[15px] tracking-wide text-white hover:text-[#FF4444] transition-colors"
            >
              Deals
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-[460px] mx-4">
            <div className="flex items-center w-full bg-[rgba(125,125,125,0.18)] border border-[rgba(216,216,216,0.25)] rounded-full overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 border-r border-[rgba(66,66,66,0.5)]">
                <Search className="text-[#484848]" size={16} />
                <span className="font-['Unbounded',sans-serif] text-[10px] text-[#424242] tracking-wide whitespace-nowrap">All Categories</span>
                <ChevronDown size={10} className="text-[#222]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent px-3 py-2 text-white text-sm font-['Unbounded',sans-serif] font-light placeholder-[#555] outline-none"
              />
            </div>
            <button className="bg-[#222] text-white font-['Unbounded',sans-serif] font-light text-sm tracking-wide px-5 py-2 rounded-full whitespace-nowrap hover:bg-[#333] transition-colors">Search</button>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              onClick={() => onNavigate('cart')}
              className="relative text-white hover:text-[#FF4444] transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF2C2C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <span className="hidden md:block font-['Unbounded',sans-serif] font-light text-sm text-white">Cart</span>
            <Link to={isAuthenticated ? '/profile' : '/login'} className="text-white hover:text-[#FF4444] transition-colors hidden md:block">
              <User size={22} />
            </Link>
            <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-4">
            <div className="flex items-center gap-2 bg-[rgba(125,125,125,0.18)] border border-[rgba(216,216,216,0.25)] rounded-full px-3 py-2">
              <Search size={16} className="text-[#484848]" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent text-white text-sm font-['Unbounded',sans-serif] font-light placeholder-[#555] outline-none"
              />
            </div>
            <div className="flex flex-col gap-3">
              {[
                ['home', 'Home'],
                ['products', 'Products'],
                ['products', 'Deals'],
                ['cart', `Cart (${cartCount})`],
              ].map(([page, label]) => (
                <button
                  key={label}
                  onClick={() => {
                    onNavigate(page)
                    setMobileOpen(false)
                  }}
                  className="font-['Unbounded',sans-serif] font-light text-sm text-white text-left py-1"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default NavBar
