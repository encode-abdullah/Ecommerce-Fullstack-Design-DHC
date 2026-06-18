import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  MapPin,
  Settings,
  Mail,
  Send,
  Clock,
  Truck,
  Shield,
  ChevronDown,
  Search,
  ShoppingCart,
} from 'lucide-react';
import { fetchProducts, fetchCategories } from '../../api';

const homeOutdoorProducts = [
  { name: 'Soft chairs', price: 'USD 19', image: '/images/interior/1.png' },
  { name: 'Sofa & chair', price: 'USD 19', image: '/images/interior/2.png' },
  { name: 'Kitchen dishes', price: 'USD 19', image: '/images/interior/3.png' },
  { name: 'Smart watches', price: 'USD 19', image: '/images/interior/4.png' },
  { name: 'Kitchen mixer', price: 'USD 100', image: '/images/interior/8.png' },
  { name: 'Blenders', price: 'USD 39', image: '/images/interior/9.png' },
  { name: 'Home appliance', price: 'USD 19', image: '/images/interior/5.png' },
  { name: 'Coffee maker', price: 'USD 10', image: '/images/interior/6.png' },
];

const consumerElectronics = [
  { name: 'Smart watches', price: 'USD 19', image: '/images/tech/8.png' },
  { name: 'Cameras', price: 'USD 89', image: '/images/tech/6.png' },
  { name: 'Headphones', price: 'USD 10', image: '/images/tech/9.png' },
  { name: 'Smart watches', price: 'USD 10', image: '/images/tech/10.png' },
  { name: 'Gaming set', price: 'USD 35', image: '/images/tech/5.png' },
  { name: 'Laptops & PC', price: 'USD 340', image: '/images/tech/7.png' },
  { name: 'Smartphones', price: 'USD 19', image: '/images/tech/3.png' },
  { name: 'Electric kettle', price: 'USD 240', image: '/images/tech/10.png' },
];

const recommendedItems = [
  { name: 'T-shirts with multiple colors, for men', price: '$10.30', image: '/images/cloth/2.png' },
  { name: 'Jeans shorts for men blue color', price: '$10.30', image: '/images/cloth/4.png' },
  { name: 'Brown winter coat medium size', price: '$12.50', image: '/images/cloth/3.png' },
  { name: 'Jeans bag for travel for men', price: '$34.00', image: '/images/cloth/5.png' },
  { name: 'Leather wallet', price: '$99.00', image: '/images/cloth/6.png' },
  { name: 'Canon camera black, 100x zoom', price: '$9.99', image: '/images/tech/6.png' },
  { name: 'Headset for gaming with mic', price: '$8.99', image: '/images/tech/5.png' },
  { name: 'Smartwatch silver color modern', price: '$10.30', image: '/images/tech/8.png' },
  { name: 'Blue wallet for men leather material', price: '$10.30', image: '/images/cloth/6.png' },
  { name: 'Jeans bag for travel for men', price: '$80.95', image: '/images/cloth/5.png' },
];

const regions = [
  { name: 'Arabic Emirates', flag: '/images/flags/Property 1=AE.png', domain: 'shopname.ae' },
  { name: 'Australia', flag: '/images/flags/Property 1=AU.png', domain: 'shopname.ae' },
  { name: 'United States', flag: '/images/flags/Property 1=US.png', domain: 'shopname.com' },
  { name: 'Russia', flag: '/images/flags/Property 1=RU.png', domain: 'shopname.ru' },
  { name: 'Italy', flag: '/images/flags/Property 1=IT.png', domain: 'shopname.it' },
  { name: 'Denmark', flag: '/images/flags/Property 1=DK.png', domain: 'denmark.com' },
  { name: 'France', flag: '/images/flags/Property 1=FR.png', domain: 'shopname.fr' },
  { name: 'China', flag: '/images/flags/Property 1=CN.png', domain: 'shopname.ae' },
];

const services = [
  { title: 'Source from Industry Hubs', icon: <Search className="service-icon w-5 h-5 text-white" />, color: 'bg-amber-500', image: '/images/book/1.png' },
  { title: 'Customize Your Products', icon: <Settings className="service-icon w-5 h-5 text-white" />, color: 'bg-amber-500', image: '/images/book/2.png' },
  { title: 'Fast, reliable shipping by ocean or air', icon: <Truck className="service-icon w-5 h-5 text-white" />, color: 'bg-amber-500', image: '/images/book/3.png' },
  { title: 'Product monitoring and inspection', icon: <Shield className="service-icon w-5 h-5 text-white" />, color: 'bg-amber-500', image: '/images/book/4.png' },
];

function CountdownTimer() {
  const [time, setTime] = useState({ days: 4, hours: 13, minutes: 34, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="countdown-timer flex gap-2">
      {[
        { val: pad(time.days), label: 'Days' },
        { val: pad(time.hours), label: 'Hrs' },
        { val: pad(time.minutes), label: 'Min' },
        { val: pad(time.seconds), label: 'Sec' },
      ].map((item, i) => (
        <div key={i} className="countdown-timer-item flex flex-col items-center">
          <div className="countdown-timer-digit w-10 h-10 bg-gray-900 text-white rounded flex items-center justify-center text-sm font-bold">
            {item.val}
          </div>
          <span className="countdown-timer-label text-[10px] text-gray-500 mt-0.5">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

const ProductCard = ({ item, type = 'discount' }) => (
  <div className="product-card bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer">
    <div className="product-card-image-wrapper w-full h-28 bg-gray-50 rounded-md flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors overflow-hidden p-2">
      <img src={item.image} alt={item.name} className="product-card-image max-h-full max-w-full object-contain" />
    </div>
    <h3 className="product-card-name text-xs font-medium text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
    {type === 'discount' && item.discount && (
      <span className="product-card-discount text-red-500 font-bold text-xs">{item.discount}</span>
    )}
    {type === 'price' && item.price && (
      <span className="product-card-price text-gray-900 font-bold text-xs">{item.price}</span>
    )}
  </div>
);

export default function Home() {
  const [quoteQuantity, setQuoteQuantity] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchProducts({ featured: 'true', pageSize: 5 });
        setFeaturedProducts(data.products || []);
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadFeatured();
    loadCategories();
  }, []);

  return (
    <div className="home-page min-h-screen bg-gray-50 font-sans text-gray-800">

      <main className="home-main max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="home-content space-y-6">

          {/* Hero Section - 3 column layout */}
          <div className="hero-section flex gap-0 rounded-lg overflow-hidden shadow-sm bg-white">
            {/* Left - Category Sidebar */}
            <div className="hero-sidebar w-56 bg-white border-r border-gray-100 flex-shrink-0 hidden md:block">
              {categories.map((cat, idx) => (
                <Link
                  key={cat._id}
                  to={`/products?category=${cat._id}`}
                  className={`hero-sidebar-link block px-5 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    idx === 0 ? 'hero-sidebar-link--active text-blue-600 font-medium bg-blue-50' : 'text-gray-600'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Center - Banner */}
            <div className="hero-banner flex-1 relative bg-gradient-to-br from-teal-400 to-teal-500 min-h-[280px] flex items-center overflow-hidden">
              <img
                src="/images/banner.svg"
                alt="Banner"
                className="hero-banner-image absolute inset-0 w-full h-full object-cover"
              />
              <div className="hero-banner-content relative z-10 px-8 md:px-12 text-white max-w-md">
                <h1 className="hero-banner-title text-2xl md:text-3xl font-bold mb-2 leading-tight">
                  Latest trending<br />Electronic items
                </h1>
                <button className="hero-banner-cta bg-white text-gray-800 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors shadow mt-3">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right - User & Promo Cards */}
            <div className="hero-right w-64 flex-shrink-0 hidden lg:flex flex-col gap-3 p-3 bg-gray-50">
              {/* User greeting card */}
              <div className="hero-user-card bg-white rounded-lg p-4 border border-gray-100">
                <div className="hero-user-info flex items-center gap-3 mb-3">
                  <div className="hero-user-avatar w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/images/avatar/avatar=pic1.jpg" alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="hero-user-greeting text-sm text-gray-500">Hi, user</p>
                    <p className="hero-user-message text-sm font-medium text-gray-800">let's get stated</p>
                  </div>
                </div>
                <button className="hero-user-join w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors mb-2">
                  Join now
                </button>
                <button className="hero-user-login w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Log in
                </button>
              </div>

              {/* Promo card 1 */}
              <div className="hero-promo-card hero-promo-card--orange bg-orange-500 text-white rounded-lg p-4">
                <p className="hero-promo-text text-sm font-semibold leading-snug">
                  Get US $10 off<br />with a new<br />supplier
                </p>
              </div>

              {/* Promo card 2 */}
              <div className="hero-promo-card hero-promo-card--teal bg-teal-500 text-white rounded-lg p-4">
                <p className="hero-promo-text text-sm font-semibold leading-snug">
                  Send quotes with<br />supplier<br />preferences
                </p>
              </div>
            </div>
          </div>

          {/* Deals and offers */}
          <section className="deals-section bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="deals-header flex items-center gap-4 mb-4">
              <div>
                <h2 className="deals-title text-lg font-bold text-gray-900">Deals and offers</h2>
                <p className="deals-subtitle text-xs text-gray-500">Hygiene equipments</p>
              </div>
              <div className="deals-countdown ml-auto">
                <CountdownTimer />
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="deals-grid grid grid-cols-2 md:grid-cols-5 gap-4">
                {featuredProducts.map((product) => (
                  <Link to={`/products/${product._id}`} key={product._id}>
                    <div className="product-card bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer">
                      <div className="product-card-image-wrapper w-full h-28 bg-gray-50 rounded-md flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors overflow-hidden p-2">
                        <img src={product.image} alt={product.name} className="product-card-image max-h-full max-w-full object-contain" />
                      </div>
                      <h3 className="product-card-name text-xs font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                      <span className="product-card-price text-gray-900 font-bold text-xs">${product.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {featuredProducts.length > 0 && (
              <div className="text-center mt-4">
                <Link to="/products" className="text-blue-500 text-sm font-medium hover:underline">
                  View all products
                </Link>
              </div>
            )}
          </section>

          {/* Home and outdoor */}
          <section className="home-outdoor-section bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="home-outdoor-content flex gap-5">
              {/* Left banner */}
              <div className="home-outdoor-banner w-52 flex-shrink-0 hidden md:block">
                <div className="home-outdoor-banner-card bg-amber-50 rounded-lg p-5 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="home-outdoor-banner-title text-lg font-bold text-gray-900 leading-tight">Home and<br />outdoor</h3>
                    <button className="home-outdoor-banner-cta mt-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                      Source now
                    </button>
                  </div>
                  <div className="home-outdoor-banner-image-wrapper mt-4">
                    <img src="/images/interior/1.png" alt="Home and outdoor" className="home-outdoor-banner-image w-full h-28 object-contain" />
                  </div>
                </div>
              </div>

              {/* Products grid */}
              <div className="home-outdoor-products flex-1">
                <div className="home-outdoor-grid grid grid-cols-2 md:grid-cols-4 gap-4">
                  {homeOutdoorProducts.map((item, idx) => (
                    <ProductCard key={idx} item={item} type="price" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Consumer electronics and gadgets */}
          <section className="consumer-section bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="consumer-content flex gap-5">
              {/* Left banner */}
              <div className="consumer-banner w-52 flex-shrink-0 hidden md:block">
                <div className="consumer-banner-card bg-blue-50 rounded-lg p-5 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="consumer-banner-title text-lg font-bold text-gray-900 leading-tight">Consumer<br />electronics and<br />gadgets</h3>
                    <button className="consumer-banner-cta mt-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                      Source now
                    </button>
                  </div>
                  <div className="consumer-banner-image-wrapper mt-4">
                    <img src="/images/tech/9.png" alt="Consumer electronics" className="consumer-banner-image w-full h-28 object-contain" />
                  </div>
                </div>
              </div>

              {/* Products grid */}
              <div className="consumer-products flex-1">
                <div className="consumer-grid grid grid-cols-2 md:grid-cols-4 gap-4">
                  {consumerElectronics.map((item, idx) => (
                    <ProductCard key={idx} item={item} type="price" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Request for Quote */}
          <section className="quote-section relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 text-white shadow-lg overflow-hidden">
            <img src="/images/warehouse/warehouse.webp" alt="Quote background" className="quote-bg absolute inset-0 w-full h-full object-cover opacity-20"/>
            <div className="quote-content flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="quote-info flex-1">
                <h2 className="quote-title text-2xl font-bold mb-3 leading-tight">An easy way to send requests to all suppliers</h2>
                <p className="quote-description text-gray-300 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                </p>
              </div>
              <div className="quote-form-wrapper flex-1 w-full md:w-auto">
                <div className="quote-form bg-white rounded-lg p-5 text-gray-800">
                  <h3 className="quote-form-title font-semibold text-sm mb-3">Send quote to suppliers</h3>
                  <div className="quote-form-fields space-y-3">
                    <input
                      type="text"
                      placeholder="What item you need?"
                      className="quote-form-input w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                    <textarea
                      placeholder="Type more details..."
                      rows={3}
                      className="quote-form-textarea w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 resize-none"
                    />
                    <div className="quote-form-row flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="quote-form-quantity w-32 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                        value={quoteQuantity}
                        onChange={(e) => setQuoteQuantity(e.target.value)}
                      />
                      <select className="quote-form-unit border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white">
                        <option>Pcs</option>
                        <option>Kg</option>
                        <option>Lots</option>
                      </select>
                    </div>
                    <button className="quote-form-submit bg-blue-500 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-600 transition-colors">
                      Send inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recommended Items */}
          <section className="recommended-section">
            <h2 className="recommended-title text-lg font-bold text-gray-900 mb-4">Recommended items</h2>
            <div className="recommended-grid grid grid-cols-2 md:grid-cols-5 gap-4">
              {recommendedItems.map((item, idx) => (
                <ProductCard key={idx} item={item} type="price" />
              ))}
            </div>
          </section>

          {/* Extra Services */}
          <section className="services-section bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h2 className="services-title text-lg font-bold text-gray-900 mb-4">Our extra services</h2>
            <div className="services-grid grid grid-cols-1 md:grid-cols-4 gap-5">
              {services.map((service, idx) => (
                <div key={idx} className="service-card relative overflow-hidden rounded-lg hover:shadow-md transition-shadow cursor-pointer h-48">
                  <img src={service.image} alt={service.title} className="service-card-bg absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="service-card-content relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
                    <div className={`service-card-icon mb-3 w-14 h-14 ${service.color} rounded-full flex items-center justify-center`}>
                      {service.icon}
                    </div>
                    <h3 className="service-card-title font-semibold text-white text-sm">{service.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Suppliers by Region */}
          <section className="suppliers-section bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h2 className="suppliers-title text-lg font-bold text-gray-900 mb-4">Suppliers by region</h2>
            <div className="suppliers-grid flex flex-wrap gap-3">
              {regions.map((region, idx) => (
                <button key={idx} className="supplier-tag px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-2">
                  <img src={region.flag} alt={region.name} className="supplier-flag w-5 h-4 object-cover rounded-sm" />
                  <div className="text-left">
                    <div className="supplier-name font-medium text-xs">{region.name}</div>
                    <div className="supplier-domain text-[10px] text-gray-400">{region.domain}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <section className="newsletter-section bg-white rounded-lg p-8 text-center border border-gray-100 shadow-sm">
            <Mail className="newsletter-icon w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h2 className="newsletter-title text-xl font-bold text-gray-900 mb-2">Subscribe on our newsletter</h2>
            <p className="newsletter-description text-gray-500 mb-5 text-sm max-w-md mx-auto">
              Get daily news on upcoming offers from many suppliers all over the world
            </p>
            <div className="newsletter-form flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Email"
                className="newsletter-input flex-1 px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm"
              />
              <button className="newsletter-submit bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
