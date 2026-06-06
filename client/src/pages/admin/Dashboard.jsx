import { FiPackage, FiUsers, FiBarChart2, FiShoppingBag } from 'react-icons/fi'

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Products', value: '128', icon: FiPackage, color: 'text-red-500' },
    { label: 'Total Users', value: '1,245', icon: FiUsers, color: 'text-orange-500' },
    { label: 'Total Orders', value: '89', icon: FiShoppingBag, color: 'text-red-400' },
    { label: 'Revenue', value: '$12,456', icon: FiBarChart2, color: 'text-orange-400' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div key={stat.label} className="bg-black border border-red-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300/60 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-10 h-10 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/admin/products" className="bg-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition">
          <h3 className="font-semibold mb-2">Manage Products</h3>
          <p className="text-red-300/60">Add, edit, or remove products</p>
        </a>
        
        <a href="/admin/orders" className="bg-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition">
          <h3 className="font-semibold mb-2">View Orders</h3>
          <p className="text-red-300/60">Manage customer orders</p>
        </a>
      </div>
    </div>
  )
}

export default AdminDashboard
