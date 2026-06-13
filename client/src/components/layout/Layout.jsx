import NavBar from '../figma/NavBar.jsx'
import Footer from '../../components/figma/Footer.jsx'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar currentPage={location.pathname === '/' ? 'home' : location.pathname.replace('/', '')} cartCount={0} onNavigate={() => {}} />
      <main className="pt-28 md:pt-32">
        <Outlet />
      </main>
      {location.pathname !== '/' && <Footer />}
    </div>
  )
}

export default Layout
