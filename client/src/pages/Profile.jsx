import { useAuthStore } from '../context/store'
import { FiUser, FiMail, FiShoppingBag, FiHeart } from 'react-icons/fi'

const Profile = () => {
  const { user } = useAuthStore()

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <div className="bg-surface rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <FiUser className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-muted">{user?.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/orders" className="flex items-center space-x-3 p-4 bg-background rounded-lg hover:bg-gray-700 transition">
            <FiShoppingBag className="w-5 h-5 text-primary" />
            <span>My Orders</span>
          </a>
          
          <a href="/wishlist" className="flex items-center space-x-3 p-4 bg-background rounded-lg hover:bg-gray-700 transition">
            <FiHeart className="w-5 h-5 text-accent" />
            <span>Wishlist</span>
          </a>
          
          <button className="flex items-center space-x-3 p-4 bg-background rounded-lg hover:bg-gray-700 transition">
            <FiMail className="w-5 h-5 text-green-500" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile