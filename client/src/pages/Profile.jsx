import { useAuthStore } from '../context/store'
import { FiUser, FiMail, FiShoppingBag, FiHeart, FiLogOut } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Profile</h1>
      </header>

      <section aria-labelledby="profile-info">
        <div className="bg-black border border-red-900/30 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
              <FiUser className="w-8 h-8 text-red-500" aria-hidden="true" />
            </div>
            <div>
              <h2 id="profile-info" className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-red-300/60">{user?.email}</p>
            </div>
          </div>

          <nav aria-label="Profile actions">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/orders" className="flex items-center space-x-3 p-4 bg-black rounded-lg hover:border-red-500/50 border border-red-900/20 transition">
                <FiShoppingBag className="w-5 h-5 text-red-500" aria-hidden="true" />
                <span>My Orders</span>
              </Link>

              <Link to="/wishlist" className="flex items-center space-x-3 p-4 bg-black rounded-lg hover:border-red-500/50 border border-red-900/20 transition">
                <FiHeart className="w-5 h-5 text-orange-500" aria-hidden="true" />
                <span>Wishlist</span>
              </Link>

              <button type="button" className="flex items-center space-x-3 p-4 bg-black rounded-lg hover:border-red-500/50 border border-red-900/20 transition">
                <FiMail className="w-5 h-5 text-red-400" aria-hidden="true" />
                <span>Contact Support</span>
              </button>
            </div>
          </nav>
        </div>
      </section>

      <section aria-label="Account actions">
        <div className="bg-black border border-red-900/30 rounded-lg p-6">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
          >
            <FiLogOut className="w-4 h-4" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </section>
    </main>
  )
}

export default Profile
