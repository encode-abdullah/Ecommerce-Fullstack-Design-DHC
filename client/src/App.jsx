import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './context/store'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Profile from './pages/Profile.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import AdminProducts from './pages/admin/Products.jsx'
import AdminOrders from './pages/admin/Orders.jsx'

function App() {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/admin/dashboard" element={isAuthenticated && user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/admin/products" element={isAuthenticated && user?.isAdmin ? <AdminProducts /> : <Navigate to="/" />} />
        <Route path="/admin/orders" element={isAuthenticated && user?.isAdmin ? <AdminOrders /> : <Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}

export default App