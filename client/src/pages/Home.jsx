import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import { getProducts } from '../services/api.js'
import { ProductCardSkeleton } from '../components/ui/Skeleton.jsx'
import { FiZap, FiShield, FiTruck, FiCpu, FiMessageSquare, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import ParticleHero from '../components/hero/ParticleHero.jsx'

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
      <ParticleHero
        title="FLUX"
        subtitle="Digital Inferno"
        description="The Ultimate Catalyst for Your Setup"
        primaryButton={{
          text: "Shop Keyboards",
          onClick: () => navigate("/products?category=keyboard"),
        }}
        secondaryButton={{
          text: "Browse All Gear",
          onClick: () => navigate("/products"),
        }}
        particleCount={15}
      />

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat, i) => (
          <button key={i} onClick={() => navigate(cat.slug ? `/products?category=${cat.slug}` : '/products')}
            className="px-4 py-2 bg-black border border-red-900/50 text-red-200 rounded-full text-sm whitespace-nowrap hover:border-red-500 hover:text-white transition-colors">
            {cat.name}
          </button>
        ))}
      </div>

      {/* Flash Deals */}
      <section className="bg-black border border-red-900/30 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-4">FLASH DEALS</h2>
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
        <section className="bg-black border border-red-900/30 rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">PRO ACCESSORIES</h3>
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

        <section className="bg-black border border-red-900/30 rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">BATTLE STATION</h3>
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
      <section className="bg-black border border-red-900/30 rounded-3xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">REQUEST CUSTOM CONFIGS</h3>
        <form onSubmit={handleInquirySubmit} className="flex flex-col sm:flex-row gap-2">
          <input value={inquiryText} onChange={e => setInquiryText(e.target.value)} placeholder="What specs are you looking for?" className="flex-grow bg-black border border-red-900/50 text-white rounded-lg px-3 py-2 placeholder:text-red-400/40 focus:border-red-500 focus:outline-none" />
          <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-colors">Send</button>
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
        <div className="bg-black border border-red-900/30 rounded-xl p-4 flex items-center gap-3">
          <FiZap className="text-red-500 w-8 h-8" />
          <div>
            <h4 className="font-bold text-white">Fast Shipping</h4>
            <p className="text-red-300/60 text-sm">24hr dispatch</p>
          </div>
        </div>
        <div className="bg-black border border-red-900/30 rounded-xl p-4 flex items-center gap-3">
          <FiShield className="text-orange-500 w-8 h-8" />
          <div>
            <h4 className="font-bold text-white">Warranty</h4>
            <p className="text-red-300/60 text-sm">3-year backing</p>
          </div>
        </div>
        <div className="bg-black border border-red-900/30 rounded-xl p-4 flex items-center gap-3">
          <FiTruck className="text-red-400 w-8 h-8" />
          <div>
            <h4 className="font-bold text-white">Easy Returns</h4>
            <p className="text-red-300/60 text-sm">30-day trial</p>
          </div>
        </div>
      </div>
    </div>
  )
}