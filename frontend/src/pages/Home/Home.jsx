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
import PageLoader from '../../components/PageLoader/PageLoader';

const homeOutdoorProducts = [
  { name: 'Baby & Child Care', categoryName: 'Baby & Child Care', parentName: 'Health & HouseHold', image: '/products/Health%20%26%20HouseHold/Baby%20%26%20Child%20Care/Baby%20Brezza%20Formula%20Pro%20One-Step%20Baby%20Formula%20Dispenser/Baby%20Brezza%20Formula%20Pro%20One-Step%20Baby%20Formula%20Dispenser%201.jpg' },
  { name: 'Health Care', categoryName: 'Health Care', parentName: 'Health & HouseHold', image: '/products/Health%20%26%20HouseHold/Health%20Care/Braun%20ThermoScan%207%20Ear%20Thermometer%20IRT6520/Braun%20ThermoScan%207%20Ear%20Thermometer%20IRT6520%201.jpg' },
  { name: 'Household Supplies', categoryName: 'Household Supplies', parentName: 'Health & HouseHold', image: '/products/Health%20%26%20HouseHold/Household%20Supplies/Bounty%20Select-A-Size%20Paper%20Towels%20(12%20Double%20Rolls)/Bounty%20Select-A-Size%20Paper%20Towels%20(12%20Double%20Rolls)%201.jpg' },
  { name: 'Personal Care', categoryName: 'Personal Care', parentName: 'Health & HouseHold', image: '/products/Health%20%26%20HouseHold/Personal%20Care/Dove%20Men%2BCare%20Body%20Wash%20Extra%20Fresh%20(30.6oz%2C%203-pack)/Dove%20Men%2BCare%20Body%20Wash%20Extra%20Fresh%20(30.6oz%2C%203-pack)%201.jpg' },
  { name: 'Sports Nutrition', categoryName: 'Sports Nutrition', parentName: 'Health & HouseHold', image: '/products/Health%20%26%20HouseHold/Sports%20Nutrition/BSN%20SYNTHA-6%20Protein%20Powder%204.56%20lb/BSN%20SYNTHA-6%20Protein%20Powder%204.56%20lb%201.jpg' },
  { name: 'Vitamins & Supplements', categoryName: 'Vitamins & Dietary Supplements', parentName: 'Health & HouseHold', image: '/products/Health%20%26%20HouseHold/Vitamins%20%26%20Dietary%20Supplements/Airborne%20Vitamin%20C%201000mg%20Supplement%20(116%20tablets)/Airborne%20Vitamin%20C%201000mg%20Supplement%20(116%20tablets)%201.jpg' },
  { name: 'Oral Care', categoryName: 'Oral Care', parentName: 'Health & HouseHold', image: '/products/Health%20%26%20HouseHold/Oral%20Care/ACT%20Restoring%20Anticavity%20Mouthwash%2033.8oz%20(2-pack)/ACT%20Restoring%20Anticavity%20Mouthwash%2033.8oz%20(2-pack)%201.jpg' },
  { name: 'Wellness & Relaxation', categoryName: 'Wellness & Relaxation', parentName: 'Health & HouseHold', image: '/products/Health%20%26%20HouseHold/Wellness%20%26%20Relaxation/Aenllosi%20Storage%20Organizer%20Hard%20Case/Aenllosi%20Storage%20Organizer%20Hard%20Case%201.jpg' },
];

const consumerElectronics = [
  { name: 'Cell Phones & Accessories', categoryName: 'Cell Phones & Accessories', parentName: 'Electronics', image: '/products/Electronics/Cell%20Phones%20%26%20Accessories/Anker%20PowerCore%2010000mAh%20Power%20Bank/Anker%20PowerCore%2010000mAh%20Power%20Bank%201.jpg' },
  { name: 'Camera & Photo', categoryName: 'Camera & Photo', parentName: 'Electronics', image: '/products/Electronics/Camera%20%26%20Photo/Canon%20EOS%20M50%20Mark%20II%20Mirrorless%20(15-45mm%20Kit)/Canon%20EOS%20M50%20Mark%20II%20Mirrorless%20(15-45mm%20Kit)%201.jpg' },
  { name: 'Headphones', categoryName: 'Headphones', parentName: 'Electronics', image: '/products/Electronics/Headphones/Apple%20AirPods%20Pro%20(2nd%20Generation)/Apple%20AirPods%20Pro%20(2nd%20Generation)%201.jpg' },
  { name: 'Computers & Accessories', categoryName: 'Computers & Accessories', parentName: 'Electronics', image: '/products/Electronics/Computers%20%26%20Accessories/Blue%20Yeti%20USB%20Microphone/Blue%20Yeti%20USB%20Microphone%201.jpg' },
  { name: 'Video Game Consoles', categoryName: 'Video Game Consoles & Accessories', parentName: 'Electronics', image: '/products/Electronics/Video%20Game%20Consoles%20%26%20Accessories/DualSense%20Wireless%20Controller%20for%20PS5%20(White)/DualSense%20Wireless%20Controller%20for%20PS5%20(White)%201.jpg' },
  { name: 'Wearable Technology', categoryName: 'Wearable Technology', parentName: 'Electronics', image: '/products/Electronics/Wearable%20Technology/Amazfit%20GTR%203%20Smartwatch/Amazfit%20GTR%203%20Smartwatch%201.jpg' },
  { name: 'Television & Video', categoryName: 'Television & Video', parentName: 'Electronics', image: '/products/Electronics/Television%20%26%20Video/Amazon%20Fire%20TV%20Stick%204K%20Max%20(2nd%20Gen)/Amazon%20Fire%20TV%20Stick%204K%20Max%20(2nd%20Gen)%201.jpg' },
  { name: 'Portable Audio & Video', categoryName: 'Portable Audio & Video', parentName: 'Electronics', image: '/products/Electronics/Portable%20Audio%20%26%20Video/Amazon%20Fire%20HD%2010%20Tablet%20(32GB)%20for%20Media/Amazon%20Fire%20HD%2010%20Tablet%20(32GB)%20for%20Media%201.jpg' },
];

const recommendedItems = [
  { name: 'Apple iPad (10th Generation) 64GB WiFi', price: '$449', id: '6a3e1716282c4f7fe8ad5815', image: '/products/Computers/Computers%20%26%20Tablets/Apple%20iPad%20(10th%20Generation)%2064GB%20WiFi/Apple%20iPad%20(10th%20Generation)%2064GB%20WiFi%201.jpg' },
  { name: 'Samsung Galaxy Tab S9 FE 128GB', price: '$349', id: '6a3e1716282c4f7fe8ad5818', image: '/products/Computers/Computers%20%26%20Tablets/Samsung%20Galaxy%20Tab%20S9%20FE%20128GB/Samsung%20Galaxy%20Tab%20S9%20FE%20128GB%201.jpg' },
  { name: 'HyperX Alloy Origins Core Mechanical Keyboard', price: '$69', id: '6a3e1713282c4f7fe8ad580b', image: '/products/Computers/Computer%20Accessories%20%26%20Peripherals/HyperX%20Alloy%20Origins%20Core%20Mechanical%20Keyboard/HyperX%20Alloy%20Origins%20Core%20Mechanical%20Keyboard%201.jpg' },
  { name: 'AMD Ryzen 5 5600X Processor', price: '$150', id: '6a3e1714282c4f7fe8ad580f', image: '/products/Computers/Computer%20Components/AMD%20Ryzen%205%205600X%20Processor/AMD%20Ryzen%205%205600X%20Processor%201.jpg' },
  { name: 'Samsung T7 1TB Portable SSD', price: '$100', id: '6a3e1717282c4f7fe8ad5819', image: '/products/Computers/Data%20Storage/Samsung%20T7%201TB%20Portable%20SSD/Samsung%20T7%201TB%20Portable%20SSD%201.jpg' },
  { name: 'Seagate Portable 2TB External Hard Drive', price: '$55', id: '6a3e1718282c4f7fe8ad581c', image: '/products/Computers/Data%20Storage/Seagate%20Portable%202TB%20External%20Hard%20Drive/Seagate%20Portable%202TB%20External%20Hard%20Drive%201.jpg' },
  { name: 'Logitech MX Master 3S Wireless Mouse', price: '$99', id: '6a3e1714282c4f7fe8ad580e', image: '/products/Computers/Computer%20Accessories%20%26%20Peripherals/Logitech%20MX%20Master%203S%20Wireless%20Mouse/Logitech%20MX%20Master%203S%20Wireless%20Mouse%201.webp' },
  { name: 'Microsoft Surface Go 3 Tablet (8GB, 128GB)', price: '$549', id: '6a3e1716282c4f7fe8ad5817', image: '/products/Computers/Computers%20%26%20Tablets/Microsoft%20Surface%20Go%203%20Tablet%20(8GB%2C%20128GB)/Microsoft%20Surface%20Go%203%20Tablet%20(8GB%2C%20128GB)%201.jpg' },
  { name: 'WD My Passport 4TB Portable HDD', price: '$89', id: '6a3e1718282c4f7fe8ad581d', image: '/products/Computers/Data%20Storage/WD%20My%20Passport%204TB%20Portable%20HDD%20Black/WD%20My%20Passport%204TB%20Portable%20HDD%201.jpg' },
  { name: 'SanDisk 128GB Ultra USB 3.0 Flash Drive', price: '$20', id: '6a3e1717282c4f7fe8ad581a', image: '/products/Computers/Data%20Storage/SanDisk%20128GB%20Ultra%20USB%203.0%20Flash%20Drive/SanDisk%20128GB%20Ultra%20USB%203.0%20Flash%20Drive%201.jpg' },
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

const dealsProducts = [
  { keyword: 'Canon EOS M50', name: 'Canon EOS M50 Mark II Mirrorless (15-45mm Kit)', price: 699, image: '/products/Electronics/Camera%20%26%20Photo/Canon%20EOS%20M50%20Mark%20II%20Mirrorless%20(15-45mm%20Kit)/Canon%20EOS%20M50%20Mark%20II%20Mirrorless%20(15-45mm%20Kit)%201.jpg' },
  { keyword: 'LG C5', name: 'LG C5 55 OLED evo 4K Smart TV', price: 1296, image: '/products/Electronics/Television%20%26%20Video/LG%20C5%2055%20OLED%20evo%204K%20Smart%20TV/LG%20C5%2055%20OLED%20evo%204K%20Smart%20TV%201.jpg' },
  { keyword: 'Fire TV Stick 4K', name: 'Amazon Fire TV Stick 4K Max (2nd Gen)', price: 60, image: '/products/Electronics/Television%20%26%20Video/Amazon%20Fire%20TV%20Stick%204K%20Max%20(2nd%20Gen)/Amazon%20Fire%20TV%20Stick%204K%20Max%20(2nd%20Gen)%201.jpg' },
  { keyword: 'Arlo Pro 4', name: 'Arlo Pro 4 Wireless Security Camera (3-pack)', price: 300, image: '/products/Electronics/Security%20%26%20Surveillance/Arlo%20Pro%204%20Wireless%20Security%20Camera%20(3-pack)/Arlo%20Pro%204%20Wireless%20Security%20Camera%20(3-pack)%201.jpg' },
  { keyword: 'DualSense', name: 'DualSense Wireless Controller for PS5 (White)', price: 70, image: '/products/Electronics/Video%20Game%20Consoles%20%26%20Accessories/DualSense%20Wireless%20Controller%20for%20PS5%20(White)/DualSense%20Wireless%20Controller%20for%20PS5%20(White)%201.jpg' },
];

const services = [
  { title: 'Source from Industry Hubs', icon: <Search className="service-icon w-5 h-5 text-white" />, color: 'bg-amber-500', image: '/images/services/Industrial Hub.png' },
  { title: 'Customize Your Products', icon: <Settings className="service-icon w-5 h-5 text-white" />, color: 'bg-amber-500', image: '/images/services/Customize Products.png' },
  { title: 'Fast, reliable shipping by ocean or air', icon: <Truck className="service-icon w-5 h-5 text-white" />, color: 'bg-amber-500', image: '/images/services/Shipping.png' },
  { title: 'Product monitoring and inspection', icon: <Shield className="service-icon w-5 h-5 text-white" />, color: 'bg-amber-500', image: '/images/services/Monitoring.png' },
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
  <div className="product-card bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer h-full">
    <div className="product-card-image-wrapper w-full h-28 bg-gray-50 rounded-md flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors overflow-hidden p-2">
      <img src={item.image} alt={item.name} className="product-card-image max-h-full max-w-full object-contain" />
    </div>
    <h3 className="product-card-name text-xs font-medium text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
    {type === 'discount' && item.discount && (
      <span className="product-card-discount text-red-500 font-bold text-xs mt-auto">{item.discount}</span>
    )}
    {type === 'price' && item.price && (
      <span className="product-card-price text-gray-900 font-bold text-xs mt-auto">{item.price}</span>
    )}
  </div>
);

export default function Home() {
  const [quoteQuantity, setQuoteQuantity] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategoryMap, setSubCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);

  const homeOutdoorParentId = categories.find(c => c.name === 'Health & HouseHold')?._id;
  const electronicsParentId = categories.find(c => c.name === 'Electronics')?._id;

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchProducts({ featured: 'true', pageSize: 5 });
        setFeaturedProducts(data.products || []);
      } catch (error) {
        console.error('Failed to load featured products:', error);
      }
    };
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        const parents = (data || []).filter(c => !c.parent);
        setCategories(parents);

        const childResults = await Promise.all(
          parents.map(p => fetchCategories({ parent: p._id }))
        );

        const grandchildrenResults = await Promise.all(
          childResults.flat().filter(Boolean).map(c => fetchCategories({ parent: c._id }))
        );

        const map = {};
        childResults.forEach((children, i) => {
          const parentId = parents[i]._id;
          (children || []).forEach(child => {
            map[child.name] = { id: child._id, parentId };
          });
        });
        grandchildrenResults.forEach((gcs) => {
          (gcs || []).forEach(gc => {
            if (!map[gc.name]) {
              map[gc.name] = { id: gc._id, parentId: '' };
            }
          });
        });

        setSubCategoryMap(map);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    Promise.all([loadFeatured(), loadCategories()]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoader show={true} />;
  }

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
                  to={`/products?parentCategory=${cat._id}`}
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
            <div className="deals-grid grid grid-cols-2 md:grid-cols-5 gap-4 auto-rows-fr">
              {dealsProducts.map((product, idx) => (
                <Link to={`/products?keyword=${encodeURIComponent(product.keyword)}`} key={idx}>
                  <div className="product-card bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer h-full">
                    <div className="product-card-image-wrapper w-full h-28 bg-gray-50 rounded-md flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors overflow-hidden p-2">
                      <img src={product.image} alt={product.name} className="product-card-image max-h-full max-w-full object-contain" />
                    </div>
                    <h3 className="product-card-name text-xs font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                    <span className="product-card-price text-gray-900 font-bold text-xs mt-auto">${product.price}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link to="/products" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                View all products
              </Link>
            </div>
          </section>

          {/* Home and outdoor */}
          <section className="home-outdoor-section bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            {/* Mobile banner */}
            <div className="block md:hidden mb-4">
              <Link to={homeOutdoorParentId ? `/products?parentCategory=${homeOutdoorParentId}` : '/products'} className="home-outdoor-banner-card bg-amber-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="home-outdoor-banner-title text-lg font-bold text-gray-900 leading-tight">Home and outdoor</h3>
                </div>
                <span className="home-outdoor-banner-cta bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                  Shop Now
                </span>
              </Link>
            </div>

            <div className="home-outdoor-content flex gap-5">
              {/* Left banner - desktop only */}
              <div className="home-outdoor-banner w-52 flex-shrink-0 hidden md:block">
                <Link to={homeOutdoorParentId ? `/products?parentCategory=${homeOutdoorParentId}` : '/products'} className="home-outdoor-banner-card bg-amber-50 rounded-lg p-5 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="home-outdoor-banner-title text-lg font-bold text-gray-900 leading-tight">Home and<br />outdoor</h3>
                    <span className="home-outdoor-banner-cta mt-3 inline-block bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                      Shop Now
                    </span>
                  </div>
                </Link>
              </div>

              {/* Products grid */}
              <div className="home-outdoor-products flex-1">
                <div className="home-outdoor-grid grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
                  {homeOutdoorProducts.map((item, idx) => {
                    const catInfo = subCategoryMap[item.categoryName];
                    const linkTo = catInfo
                      ? `/products?category=${catInfo.id}&parentCategory=${catInfo.parentId}`
                      : `/products?keyword=${encodeURIComponent(item.categoryName)}`;
                    return (
                    <Link to={linkTo} key={idx}>
                      <div className="product-card bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer h-full">
                        <div className="product-card-image-wrapper w-full h-28 bg-gray-50 rounded-md flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors overflow-hidden p-2">
                          <img src={item.image} alt={item.name} className="product-card-image max-h-full max-w-full object-contain" />
                        </div>
                        <h3 className="product-card-name text-xs font-medium text-gray-800 line-clamp-2 mt-auto">{item.name}</h3>
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Consumer electronics and gadgets */}
          <section className="consumer-section bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            {/* Mobile banner */}
            <div className="block md:hidden mb-4">
              <Link to={electronicsParentId ? `/products?parentCategory=${electronicsParentId}` : '/products'} className="consumer-banner-card bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="consumer-banner-title text-lg font-bold text-gray-900 leading-tight">Consumer electronics and gadgets</h3>
                </div>
                <span className="consumer-banner-cta bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                  Shop now
                </span>
              </Link>
            </div>

            <div className="consumer-content flex gap-5">
              {/* Left banner - desktop only */}
              <div className="consumer-banner w-52 flex-shrink-0 hidden md:block">
                <Link to={electronicsParentId ? `/products?parentCategory=${electronicsParentId}` : '/products'} className="consumer-banner-card bg-blue-50 rounded-lg p-5 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="consumer-banner-title text-lg font-bold text-gray-900 leading-tight">Consumer<br />electronics and<br />gadgets</h3>
                    <span className="consumer-banner-cta mt-3 inline-block bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                      Shop now
                    </span>
                  </div>
                </Link>
              </div>

              {/* Products grid */}
              <div className="consumer-products flex-1">
                <div className="consumer-grid grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
                  {consumerElectronics.map((item, idx) => {
                    const catInfo = subCategoryMap[item.categoryName];
                    const linkTo = catInfo
                      ? `/products?category=${catInfo.id}&parentCategory=${catInfo.parentId}`
                      : `/products?keyword=${encodeURIComponent(item.categoryName)}`;
                    return (
                    <Link to={linkTo} key={idx}>
                      <div className="product-card bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer h-full">
                        <div className="product-card-image-wrapper w-full h-28 bg-gray-50 rounded-md flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors overflow-hidden p-2">
                          <img src={item.image} alt={item.name} className="product-card-image max-h-full max-w-full object-contain" />
                        </div>
                        <h3 className="product-card-name text-xs font-medium text-gray-800 line-clamp-2 mt-auto">{item.name}</h3>
                      </div>
                    </Link>
                    );
                  })}
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
            <div className="recommended-grid grid grid-cols-2 md:grid-cols-5 gap-4 auto-rows-fr">
              {recommendedItems.map((item, idx) => (
                <Link to={`/products/${item.id}`} key={idx}>
                  <ProductCard item={item} type="price" />
                </Link>
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
