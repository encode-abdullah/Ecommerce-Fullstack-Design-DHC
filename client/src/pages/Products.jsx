import { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import ProductListCard from '../components/product/ProductListCard.jsx'
import { getProducts } from '../services/api.js'
import { ProductCardSkeleton } from '../components/ui/Skeleton.jsx'
import { FiGrid, FiList, FiSearch, FiSliders, FiX, FiCheck } from 'react-icons/fi'
import { Button } from '../components/ui/button'

const Products = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const queryParams = new URLSearchParams(location.search)
  const initialCategory = queryParams.get('category') || ''
  const initialKeyword = queryParams.get('keyword') || ''

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')
  
  const [keyword, setKeyword] = useState(initialKeyword)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState('all')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setKeyword(params.get('keyword') || '')
    setSelectedCategory(params.get('category') || '')
  }, [location.search])

  useEffect(() => {
    setLoading(true)
    getProducts({ keyword, category: selectedCategory }).then(data => {
      setProducts(data.products)
      setLoading(false)
    })
  }, [keyword, selectedCategory])

  const brands = ['Razer', 'Logitech', 'Corsair', 'SteelSeries', 'HyperX', 'ASUS', 'Secretlab', 'Microsoft']
  const categories = [
    { name: 'All Gears', slug: '' },
    { name: 'Mice', slug: 'mouse' },
    { name: 'Keyboards', slug: 'keyboard' },
    { name: 'Headsets', slug: 'headset' },
    { name: 'Monitors', slug: 'monitor' },
    { name: 'Controllers', slug: 'controller' },
    { name: 'Chairs', slug: 'chair' },
  ]

  const filteredProducts = products.filter(p => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
      return false
    }
    if (priceRange === 'under100' && p.price >= 100) return false
    if (priceRange === '100to300' && (p.price < 100 || p.price > 300)) return false
    if (priceRange === 'above300' && p.price <= 300) return false
    
    if (inStockOnly && p.stock <= 0) return false

    return true
  }).sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price
    if (sortBy === 'priceHigh') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return b._id - a._id
  })

  const getActiveFilterCount = () => {
    let count = 0
    if (selectedCategory) count++
    if (selectedBrands.length > 0) count += selectedBrands.length
    if (priceRange !== 'all') count++
    if (inStockOnly) count++
    return count
  }

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const handleClearAll = () => {
    setSelectedCategory('')
    setSelectedBrands([])
    setPriceRange('all')
    setInStockOnly(false)
    setKeyword('')
    navigate('/products')
  }

  const suggestedProducts = products.slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-red-900/30 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-wide text-text">
            {selectedCategory 
              ? categories.find(c => c.slug === selectedCategory)?.name 
              : keyword 
                ? `Search: "${keyword}"` 
                : 'ALL GEARS'
            }
          </h1>
          <p className="text-red-300/60 text-xs mt-1">Showing {filteredProducts.length} premium gaming accessories</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <input
              type="text"
              placeholder="Search gear catalog..."
              value={keyword}
              onChange={e => {
                setKeyword(e.target.value)
                const params = new URLSearchParams(location.search)
                if (e.target.value) {
                  params.set('keyword', e.target.value)
                } else {
                  params.delete('keyword')
                }
                navigate({ search: params.toString() })
              }}
              className="w-full pl-9 pr-4 py-2 bg-black border border-red-900/50 focus:border-red-500 rounded-lg text-xs text-text focus:outline-none"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-red-300/60 w-3.5 h-3.5" />
          </div>

          <div className="flex bg-black border border-red-900/30 rounded-lg p-1 shrink-0">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded transition ${view === 'grid' ? 'bg-red-600 text-white' : 'text-text/70 hover:text-text'}`}
              title="Grid View"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded transition ${view === 'list' ? 'bg-red-600 text-white' : 'text-text/70 hover:text-text'}`}
              title="List View"
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-red-900/20">
        {categories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => {
              setSelectedCategory(cat.slug)
              const params = new URLSearchParams(location.search)
              if (cat.slug) {
                params.set('category', cat.slug)
              } else {
                params.delete('category')
              }
              navigate({ search: params.toString() })
            }}
            className={`px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.slug
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-black border-red-900/30 text-text/80 hover:border-red-500'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between bg-black border border-red-900/30 px-4 py-3 rounded-xl">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsFilterDrawerOpen(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 md:hidden text-xs border-red-900/40 hover:border-red-500"
          >
            <FiSliders className="w-3.5 h-3.5" />
            <span>Filter ({getActiveFilterCount()})</span>
          </Button>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-red-300/60 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-black border border-red-900/50 text-text rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 text-xs font-semibold"
            >
              <option value="newest">Newest</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-red-300/60">
          Found <span className="font-bold text-text">{filteredProducts.length}</span> items
        </div>
      </div>

      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-red-300/60">Active filters:</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 bg-black border border-red-900/40 px-2.5 py-1 rounded-full text-xs font-medium">
              <span>Category: {selectedCategory}</span>
              <button onClick={() => {
                setSelectedCategory('')
                const params = new URLSearchParams(location.search)
                params.delete('category')
                navigate({ search: params.toString() })
              }}>
                <FiX className="w-3 h-3 text-red-400 hover:text-red-300" />
              </button>
            </span>
          )}
          {selectedBrands.map(b => (
            <span key={b} className="inline-flex items-center gap-1 bg-black border border-red-900/40 px-2.5 py-1 rounded-full text-xs font-medium">
              <span>Brand: {b}</span>
              <button onClick={() => handleBrandToggle(b)}>
                <FiX className="w-3 h-3 text-red-400 hover:text-red-300" />
              </button>
            </span>
          ))}
          {priceRange !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-black border border-red-900/40 px-2.5 py-1 rounded-full text-xs font-medium">
              <span>Price: {priceRange === 'under100' ? 'Under $100' : priceRange === '100to300' ? '$100 - $300' : 'Above $300'}</span>
              <button onClick={() => setPriceRange('all')}>
                <FiX className="w-3 h-3 text-red-400 hover:text-red-300" />
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1 bg-black border border-red-900/40 px-2.5 py-1 rounded-full text-xs font-medium">
              <span>In Stock Only</span>
              <button onClick={() => setInStockOnly(false)}>
                <FiX className="w-3 h-3 text-red-400 hover:text-red-300" />
              </button>
            </span>
          )}
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold text-red-500 hover:underline ml-1"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <aside className="hidden md:block space-y-6 bg-black/30 border border-red-900/20 p-5 rounded-2xl h-fit">
          <div className="flex items-center justify-between border-b border-red-900/30 pb-3">
            <h3 className="font-bold text-sm tracking-wider uppercase text-text/90">Filter Catalog</h3>
            <button onClick={handleClearAll} className="text-xs text-red-300/60 hover:text-red-500 transition font-semibold">Clear</button>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase text-text/80">Category</h4>
            <div className="space-y-1.5">
              {categories.slice(1).map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    setSelectedCategory(cat.slug)
                    const params = new URLSearchParams(location.search)
                    params.set('category', cat.slug)
                    navigate({ search: params.toString() })
                  }}
                  className={`block text-xs hover:text-red-500 transition w-full text-left font-medium ${
                    selectedCategory === cat.slug ? 'text-red-500 font-bold' : 'text-red-300/60'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 border-t border-red-900/20 pt-4">
            <h4 className="font-bold text-xs uppercase text-text/80">Brand</h4>
            <div className="space-y-2">
              {brands.map(brand => {
                const isChecked = selectedBrands.includes(brand)
                return (
                  <label key={brand} className="flex items-center gap-2.5 cursor-pointer text-xs text-text/80">
                    <button
                      type="button"
                      onClick={() => handleBrandToggle(brand)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                        isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-red-900/40 bg-black'
                      }`}
                    >
                      {isChecked && <FiCheck className="w-3.5 h-3.5 font-bold" />}
                    </button>
                    <span>{brand}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="space-y-2.5 border-t border-red-900/20 pt-4">
            <h4 className="font-bold text-xs uppercase text-text/80">Price</h4>
            <div className="space-y-2 text-xs">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under $100', val: 'under100' },
                { label: '$100 - $300', val: '100to300' },
                { label: 'Above $300', val: 'above300' },
              ].map(opt => (
                <label key={opt.val} className="flex items-center gap-2.5 cursor-pointer text-text/80">
                  <input
                    type="radio"
                    name="priceRangeRadio"
                    checked={priceRange === opt.val}
                    onChange={() => setPriceRange(opt.val)}
                    className="w-4 h-4 rounded-full border border-red-900/40 accent-red-500 bg-black focus:outline-none"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 border-t border-red-900/20 pt-4">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-text/80">
              <button
                type="button"
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                  inStockOnly ? 'bg-red-600 border-red-600 text-white' : 'border-red-900/40 bg-black'
                }`}
              >
                {inStockOnly && <FiCheck className="w-3.5 h-3.5 font-bold" />}
              </button>
              <span>Show In Stock Only</span>
            </label>
          </div>
        </aside>

        <div className="md:col-span-3">
          {loading ? (
            <div className={view === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {[1, 2, 3, 4, 5, 6].map(i => 
                view === 'grid' 
                  ? <ProductCardSkeleton key={i} /> 
                  : <div key={i} className="h-44 bg-black/50 border border-red-900/20 rounded-xl animate-pulse" />
              )}
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-black/10 border border-dashed border-red-900/30 rounded-2xl">
                  <p className="text-red-300/60 text-sm">No products fit selected criteria.</p>
                  <Button onClick={handleClearAll} variant="outline" size="sm" className="mt-4 border-red-900/40 hover:border-red-500">
                    Reset All Filters
                  </Button>
                </div>
              ) : (
                <div className={view === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
                }>
                  {filteredProducts.map(product => 
                    view === 'grid' 
                      ? <ProductCard key={product._id} product={product} /> 
                      : <ProductListCard key={product._id} product={product} />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <section className="border-t border-red-900/20 pt-10 mt-12 space-y-6">
        <h3 className="text-xl font-bold tracking-wide text-text/90">YOU MAY ALSO LIKE</h3>
        <div className="flex space-x-5 overflow-x-auto pb-4 scrollbar-hide">
          {suggestedProducts.map(p => (
            <div key={p._id} className="min-w-[180px] w-[180px] bg-black/30 border border-red-900/20 rounded-xl p-3 text-center shrink-0 hover:border-red-500/50 transition">
              <Link to={`/products/${p._id}`}>
                <img src={p.images[0]} alt={p.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                <span className="block text-xs font-bold text-text/90 truncate">{p.name}</span>
                <span className="block text-xs font-bold text-red-500 mt-1">${p.price}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-64 max-w-sm bg-black h-full p-5 flex flex-col justify-between border-r border-red-900/30">
            <div className="space-y-6 overflow-y-auto pr-1">
              <div className="flex items-center justify-between border-b border-red-900/30 pb-3">
                <h3 className="font-extrabold text-sm uppercase text-text">Filters</h3>
                <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-1 rounded-md hover:bg-red-900/20 text-red-300/60 hover:text-text"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase text-red-500">Category</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {categories.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setSelectedCategory(cat.slug)
                        const params = new URLSearchParams(location.search)
                        if (cat.slug) params.set('category', cat.slug)
                        else params.delete('category')
                        navigate({ search: params.toString() })
                      }}
                      className={`px-2 py-1.5 border rounded text-left truncate font-semibold transition ${
                        selectedCategory === cat.slug 
                          ? 'bg-red-600/20 border-red-500 text-red-500' 
                          : 'border-red-900/30 bg-black text-text/80'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 border-t border-red-900/20 pt-4">
                <h4 className="font-bold text-xs uppercase text-red-500">Brand</h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {brands.map(brand => {
                    const isChecked = selectedBrands.includes(brand)
                    return (
                      <button
                        key={brand}
                        onClick={() => handleBrandToggle(brand)}
                        className={`px-2 py-1.5 border rounded text-left truncate font-semibold text-xs transition ${
                          isChecked ? 'bg-red-600/20 border-red-500 text-red-500' : 'border-red-900/30 bg-black text-text/80'
                        }`}
                      >
                        {brand}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2.5 border-t border-red-900/20 pt-4">
                <h4 className="font-bold text-xs uppercase text-red-500">Price</h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'All Prices', val: 'all' },
                    { label: 'Under $100', val: 'under100' },
                    { label: '$100 - $300', val: '100to300' },
                    { label: 'Above $300', val: 'above300' },
                  ].map(opt => (
                    <label key={opt.val} className="flex items-center gap-2.5 cursor-pointer text-text/80">
                      <input
                        type="radio"
                        name="priceRangeRadioMobile"
                        checked={priceRange === opt.val}
                        onChange={() => setPriceRange(opt.val)}
                        className="w-4 h-4 rounded-full border border-red-900/40 accent-red-500 bg-black focus:outline-none"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 border-t border-red-900/20 pt-4">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-text/80">
                  <button
                    type="button"
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                      inStockOnly ? 'bg-red-600 border-red-600 text-white' : 'border-red-900/40 bg-black'
                    }`}
                  >
                    {inStockOnly && <FiCheck className="w-3.5 h-3.5 font-bold" />}
                  </button>
                  <span>Show In Stock Only</span>
                </label>
              </div>
            </div>

            <Button onClick={() => setIsFilterDrawerOpen(false)} className="w-full mt-4 text-xs font-bold py-2 bg-red-600 hover:bg-red-500">
              Apply Filters ({getActiveFilterCount()})
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
