import Header from './Header.jsx'
import Footer from './Footer.jsx'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-text">
      <header className="site-header" role="banner">
        <Header />
      </header>
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {children}
      </main>
      <footer className="site-footer" role="contentinfo">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
