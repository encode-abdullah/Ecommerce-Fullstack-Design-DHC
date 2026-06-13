import { Star, ShoppingCart } from 'lucide-react'

const ProductCard = ({ product, onView, onAddToCart }) => {
  return (
    <div
      className="group relative bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF2C2C]/50 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onView?.(product.id)}
    >
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 bg-[#FF2C2C] text-white text-[10px] font-['Unbounded',sans-serif] font-medium px-2 py-1 rounded-full tracking-wide">
          {product.badge}
        </div>
      )}
      {!product.inStock && (
        <div className="absolute top-3 right-3 z-10 bg-black/70 text-white/60 text-[10px] font-['Unbounded',sans-serif] px-2 py-1 rounded-full">
          Out of Stock
        </div>
      )}

      <div className="relative overflow-hidden bg-[#111] h-48 md:h-52">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-[#888] text-xs font-['Unbounded',sans-serif] tracking-wide">{product.category}</p>
        <h3 className="text-white font-['Unbounded',sans-serif] font-medium text-sm leading-snug line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(product.rating) ? 'fill-[#FF4444] text-[#FF4444]' : 'text-gray-600'} />
            ))}
          </div>
          <span className="text-xs text-[#888] font-['Unbounded',sans-serif]">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-white font-['Unbounded',sans-serif] font-medium text-base">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-[#666] text-xs font-['Unbounded',sans-serif] line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart?.(product)
            }}
            disabled={!product.inStock}
            className="bg-[#FF2C2C] hover:bg-[#CC2020] disabled:bg-[#333] disabled:text-[#666] text-white p-2 rounded-full transition-colors"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
