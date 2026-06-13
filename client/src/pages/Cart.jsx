import { useState, useEffect } from 'react'
import { Trash2, ShoppingBag, ArrowLeft, Tag, Truck } from 'lucide-react'
import { products } from '../data/products.js'
import Footer from '../components/figma/Footer.jsx'

const CartPage = ({ items, onUpdateQuantity, onRemove, onNavigate }) => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    setCartItems(items)
  }, [items])

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const discount = subtotal * 0.1
  const total = subtotal + shipping - discount

  if (cartItems.length === 0) {
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4">
          <div className="text-center max-w-sm">
            <ShoppingBag size={64} className="text-white/20 mx-auto mb-6" />
            <h2 className="font-['Unbounded',sans-serif] font-medium text-white text-xl mb-3">Your cart is empty</h2>
            <p className="font-['Unbounded',sans-serif] font-light text-white/40 text-sm mb-8 leading-relaxed">
              Looks like you haven't added any items yet.
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-[#FF2C2C] hover:bg-[#CC2020] text-white font-['Unbounded',sans-serif] font-medium text-sm px-8 py-3.5 rounded-full transition-colors tracking-wide"
            >
              Start Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="pt-24 md:pt-28 px-4 md:px-12 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 text-white/50 hover:text-white font-['Unbounded',sans-serif] font-light text-xs tracking-wide transition-colors"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </button>
          </div>

          <h1 className="font-['Unbounded',sans-serif] font-medium text-white text-3xl md:text-4xl tracking-wide mb-2">Cart</h1>
          <p className="font-['Unbounded',sans-serif] font-light text-white/40 text-sm mb-10">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-[#111] border border-white/10 rounded-2xl p-4 flex gap-4 hover:border-white/20 transition-colors"
                >
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => onNavigate(`product-${product.id}`)}
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-['Unbounded',sans-serif] font-light text-[#FF4444] text-[10px] tracking-widest uppercase mb-1">
                      {product.category}
                    </p>
                    <h3
                      className="font-['Unbounded',sans-serif] font-medium text-white text-sm leading-snug mb-2 cursor-pointer hover:text-[#FF4444] transition-colors line-clamp-2"
                      onClick={() => onNavigate(`product-${product.id}`)}
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-full px-1 py-1">
                        <button
                          onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-white hover:text-[#FF4444] transition-colors font-medium"
                        >
                          -
                        </button>
                        <span className="font-['Unbounded',sans-serif] font-light text-white text-sm w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-white hover:text-[#FF4444] transition-colors font-medium"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className="font-['Unbounded',sans-serif] font-medium text-base"
                          style={{
                            background: 'radial-gradient(ellipse, #FF4D4D 0%, #CC2222 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemove(product.id)}
                          className="text-white/30 hover:text-[#FF4444] transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-[#111] border border-white/10 rounded-2xl p-6 space-y-5">
                <h2 className="font-['Unbounded',sans-serif] font-medium text-white text-base tracking-wide">Order Summary</h2>
                <div className="space-y-3 pb-4 border-b border-white/10">
                  <div className="flex justify-between">
                    <span className="font-['Unbounded',sans-serif] font-light text-white/50 text-xs">Subtotal</span>
                    <span className="font-['Unbounded',sans-serif] font-light text-white text-xs">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Unbounded',sans-serif] font-light text-white/50 text-xs flex items-center gap-1">
                      <Truck size={10} /> Shipping
                    </span>
                    <span className="font-['Unbounded',sans-serif] font-light text-xs text-green-400">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Unbounded',sans-serif] font-light text-white/50 text-xs flex items-center gap-1">
                      <Tag size={10} /> Discount (10%)
                    </span>
                    <span className="font-['Unbounded',sans-serif] font-light text-[#FF4444] text-xs">-${discount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-full px-3 py-2 text-white font-['Unbounded',sans-serif] font-light text-xs placeholder-white/30 outline-none focus:border-[#FF2C2C]/50 transition-colors"
                  />
                  <button className="bg-[#222] hover:bg-[#333] text-white font-['Unbounded',sans-serif] font-light text-xs px-4 py-2 rounded-full transition-colors">
                    Apply
                  </button>
                </div>
                <p className="font-['Unbounded',sans-serif] font-light text-white/30 text-[10px]">
                  Try "EncodeAbdullah" for extra 30% off Pakistan orders
                </p>

                <div className="flex justify-between pt-2">
                  <span className="font-['Unbounded',sans-serif] font-medium text-white text-sm">Total</span>
                  <span
                    className="font-['Unbounded',sans-serif] font-medium text-xl"
                    style={{
                      background: 'radial-gradient(ellipse, #FF4D4D 0%, #CC2222 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>

                <button className="w-full bg-[#FF2C2C] hover:bg-[#CC2020] text-white font-['Unbounded',sans-serif] font-medium text-sm py-4 rounded-full transition-colors tracking-wide">
                  Proceed to Checkout
                </button>
                <p className="text-center font-['Unbounded',sans-serif] font-light text-white/30 text-[10px]">
                  Secure checkout powered by Inferno
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CartPage
