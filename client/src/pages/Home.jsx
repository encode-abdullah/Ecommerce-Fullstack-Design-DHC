import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/product/ProductCard.jsx'
import { ProductCardSkeleton } from '../components/ui/Skeleton.jsx'
import { FiArrowRight, FiZap, FiShield, FiTruck } from 'react-icons/fi'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('/api/products/top')
        setFeaturedProducts(data)
      } catch (error) {
        console.error('Failed to fetch featured products')
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  const categories = [
    { name: 'Gaming Mice', slug: 'mouse', icon: '🖱️', color: 'from-cyan-500 to-blue-500' },
    { name: 'Keyboards', slug: 'keyboard', icon: '⌨️', color: 'from-purple-500 to-pink-500' },
    { name: 'Headsets', slug: 'headset', icon: '🎧', color: 'from-green-500 to-teal-500' },
    { name: 'Monitors', slug: 'monitor', icon: '🖥️', color: 'from-orange-500 to-red-500' },
    { name: 'Controllers', slug: 'controller', icon: '🎮', color: 'from-yellow-500 to-amber-500' },
    { name: 'Gaming Chairs', slug: 'chair', icon: '💺', color: 'from-indigo-500 to-violet-500' },
  ]

  return (
    <div className="space-y-16">
      <section className="relative py-20 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LEVEL UP YOUR SETUP
          </h1>
          <p className="text-xl text-muted mb-8">
            Premium gaming gear engineered for champions
          </p>
          <Link 
            to="/products"
            className="inline-flex items-center space-x-2 bg-primary text-background px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg"
          >
            <span>Shop Now</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link 
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-xl bg-surface p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-medium">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary hover:underline flex items-center">
            View All <FiArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4].map(i => <ProductCardSkeleton key={i} />)}
            </>
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-xl p-6 flex items-center space-x-4">
          <div className="p-3 bg-primary/20 rounded-lg">
            <FiZap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Lightning Fast Shipping</h3>
            <p className="text-muted text-sm">2-3 day delivery on orders</p>
          </div>
        </div>
        
        <div className="bg-surface rounded-xl p-6 flex items-center space-x-4">
          <div className="p-3 bg-accent/20 rounded-lg">
            <FiShield className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold">Warranty Protected</h3>
            <p className="text-muted text-sm">2 year guarantee on all products</p>
          </div>
        </div>
        
        <div className="bg-surface rounded-xl p-6 flex items-center space-x-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <FiTruck className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h3 className="font-semibold">Easy Returns</h3>
            <p className="text-muted text-sm">30 day money back guarantee</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home