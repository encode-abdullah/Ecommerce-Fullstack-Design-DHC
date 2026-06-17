import React, { useState, useEffect } from 'react';
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
import Header from '../../components/Header/Header';

const categories = [
  'Automobiles',
  'Clothes and wear',
  'Home interiors',
  'Computer and tech',
  'Tools, equipments',
  'Sports and outdoor',
  'Animal and pets',
  'Machinery tools',
  'More category',
];

const trendingProducts = [
  { name: 'Smart watches', discount: '-25%', image: '/images/tech/8.png', price: '$10.30' },
  { name: 'Laptops', discount: '-15%', image: '/images/tech/7.png', price: '$12.50' },
  { name: 'GoPro cameras', discount: '-40%', image: '/images/tech/6.png', price: '$8.99' },
  { name: 'Headphones', discount: '-25%', image: '/images/tech/9.png', price: '$99.00' },
  { name: 'Canon cameras', discount: '-25%', image: '/images/tech/4.png', price: '$9.99' },
];

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
  { name: 'Arabic Emirates', flag: '🇦🇪', domain: 'shopname.ae' },
  { name: 'Australia', flag: '🇦🇺', domain: 'shopname.ae' },
  { name: 'United States', flag: '🇺🇸', domain: 'shopname.com' },
  { name: 'Russia', flag: '🇷🇺', domain: 'shopname.ru' },
  { name: 'Italy', flag: '🇮🇹', domain: 'shopname.it' },
  { name: 'Denmark', flag: '🇩🇰', domain: 'denmark.com' },
  { name: 'France', flag: '🇫🇷', domain: 'shopname.fr' },
  { name: 'China', flag: '🇨🇳', domain: 'shopname.ae' },
  { name: 'Great Britain', flag: '🇬🇧', domain: 'shopname.co.uk' },
];

const services = [
  { title: 'Source from Industry Hubs', icon: <Search className="w-5 h-5 text-white" />, color: 'bg-amber-500' },
  { title: 'Customize Your Products', icon: <Settings className="w-5 h-5 text-white" />, color: 'bg-amber-500' },
  { title: 'Fast, reliable shipping by ocean or air', icon: <Truck className="w-5 h-5 text-white" />, color: 'bg-amber-500' },
  { title: 'Product monitoring and inspection', icon: <Shield className="w-5 h-5 text-white" />, color: 'bg-amber-500' },
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
    <div className="flex gap-2">
      {[
        { val: pad(time.days), label: 'Days' },
        { val: pad(time.hours), label: 'Hrs' },
        { val: pad(time.minutes), label: 'Min' },
        { val: pad(time.seconds), label: 'Sec' },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-900 text-white rounded flex items-center justify-center text-sm font-bold">
            {item.val}
          </div>
          <span className="text-[10px] text-gray-500 mt-0.5">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

const ProductCard = ({ item, type = 'discount' }) => (
  <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer">
    <div className="w-full h-28 bg-gray-50 rounded-md flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors overflow-hidden p-2">
      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
    </div>
    <h3 className="text-xs font-medium text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
    {type === 'discount' && item.discount && (
      <span className="text-red-500 font-bold text-xs">{item.discount}</span>
    )}
    {type === 'price' && item.price && (
      <span className="text-gray-900 font-bold text-xs">{item.price}</span>
    )}
  </div>
);

export default function Home() {
  const [quoteQuantity, setQuoteQuantity] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="space-y-6">

          {/* Hero Section - 3 column layout */}
          <div className="flex gap-0 rounded-lg overflow-hidden shadow-sm bg-white">
            {/* Left - Category Sidebar */}
            <div className="w-56 bg-white border-r border-gray-100 flex-shrink-0 hidden md:block">
              {categories.map((cat, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`block px-5 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    idx === 0 ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600'
                  }`}
                >
                  {cat}
                </a>
              ))}
            </div>

            {/* Center - Banner */}
            <div className="flex-1 relative bg-gradient-to-br from-teal-400 to-teal-500 min-h-[280px] flex items-center overflow-hidden">
              <img
                src="/images/banner.svg"
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 px-8 md:px-12 text-white max-w-md">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                  Latest trending<br />Electronic items
                </h1>
                <button className="bg-white text-gray-800 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors shadow mt-3">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right - User & Promo Cards */}
            <div className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-3 p-3 bg-gray-50">
              {/* User greeting card */}
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-lg">👤</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hi, user</p>
                    <p className="text-sm font-medium text-gray-800">let's get stated</p>
                  </div>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors mb-2">
                  Join now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Log in
                </button>
              </div>

              {/* Promo card 1 */}
              <div className="bg-orange-500 text-white rounded-lg p-4">
                <p className="text-sm font-semibold leading-snug">
                  Get US $10 off<br />with a new<br />supplier
                </p>
              </div>

              {/* Promo card 2 */}
              <div className="bg-teal-500 text-white rounded-lg p-4">
                <p className="text-sm font-semibold leading-snug">
                  Send quotes with<br />supplier<br />preferences
                </p>
              </div>
            </div>
          </div>

          {/* Deals and offers */}
          <section className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Deals and offers</h2>
                <p className="text-xs text-gray-500">Hygiene equipments</p>
              </div>
              <div className="ml-auto">
                <CountdownTimer />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {trendingProducts.map((item, idx) => (
                <ProductCard key={idx} item={item} type="discount" />
              ))}
            </div>
          </section>

          {/* Home and outdoor */}
          <section className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex gap-5">
              {/* Left banner */}
              <div className="w-52 flex-shrink-0 hidden md:block">
                <div className="bg-amber-50 rounded-lg p-5 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Home and<br />outdoor</h3>
                    <button className="mt-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                      Source now
                    </button>
                  </div>
                  <div className="mt-4">
                    <img src="/images/interior/1.png" alt="Home and outdoor" className="w-full h-28 object-contain" />
                  </div>
                </div>
              </div>

              {/* Products grid */}
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {homeOutdoorProducts.map((item, idx) => (
                    <ProductCard key={idx} item={item} type="price" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Consumer electronics and gadgets */}
          <section className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex gap-5">
              {/* Left banner */}
              <div className="w-52 flex-shrink-0 hidden md:block">
                <div className="bg-blue-50 rounded-lg p-5 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Consumer<br />electronics and<br />gadgets</h3>
                    <button className="mt-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                      Source now
                    </button>
                  </div>
                  <div className="mt-4">
                    <img src="/images/tech/9.png" alt="Consumer electronics" className="w-full h-28 object-contain" />
                  </div>
                </div>
              </div>

              {/* Products grid */}
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {consumerElectronics.map((item, idx) => (
                    <ProductCard key={idx} item={item} type="price" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Request for Quote */}
          <section className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 text-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3 leading-tight">An easy way to send requests to all suppliers</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                </p>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="bg-white rounded-lg p-5 text-gray-800">
                  <h3 className="font-semibold text-sm mb-3">Send quote to suppliers</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="What item you need?"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                    <textarea
                      placeholder="Type more details..."
                      rows={3}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 resize-none"
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="w-32 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                        value={quoteQuantity}
                        onChange={(e) => setQuoteQuantity(e.target.value)}
                      />
                      <select className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white">
                        <option>Pcs</option>
                        <option>Kg</option>
                        <option>Lots</option>
                      </select>
                    </div>
                    <button className="bg-blue-500 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-600 transition-colors">
                      Send inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recommended Items */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended items</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {recommendedItems.map((item, idx) => (
                <ProductCard key={idx} item={item} type="price" />
              ))}
            </div>
          </section>

          {/* Extra Services */}
          <section className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Our extra services</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {services.map((service, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
                  <div className={`mb-3 w-14 h-14 ${service.color} rounded-full flex items-center justify-center`}>
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{service.title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Suppliers by Region */}
          <section className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Suppliers by region</h2>
            <div className="flex flex-wrap gap-3">
              {regions.map((region, idx) => (
                <button key={idx} className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-2">
                  <span className="text-base">{region.flag}</span>
                  <div className="text-left">
                    <div className="font-medium text-xs">{region.name}</div>
                    <div className="text-[10px] text-gray-400">{region.domain}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <section className="bg-white rounded-lg p-8 text-center border border-gray-100 shadow-sm">
            <Mail className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Subscribe on our newsletter</h2>
            <p className="text-gray-500 mb-5 text-sm max-w-md mx-auto">
              Get daily news on upcoming offers from many suppliers all over the world
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm"
              />
              <button className="bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
