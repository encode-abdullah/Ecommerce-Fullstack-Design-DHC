import Footer from '../components/figma/Footer.jsx'
import { deals, featured, products } from '../data/products.js'
import ProductCard from '../components/figma/ProductCard.jsx'
import { ArrowRight, Zap } from 'lucide-react'

const HomePage = ({ onNavigate, onViewProduct, onAddToCart }) => {
  const cartCount = 0

  return (
    <div className="bg-black min-h-screen">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(141,0,2,0.98) 0%, rgba(70,0,1,0.99) 40%, rgba(0,0,0,1) 75%)',
          }}
        />
        <img
          src="/Background.jpg"
          alt="Inferno background"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        </div>

        <div className="relative z-10 text-center px-4 pt-24 pb-16">
          <div className="mb-6">
            <span className="inline-block font-['Unbounded',sans-serif] font-medium text-xs tracking-[0.3em] text-[#FF6666] uppercase mb-4">
              Elite Gear · Infinite Glory
            </span>
          </div>
          <h1
            className="font-['Unbounded',sans-serif] font-extrabold text-6xl sm:text-8xl md:text-[96px] tracking-[0.2em] mb-6"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, #FF4D4D 0%, #DF3A3A 25%, #BF2727 50%, #9E1313 75%, #7E0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            INFERNO
          </h1>
          <div
            className="w-[300px] sm:w-[500px] md:w-[672px] h-px mx-auto mb-8"
            style={{
              background: 'linear-gradient(90deg, rgba(51,0,0,0.26) 0%, #FF2C2C 50%, rgba(51,0,0,0.26) 100%)',
            }}
          />
          <p className="font-['Unbounded',sans-serif] font-light text-white/70 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Premium gaming gear for elite players. Exclusive deals, top-tier brands, delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 bg-[#FF2C2C] hover:bg-[#CC2020] text-white font-['Unbounded',sans-serif] font-medium text-sm px-8 py-3.5 rounded-full transition-colors tracking-wide"
            >
              Shop Now
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 border border-[#FF2C2C]/40 hover:border-[#FF2C2C] text-white font-['Unbounded',sans-serif] font-light text-sm px-8 py-3.5 rounded-full transition-colors tracking-wide"
            >
              <Zap size={16} className="text-[#FF4444]" />
              View Deals
            </button>
          </div>

          <div className="mt-12 inline-block bg-gradient-to-r from-[#921010] to-black/80 border border-[#FF2C2C]/30 rounded-2xl px-8 py-4">
            <p className="font-['Unbounded',sans-serif] font-medium text-white text-xs tracking-widest uppercase mb-1">Limited Time</p>
            <p
              className="font-['Unbounded',sans-serif] font-extrabold text-3xl tracking-wide"
              style={{
                background: 'radial-gradient(ellipse, #FF4D4D 0%, #BA0808 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              30% OFF
            </p>
            <p className="font-['Unbounded',sans-serif] font-light text-white/60 text-xs mt-1">On all items shipping to Pakistan</p>
            <p className="font-['Unbounded',sans-serif] font-light text-[#FF6666] text-xs mt-1">
              Use code <span className="font-medium">"EncodeAbdullah"</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-black px-4 md:px-12 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-['Unbounded',sans-serif] font-medium text-white text-3xl md:text-4xl tracking-wide">Top Deals</h2>
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 text-[#FF4444] font-['Unbounded',sans-serif] font-light text-xs tracking-wide hover:text-white transition-colors"
            >
              View All
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} onView={onViewProduct} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </div>

      <div
        className="relative px-4 md:px-12 py-16"
        style={{ background: 'linear-gradient(180deg, #000 0%, rgba(80,0,0,0.3) 50%, #000 100%)' }}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-['Unbounded',sans-serif] font-medium text-white text-3xl md:text-4xl tracking-wide">Featured</h2>
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 text-[#FF4444] font-['Unbounded',sans-serif] font-light text-xs tracking-wide hover:text-white transition-colors"
            >
              View All
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} onView={onViewProduct} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black px-4 md:px-12 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-['Unbounded',sans-serif] font-medium text-white text-2xl md:text-3xl tracking-wide">All Products</h2>
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 text-[#FF4444] font-['Unbounded',sans-serif] font-light text-xs tracking-wide hover:text-white transition-colors"
            >
              Browse All
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onView={onViewProduct} onAddToCart={onAddToCart} />
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('products')}
              className="bg-[#1a1a1a] border border-[#FF2C2C]/30 hover:border-[#FF2C2C] text-white font-['Unbounded',sans-serif] font-light text-sm px-10 py-3.5 rounded-full transition-colors tracking-wide"
            >
              View All Products
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage
