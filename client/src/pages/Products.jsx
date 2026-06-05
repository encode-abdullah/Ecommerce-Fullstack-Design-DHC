import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import ProductListCard from '../components/product/ProductListCard.jsx'
import { getProducts } from '../services/api.js'
import { ProductCardSkeleton } from '../components/ui/Skeleton.jsx'
import { FiGrid, FiList, FiSearch } from 'react-icons/fi'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')
  const [keyword, setKeyword] = useState('')
  const location = useLocation()

  const category = new URLSearchParams(location.search).get('category') || ''

  useEffect(() => {
    setLoading(true)
    getProducts({ keyword, category }).then(data => {
      setProducts(data.products)
      setLoading(false)
    })
  }, [keyword, category])

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="pl-10 pr-4 py-2 bg-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex bg-surface rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded ${view === 'grid' ? 'bg-primary text-background' : ''}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded ${view === 'list' ? 'bg-primary text-background' : ''}`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={view === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
          : 'space-y-4'
        }>
          {[1, 2, 3, 4, 5, 6].map(i => 
            view === 'grid' ? <ProductCardSkeleton key={i} /> : <div key={i} className="h-48 bg-surface rounded-lg animate-pulse" />
          )}
        </div>
      ) : (
        <>
          {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map(product => (
                <ProductListCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted text-lg">No products found</p>
        </div>
      )}
    </div>
  )
}

export default Products