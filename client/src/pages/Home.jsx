import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import { getProducts } from '../services/api.js'
import { ProductCardSkeleton } from '../components/ui/Skeleton.jsx'
import { FiZap, FiShield, FiTruck, FiCpu, FiMessageSquare, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { Button } from '../components-ui/ui-button.jsx'

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Countdown timer state (initialized to 11 Hours, 45 Minutes, 20 Seconds)
  const [timer, setTimer] = useState({ hours: 11, minutes: 45, seconds: 20 })

  // Inquiry form states
  const [inquiryText, setInquiryText] = useState('')
  const [inquiryCategory, setInquiryCategory] = useState('mouse')
  const [inquiryBudget, setInquiryBudget] = useState('200')

  useEffect(() => {
    setLoading(true)
    getProducts().then(data => {
      setProducts(data.products)
      setLoading(false)
    })
  }, [])

  // Timer Tick Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          // Reset timer back to 12 hours once reached zero
          return { hours: 12, minutes: 0, seconds: 0 }
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const categories = [
    { name: 'All Gears', slug: '', icon: '🎮' },
    { name: 'Mice', slug: 'mouse', icon: '🖱️' },
    { name: 'Keyboards', slug: 'keyboard', icon: '⌨️' },
    { name: 'Headsets', slug: 'headset', icon: '🎧' },
    { name: 'Monitors', slug: 'monitor', icon: '🖥️' },
    { name: 'Controllers', slug: 'controller', icon: '🕹️' },
    { name: 'Chairs', slug: 'chair', icon: '💺' },
  ]

  const handleInquirySubmit = (e) => {
    e.preventDefault()
    if (!inquiryText.trim()) {
      toast.error('Please enter details of your setup request')
      return
    }
    toast.success(`Inquiry submitted! Our gear specialist will contact you regarding your $${inquiryBudget} budget.`)
    setInquiryText('')
  }

  // Filter products for Deals & Sections
  const dealsProducts = products.slice(0, 4).map((p, idx) => ({
    ...p,
    discount: idx % 2 === 0 ? '-25%' : '-15%'
  }))
  
  const accessoriesProducts = products.filter(p => ['mouse', 'keyboard', 'headset'].includes(p.category)).slice(0, 3)
  const setupProducts = products.filter(p => ['chair', 'monitor', 'controller'].includes(p.category)).slice(0, 3)
  const recommendedProducts = products.slice(4)

  return (
    <div className="space-y-12">
      {/* Hero Section - Gaming Themed */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-background via-surface to-background rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            GAMEGEAR
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mb-8">
            Elite gaming peripherals engineered for champions. Dominate every match with pro-grade gear.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate("/products?category=keyboard")}
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Shop Keyboards
            </button>
            <button 
              onClick={() => navigate("/products")}
              className="px-8 py-3 border border-gray-700 text-text rounded-lg font-semibold hover:border-primary transition"
            >
              Browse All Gear
            </button>
          </div>
        </div>
      </section>

      {/* Horizontal Category Pill Bar */}
      <section className="bg-surface/50 border border-gray-700/60 p-4 rounded-2xl">
        <div className="flex items-center space-x-3 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => navigate(cat.slug ? `/products?category=${cat.slug}` : '/products')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition whitespace-nowrap ${
                i === 0 
                  ? 'bg-primary/20 border-primary text-primary hover:bg-primary/30' 
                  : 'bg-surface border-gray-700 text-text/80 hover:border-primary/50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Deals & Offers Section (with live countdown timer) */}
      <section className="bg-surface border border-gray-700/60 rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-700/60 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold flex items-center gap-2 tracking-wide text-text/90">
              <FiZap className="w-7 h-7 text-primary fill-primary animate-pulse" />
              <span>FLASH DEALS & OFFERS</span>
            </h2>
            <p className="text-muted text-sm mt-1">Limited quantities available. Grab yours before time expires!</p>
          </div>
          
          {/* Ticking Countdown Timer */}
          <div className="flex items-center space-x-2 text-center">
            <div className="bg-background border border-gray-700 px-3 py-2 rounded-lg min-w-[50px]">
              <span className="block text-xl font-bold text-primary">{String(timer.hours).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase text-muted font-medium">Hrs</span>
            </div>
            <span className="text-primary font-bold text-xl">:</span>
            <div className="bg-background border border-gray-700 px-3 py-2 rounded-lg min-w-[50px]">
              <span className="block text-xl font-bold text-primary">{String(timer.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase text-muted font-medium">Min</span>
            </div>
            <span className="text-primary font-bold text-xl">:</span>
            <div className="bg-background border border-gray-700 px-3 py-2 rounded-lg min-w-[50px]">
              <span className="block text-xl font-bold text-red-500">{String(timer.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase text-muted font-medium">Sec</span>
            </div>
          </div>
        </div>

        {/* Deals products list */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4].map(i => <ProductCardSkeleton key={i} />)}
            </>
          ) : (
            dealsProducts.map(product => (
              <div key={product._id} className="relative group bg-background border border-gray-700/60 rounded-xl overflow-hidden">
                <Link to={`/products/${product._id}`}>
                  <div className="h-40 relative bg-surface overflow-hidden">
                    <img 
                      src={product.images[0] || 'https://placehold.co/600x400/0f172a/06b6d4?text=Gear'} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md">
                      {product.discount}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-text/80 truncate">{product.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-primary font-bold text-sm">${(product.price * 0.75).toFixed(2)}</span>
                      <span className="text-xs text-muted line-through">${product.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Two Column Collection Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pro Gaming Accessories */}
        <section className="bg-surface/50 border border-gray-700/60 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-text/90 tracking-wide">PRO ACCESSORIES</h3>
              <p className="text-xs text-muted">Mice, Mechanical Keyboards, Headsets</p>
            </div>
            <Link to="/products?category=keyboard" className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold">
              <span>Explore Accessories</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {loading ? (
              <div className="col-span-3 text-center py-6">Loading...</div>
            ) : (
              accessoriesProducts.map(p => (
                <div key={p._id} className="bg-background border border-gray-700/40 rounded-xl p-2.5 text-center hover:border-primary/50 transition">
                  <Link to={`/products/${p._id}`}>
                    <img src={p.images[0]} alt={p.name} className="w-full h-20 object-cover rounded-lg mb-2" />
                    <span className="block text-[11px] font-bold text-text/90 truncate">{p.name}</span>
                    <span className="block text-xs font-semibold text-primary mt-1">${p.price}</span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Battle Station Setup */}
        <section className="bg-surface/50 border border-gray-700/60 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-text/90 tracking-wide">BATTLE STATION SETUP</h3>
              <p className="text-xs text-muted">Ergonomic Chairs, IPS Monitors, Controllers</p>
            </div>
            <Link to="/products?category=monitor" className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold">
              <span>Configure Station</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {loading ? (
              <div className="col-span-3 text-center py-6">Loading...</div>
            ) : (
              setupProducts.map(p => (
                <div key={p._id} className="bg-background border border-gray-700/40 rounded-xl p-2.5 text-center hover:border-primary/50 transition">
                  <Link to={`/products/${p._id}`}>
                    <img src={p.images[0]} alt={p.name} className="w-full h-20 object-cover rounded-lg mb-2" />
                    <span className="block text-[11px] font-bold text-text/90 truncate">{p.name}</span>
                    <span className="block text-xs font-semibold text-primary mt-1">${p.price}</span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

      </div>

      {/* Supplier Inquiry Banner (Custom Setup Specs Request) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-purple-600/10 to-transparent border border-gray-700/60 rounded-3xl p-6 md:p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold flex items-center gap-2 tracking-wide text-text">
              <FiCpu className="w-6 h-6 text-primary" />
              <span>REQUEST CUSTOM BATTLE STATION CONFIGS</span>
            </h3>
            <p className="text-muted text-sm mt-2 leading-relaxed">
              Looking for a tailored hardware recommendations? Specify your primary setup category, budget, and description. Our gaming gear expert will select a custom config for you.
            </p>
          </div>
          
          {/* Inquiry Form */}
          <form onSubmit={handleInquirySubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-md bg-surface border border-gray-700 p-4 rounded-2xl shadow-xl">
            <div className="flex flex-col gap-2 flex-grow">
              <div className="flex gap-2">
                <select
                  value={inquiryCategory}
                  onChange={(e) => setInquiryCategory(e.target.value)}
                  className="bg-background border border-gray-700 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text font-medium"
                >
                  <option value="mouse">Mice</option>
                  <option value="keyboard">Keyboard</option>
                  <option value="headset">Headset</option>
                  <option value="monitor">Monitor</option>
                  <option value="setup">Full Rig</option>
                </select>
                
                <select
                  value={inquiryBudget}
                  onChange={(e) => setInquiryBudget(e.target.value)}
                  className="bg-background border border-gray-700 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text font-medium"
                >
                  <option value="100">Under $100</option>
                  <option value="200">Under $200</option>
                  <option value="500">Under $500</option>
                  <option value="1000">$1000+</option>
                </select>
              </div>

              <input
                type="text"
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="What specs/features are you looking for?..."
                className="bg-background border border-gray-700 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-text placeholder:text-muted"
              />
            </div>
            <Button type="submit" className="sm:self-end h-9 font-semibold text-xs gap-1.5 shrink-0">
              <FiMessageSquare className="w-3.5 h-3.5" />
              <span>Send Specs</span>
            </Button>
          </form>
        </div>
      </section>

      {/* Recommended Items Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold tracking-wide text-text/90">RECOMMENDED GEAR FOR YOU</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4].map(i => <ProductCardSkeleton key={i} />)}
            </>
          ) : (
            recommendedProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Brand Guarantees */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface/50 border border-gray-700/40 rounded-xl p-5 flex items-center space-x-4">
          <div className="p-3 bg-primary/15 rounded-lg border border-primary/20">
            <FiZap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text/90">Ultra Fast Shipping</h4>
            <p className="text-muted text-xs mt-0.5">Dispatched within 24 hours of checkout</p>
          </div>
        </div>
        
        <div className="bg-surface/50 border border-gray-700/40 rounded-xl p-5 flex items-center space-x-4">
          <div className="p-3 bg-purple-500/15 rounded-lg border border-purple-500/20">
            <FiShield className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text/90">Pro Gear Warranty</h4>
            <p className="text-muted text-xs mt-0.5">3-year replacement backing included</p>
          </div>
        </div>
        
        <div className="bg-surface/50 border border-gray-700/40 rounded-xl p-5 flex items-center space-x-4">
          <div className="p-3 bg-green-500/15 rounded-lg border border-green-500/20">
            <FiTruck className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text/90">Hassle-Free Returns</h4>
            <p className="text-muted text-xs mt-0.5">30-day trial with pre-paid return label</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home