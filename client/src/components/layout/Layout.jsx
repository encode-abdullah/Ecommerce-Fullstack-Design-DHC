import Header from './Header.jsx'
import Footer from './Footer.jsx'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout