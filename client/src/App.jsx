import { useState } from 'react'
import { useAuthStore } from './context/store'
import NavBar from './components/figma/NavBar.jsx'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminOrders from './pages/admin/Orders'

function App() {
  const { isAuthenticated, user } = useAuthStore()
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const data = localStorage.getItem('cart-storage')
      const parsed = data ? JSON.parse(data) : null
      return parsed?.state?.cartItems || []
    } catch {
      return []
    }
  })

  const navigate = (page) => {
    if (page.startsWith('product-')) {
      const id = page.replace('product-', '')
      setSelectedProductId(id)
      setCurrentPage('product-detail')
    } else {
      setCurrentPage(page)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const viewProduct = (id) => {
    setSelectedProductId(id)
    setCurrentPage('product-detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = ({ product, quantity = 1 }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { product, quantity }]
    })
  }

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar currentPage={currentPage} onNavigate={navigate} cartCount={cartCount} />
      <div className="pt-28 md:pt-32">
        {currentPage === 'home' && (
          <Home onNavigate={navigate} onViewProduct={viewProduct} onAddToCart={addToCart} cartCount={cartCount} />
        )}
        {currentPage === 'products' && <Products onViewProduct={viewProduct} onAddToCart={addToCart} onNavigate={navigate} />}
        {currentPage === 'product-detail' && selectedProductId != null && (
          <ProductDetail productId={selectedProductId} onBack={() => navigate('products')} onAddToCart={addToCart} onNavigate={navigate} />
        )}
        {currentPage === 'cart' && (
          <Cart items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onNavigate={navigate} />
        )}
      </div>
    </div>
  )
}

export default App
