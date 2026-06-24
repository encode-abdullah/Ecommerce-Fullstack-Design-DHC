import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Orders from './pages/Orders/Orders.jsx';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation.jsx';
import AdminProducts from './pages/Admin/Products/Products.jsx';
import AdminCategories from './pages/Admin/Categories/Categories.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <div className="app-root flex flex-col min-h-screen overflow-x-hidden">
          <Header />
          <Navbar />
          <main className="app-main flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-confirmation/:id"
                  element={
                    <ProtectedRoute>
                      <OrderConfirmation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminCategories />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
