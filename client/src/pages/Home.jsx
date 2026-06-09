import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import { getProducts } from '../services/api.js'
import { FiZap, FiShield, FiTruck } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { SparklesCore } from '../components/ui/SparklesCore.jsx'

export default function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [timer, setTimer] = useState({ hours: 11, minutes: 45, seconds: 20 })
  const [inquiryText, setInquiryText] = useState('')

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data.products)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        else if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        else if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 12, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const categories = [
    { name: 'All Gears', slug: '' },
    { name: 'Mice', slug: 'mouse' },
    { name: 'Keyboards', slug: 'keyboard' },
    { name: 'Headsets', slug: 'headset' },
    { name: 'Monitors', slug: 'monitor' },
    { name: 'Controllers', slug: 'controller' },
    { name: 'Chairs', slug: 'chair' },
  ]

  const handleInquirySubmit = (e) => {
    e.preventDefault()
    if (!inquiryText.trim()) {
      toast.error('Please enter your request')
      return
    }
    toast.success('Inquiry submitted!')
    setInquiryText('')
  }

  const dealsProducts = products.slice(0, 4).map((p, idx) => ({ ...p, discount: idx % 2 === 0 ? '-25%' : '-15%' }))
  const accessoriesProducts = products.filter(p => ['mouse', 'keyboard', 'headset'].includes(p.category)).slice(0, 3)
  const setupProducts = products.filter(p => ['chair', 'monitor', 'controller'].includes(p.category)).slice(0, 3)
  const recommendedProducts = products.slice(4)

  return (
    <div className="space-y-12">
      <section className="relative w-full min-h-[70vh] overflow-hidden">
        <SparklesCore
          background="#000000"
          minSize={0.6}
          maxSize={1.4}
          speed={1}
          particleColor="#ef4444"
          particleDensity={120}
          className="absolute inset-0"
        />
        <div className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4">
            FLUX
          </h1>
          <p className="text-red-200/80 text-lg md:text-2xl font-light tracking-[0.25em] uppercase mb-6">
            Digital Inferno
          </p>
          <p className="text-red-100/60 max-w-2xl mx-auto mb-10">
            The Ultimate Catalyst for Your Setup
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/products?category=keyboard')}
              className="px-10 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition"
            >
              Shop Keyboards
            </button>
            <button
              onClick={() => navigate('/products')}
              className="px-10 py-3 border border-white/20 text-white rounded-full font-semibold hover:border-red-400 hover:text-red-400 transition backdrop-blur-sm"
            >
              Browse All Gear
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <nav aria-label="Categories" className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat, i) => (
          <button key={i} onClick={() => navigate(cat.slug ? `/products?category=${cat.slug}` : '/products')}
            className="px-4 py-2 bg-black border border-red-900/50 text-red-200 rounded-full text-sm whitespace-nowrap hover:border-red-500 hover:text-white transition-colors">
            {cat.name}
          </button>
        ))}
      </nav>

      {/* Flash Deals */}
      <section aria-labelledby="flash-deals-heading">
        <h2 id="flash-deals-heading" className="text-2xl font-bold text-red-500 mb-4">FLASH DEALS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-4">Loading...</div>
          ) : (
            dealsProducts.map(product => (
              <Link key={product._id} to={`/products/${product._id}`} className="bg-black border border-red-900/30 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors">
                <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-white text-sm">{product.name}</h3>
                  <p className="text-red-500 font-bold">${(product.price * 0.75).toFixed(2)}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Two Column Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section aria-labelledby="pro-accessories-heading" className="bg-black border border-red-900/30 rounded-3xl p-6">
          <h3 id="pro-accessories-heading" className="text-xl font-bold text-white mb-4">PRO ACCESSORIES</h3>
          <div className="grid grid-cols-3 gap-2">
            {accessoriesProducts.map(p => (
              <Link key={p._id} to={`/products/${p._id}`} className="bg-black border border-red-900/30 rounded-lg p-2 text-center hover:border-red-500/50 transition-colors">
                <img src={p.images[0]} alt={p.name} className="w-full h-16 object-cover rounded mb-1" />
                <span className="text-white text-xs block truncate">{p.name}</span>
                <span className="text-red-500 text-xs font-bold">${p.price}</span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="battle-station-heading" className="bg-black border border-red-900/30 rounded-3xl p-6">
          <h3 id="battle-station-heading" className="text-xl font-bold text-white mb-4">BATTLE STATION</h3>
          <div className="grid grid-cols-3 gap-2">
            {setupProducts.map(p => (
              <Link key={p._id} to={`/products/${p._id}`} className="bg-black border border-red-900/30 rounded-lg p-2 text-center hover:border-red-500/50 transition-colors">
                <img src={p.images[0]} alt={p.name} className="w-full h-16 object-cover rounded mb-1" />
                <span className="text-white text-xs block truncate">{p.name}</span>
                <span className="text-red-500 text-xs font-bold">${p.price}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Inquiry Form */}
      <section aria-labelledby="inquiry-heading" className="bg-black border border-red-900/30 rounded-3xl p-6">
        <h3 id="inquiry-heading" className="text-xl font-bold text-white mb-4">REQUEST CUSTOM CONFIGS</h3>
        <form onSubmit={handleInquirySubmit} className="flex flex-col sm:flex-row gap-2">
          <label htmlFor="inquiry-input" className="sr-only">What specs are you looking for?</label>
          <input id="inquiry-input" value={inquiryText} onChange={e => setInquiryText(e.target.value)} placeholder="What specs are you looking for?" className="flex-grow bg-black border border-red-900/50 text-white rounded-lg px-3 py-2 placeholder:text-red-400/40 focus:border-red-500 focus:outline-none" />
          <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-colors">Send</button>
        </form>
      </section>

      {/* Recommended */}
      <section aria-labelledby="recommended-heading">
        <h3 id="recommended-heading" className="text-2xl font-bold text-white mb-6">RECOMMENDED GEAR</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? <div>Loading...</div> : recommendedProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Guarantees */}
      <section aria-label="Service guarantees">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-black border border-red-900/30 rounded-xl p-4 flex items-center gap-3">
            <FiZap className="text-red-500 w-8 h-8" aria-hidden="true" />
            <div>
              <h4 className="font-bold text-white">Fast Shipping</h4>
              <p className="text-red-300/60 text-sm">24hr dispatch</p>
            </div>
          </article>
          <article className="bg-black border border-red-900/30 rounded-xl p-4 flex items-center gap-3">
            <FiShield className="text-orange-500 w-8 h-8" aria-hidden="true" />
            <div>
              <h4 className="font-bold text-white">Warranty</h4>
              <p className="text-red-300/60 text-sm">3-year backing</p>
            </div>
          </article>
          <article className="bg-black border border-red-900/30 rounded-xl p-4 flex items-center gap-3">
            <FiTruck className="text-red-400 w-8 h-8" aria-hidden="true" />
            <div>
              <h4 className="font-bold text-white">Easy Returns</h4>
              <p className="text-red-300/60 text-sm">30-day trial</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
