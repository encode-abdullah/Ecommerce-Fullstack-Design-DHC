import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore, useCartStore, useWishlistStore } from './store'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)
  const setCart = useCartStore(state => state.setCart)
  const setWishlist = useWishlistStore(state => state.setWishlist)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('auth-storage')
        ? JSON.parse(localStorage.getItem('auth-storage')).state.token
        : null
      
      if (token) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } }
          const { data } = await axios.get('/api/auth/profile', config)
          login(data, token)
        } catch (error) {
          logout()
        }
      }
      setLoading(false)
    }
    
    fetchUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ loading }}>
      {children}
    </AuthContext.Provider>
  )
}