import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products.js'
import { ArrowLeft, Star, ShoppingCart, Zap, Shield, Truck } from 'lucide-react'
import { useCartStore } from '../context/store'

const ProductDetailPage = ({ productId, onBack, onAddToCart, onNavigate }) => {
  const product = products.find((p) => p.id === Number(productId))
  if (!product) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="font-['Unbounded',sans-serif] text-white/50 mb-4">Product not found.</p>
          <button onClick={onBack} className="text-[#FF4444] font-['Unbounded',sans-serif] font-light text-sm">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null

  return (
    <div className="bg-black min-h-screen">
      <div className="pt-24 md:pt-28 px-4 md:px-12 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/50 hover:text-white font-['Unbounded',sans-serif] font-light text-xs tracking-wide mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <div className="relative">
              <div className="aspect-square bg-[#111] rounded-3xl overflow-hidden border border-white/10">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {discount && <div className="absolute top-4 left-4 bg-[#FF2C2C] text-white font-['Unbounded',sans-serif] font-medium text-xs px-3 py-1.5 rounded-full">-{discount}% OFF</div>}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <p className="font-['Unbounded',sans-serif] font-light text-[#FF4444] text-xs tracking-widest uppercase mb-2">{product.category}</p>
                <h1 className="font-['Unbounded',sans-serif] font-medium text-white text-2xl md:text-3xl leading-snug mb-3">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-[#FF4444] text-[#FF4444]' : 'text-gray-600'} />
                    ))}
                  </div>
                  <span className="font-['Unbounded',sans-serif] font-light text-[#FF4444] text-xs">{product.rating}</span>
                  <span className="font-['Unbounded',sans-serif] font-light text-white/40 text-xs">({product.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-4 py-4 border-t border-b border-white/10">
                <span
                  className="font-['Unbounded',sans-serif] font-medium text-3xl"
                  style={{
                    background: 'radial-gradient(ellipse, #FF4D4D 0%, #CC2222 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="font-['Unbounded',sans-serif] font-light text-white/40 text-lg line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <p className="font-['Unbounded',sans-serif] font-light text-white/60 text-sm leading-relaxed">{product.description}</p>

              <div>
                <p className="font-['Unbounded',sans-serif] font-medium text-white text-xs tracking-wide mb-3 uppercase">Key Features</p>
                <ul className="space-y-2">
                  {(product.features || []).map((feat) => (
                    <li key={feat} className="flex items-center gap-2 font-['Unbounded',sans-serif] font-light text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF2C2C] shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-500'}`} />
                <span className="font-['Unbounded',sans-serif] font-light text-sm text-white/60">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#FF2C2C] hover:bg-[#CC2020] disabled:bg-[#333] disabled:text-[#666] text-white font-['Unbounded',sans-serif] font-medium text-sm py-4 rounded-full transition-colors tracking-wide"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    onAddToCart(product)
                    onNavigate('cart')
                  }}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 border border-[#FF2C2C]/40 hover:border-[#FF2C2C] disabled:border-white/10 disabled:text-white/30 text-white font-['Unbounded',sans-serif] font-light text-sm py-4 rounded-full transition-colors tracking-wide"
                >
                  <Zap size={16} className="text-[#FF4444]" />
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Truck, label: 'Free Shipping', sub: 'On orders $50+' },
                  { icon: Shield, label: 'Warranty', sub: '1 Year Included' },
                  { icon: Zap, label: 'Fast Delivery', sub: '2-5 Business Days' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center gap-1 bg-[#111] rounded-xl p-3 border border-white/10">
                    <Icon size={16} className="text-[#FF4444]" />
                    <p className="font-['Unbounded',sans-serif] font-medium text-white text-[9px] text-center">{label}</p>
                    <p className="font-['Unbounded',sans-serif] font-light text-white/40 text-[9px] text-center">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div>
              <div className="w-full h-px mb-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,44,44,0.4), transparent)' }} />
              <h2 className="font-['Unbounded',sans-serif] font-medium text-white text-xl md:text-2xl tracking-wide mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF2C2C]/40 transition-colors cursor-pointer flex gap-4 p-4"
                    onClick={() => onNavigate(`product-${p.id}`)}
                  >
                    <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <p className="font-['Unbounded',sans-serif] font-medium text-white text-xs leading-snug line-clamp-2">{p.name}</p>
                      <span
                        className="font-['Unbounded',sans-serif] font-medium text-sm"
                        style={{
                          background: 'radial-gradient(ellipse, #FF4D4D 0%, #CC2222 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        ${p.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
