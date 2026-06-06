import { useAuthStore } from '../context/store'
import { FiUser, FiMail, FiShoppingBag, FiHeart } from 'react-icons/fi'

const Profile = () => {
  const { user } = useAuthStore()

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <div className="bg-black border border-red-900/30 rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
            <FiUser className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-red-300/60">{user?.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/orders" className="flex items-center space-x-3 p-4 bg-black rounded-lg hover:border-red-500/50 border border-red-900/20 transition">
            <FiShoppingBag className="w-5 h-5 text-red-500" />
            <span>My Orders</span>
          </a>
          
          <a href="/wishlist" className="flex items-center space-x-3 p-4 bg-black rounded-lg hover:border-red-500/50 border border-red-900/20 transition">
            <FiHeart className="w-5 h-5 text-orange-500" />
            <span>Wishlist</span>
          </a>
          
          <button className="flex items-center space-x-3 p-4 bg-black rounded-lg hover:border-red-500/50 border border-red-900/20 transition">
            <FiMail className="w-5 h-5 text-red-400" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
