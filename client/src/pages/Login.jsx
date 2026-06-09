import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../context/store'
import { FiMail, FiLock } from 'react-icons/fi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login({ 
        _id: '1', 
        name: 'Demo User', 
        email, 
        isAdmin: false 
      }, 'mock-token')
      navigate('/')
      setLoading(false)
    }, 500)
  }

  return (
    <main className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-red-300/60 w-5 h-5" aria-hidden="true" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-black border border-red-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-red-300/60 w-5 h-5" aria-hidden="true" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-black border border-red-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-500 transition disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        
        <p className="text-center text-red-300/60">
          New customer?{' '}
          <Link to="/register" className="text-red-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </main>
  )
}

export default Login
