import { useState } from 'react'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { products, categories } from '../data/products.js'
import ProductCard from '../components/figma/ProductCard.jsx'
import Footer from '../components/figma/Footer.jsx'

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Best Rated', 'Most Reviewed']

const ProductListingPage = ({ onViewProduct, onAddToCart, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Featured')
  const [showFilters, setShowFilters] = useState(false)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [inStockOnly, setInStockOnly] = useState(false)

  const filtered = products
    .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
    .filter((p) => p.price <= maxPrice)
    .filter((p) => !inStockOnly || p.inStock)
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price
      if (sortBy === 'Price: High to Low') return b.price - a.price
      if (sortBy === 'Best Rated') return b.rating - a.rating
      if (sortBy === 'Most Reviewed') return b.reviews - a.reviews
      return 0
    })

  return (
    <div className="bg-black min-h-screen">
      <div className="pt-28 md:pt-32 pb-10 px-4 md:px-12" style={{ background: 'linear-gradient(180deg, rgba(80,0,0,0.4) 0%, transparent 100%)' }}>
        <div className="max-w-[1440px] mx-auto">
          <h1 className="font-['Unbounded',sans-serif] font-medium text-white text-3xl md:text-4xl tracking-wide mb-2">Products</h1>
          <p className="font-['Unbounded',sans-serif] font-light text-white/50 text-sm">{filtered.length} items found</p>
        </div>
      </div>

      <div className="px-4 md:px-12 pb-16">
        <div className="max-w-[1440px] mx-auto flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-5">
                <h3 className="font-['Unbounded',sans-serif] font-medium text-white text-sm tracking-wide">Filters</h3>
                <div>
                  <p className="font-['Unbounded',sans-serif] font-light text-white/50 text-xs tracking-wide mb-3 uppercase">Category</p>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left font-['Unbounded',sans-serif] font-light text-sm py-1.5 px-3 rounded-lg transition-colors ${
                          selectedCategory === cat ? 'bg-[#FF2C2C]/20 text-[#FF4444] border border-[#FF2C2C]/30' : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-['Unbounded',sans-serif] font-light text-white/50 text-xs tracking-wide mb-3 uppercase">Max Price</p>
                  <input
                    type="range"
                    min={50}
                    max={1000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#FF2C2C]"
                  />
                  <p className="font-['Unbounded',sans-serif] font-light text-[#FF4444] text-xs mt-1">${maxPrice}</p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#FF2C2C]"
                  />
                  <label htmlFor="inStock" className="font-['Unbounded',sans-serif] font-light text-white/70 text-sm cursor-pointer">
                    In Stock Only
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 text-white font-['Unbounded',sans-serif] font-light text-sm border border-white/20 px-4 py-2 rounded-full"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>

              <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 flex-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 font-['Unbounded',sans-serif] font-light text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      selectedCategory === cat ? 'bg-[#FF2C2C]/20 text-[#FF4444] border-[#FF2C2C]/50' : 'text-white/60 border-white/20 hover:border-white/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#111] border border-white/20 text-white font-['Unbounded',sans-serif] font-light text-xs px-4 py-2 pr-8 rounded-full cursor-pointer outline-none hover:border-white/40 transition-colors"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#111]">
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
              </div>
            </div>

            {showFilters && (
              <div className="lg:hidden bg-[#111] border border-white/10 rounded-2xl p-4 mb-6 space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`font-['Unbounded',sans-serif] font-light text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedCategory === cat ? 'bg-[#FF2C2C]/20 text-[#FF4444] border-[#FF2C2C]/50' : 'text-white/60 border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div>
                  <p className="font-['Unbounded',sans-serif] font-light text-white/50 text-xs mb-2">Max Price: ${maxPrice}</p>
                  <input
                    type="range"
                    min={50}
                    max={1000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#FF2C2C]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inStockM"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#FF2C2C]"
                  />
                  <label htmlFor="inStockM" className="font-['Unbounded',sans-serif] font-light text-white/70 text-xs">
                    In Stock Only
                  </label>
                </div>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-['Unbounded',sans-serif] font-light text-white/40 text-sm">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onView={onViewProduct} onAddToCart={onAddToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductListingPage
