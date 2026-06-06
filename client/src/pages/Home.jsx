import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import { getProducts } from '../services/api.js'
import { ProductCardSkeleton } from '../components/ui/Skeleton.jsx'
import { FiZap, FiShield, FiTruck, FiCpu, FiMessageSquare, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'

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
      {/* Hero Section */}
      <section className="min-h-[70vh] bg-slate-900 rounded-3xl flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            GAMEGEAR
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl">Elite gaming peripherals engineered for champions.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate("/products?category=keyboard")} className="px-8 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-400">
              Shop Keyboards
            </button>
            <button onClick={() => navigate("/products")} className="px-8 py-3 border border-slate-700 text-white rounded-lg font-semibold">
              Browse All Gear
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat, i) => (
          <button key={i} onClick={() => navigate(cat.slug ? `/products?category=${cat.slug}` : '/products')}
            className="px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-full text-sm whitespace-nowrap">
            {cat.name}
          </button>
        ))}
      </div>

      {/* Flash Deals */}
      <section className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-cyan-500 mb-4">FLASH DEALS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-4">Loading...</div>
          ) : (
            dealsProducts.map(product => (
              <Link key={product._id} to={`/products/${product._id}`} className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-white text-sm">{product.name}</h3>
                  <p className="text-cyan-500 font-bold">${(product.price * 0.75).toFixed(2)}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Two Column Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">PRO ACCESSORIES</h3>
          <div className="grid grid-cols-3 gap-2">
            {accessoriesProducts.map(p => (
              <Link key={p._id} to={`/products/${p._id}`} className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-center">
                <img src={p.images[0]} alt={p.name} className="w-full h-16 object-cover rounded mb-1" />
                <span className="text-white text-xs block truncate">{p.name}</span>
                <span className="text-cyan-500 text-xs font-bold">${p.price}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">BATTLE STATION</h3>
          <div className="grid grid-cols-3 gap-2">
            {setupProducts.map(p => (
              <Link key={p._id} to={`/products/${p._id}`} className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-center">
                <img src={p.images[0]} alt={p.name} className="w-full h-16 object-cover rounded mb-1" />
                <span className="text-white text-xs block truncate">{p.name}</span>
                <span className="text-cyan-500 text-xs font-bold">${p.price}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Inquiry Form */}
      <section className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">REQUEST CUSTOM CONFIGS</h3>
        <form onSubmit={handleInquirySubmit} className="flex flex-col sm:flex-row gap-2">
          <input value={inquiryText} onChange={e => setInquiryText(e.target.value)} placeholder="What specs are you looking for?" className="flex-grow bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2" />
          <button type="submit" className="px-6 py-2 bg-cyan-500 text-white rounded-lg font-semibold">Send</button>
        </form>
      </section>

      {/* Recommended */}
      <section>
        <h3 className="text-2xl font-bold text-white mb-6">RECOMMENDED GEAR</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? <div>Loading...</div> : recommendedProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
          <FiZap className="text-cyan-500 w-8 h-8" />
          <div>
            <h4 className="font-bold text-white">Fast Shipping</h4>
            <p className="text-slate-400 text-sm">24hr dispatch</p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
          <FiShield className="text-purple-500 w-8 h-8" />
          <div>
            <h4 className="font-bold text-white">Warranty</h4>
            <p className="text-slate-400 text-sm">3-year backing</p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
          <FiTruck className="text-green-500 w-8 h-8" />
          <div>
            <h4 className="font-bold text-white">Easy Returns</h4>
            <p className="text-slate-400 text-sm">30-day trial</p>
          </div>
        </div>
      </div>
    </div>
  )
}