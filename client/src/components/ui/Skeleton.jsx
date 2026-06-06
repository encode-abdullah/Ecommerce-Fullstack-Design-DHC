const Skeleton = ({ className = '', count = 1, height = 'h-48' }) => {
  const items = Array(count).fill(null)
  
  return (
    <>
      {items.map((_, i) => (
        <div 
          key={i}
          className={`bg-red-900/20 rounded-lg animate-pulse ${height} ${className}`}
        />
      ))}
    </>
  )
}

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-black border border-red-900/20 rounded-lg overflow-hidden">
      <div className="h-48 bg-red-900/20 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-red-900/20 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-red-900/20 rounded animate-pulse w-1/2" />
        <div className="h-6 bg-red-900/20 rounded animate-pulse w-1/4" />
      </div>
    </div>
  )
}

export const TextSkeleton = ({ lines = 3 }) => {
  return (
    <div className="space-y-2">
      {Array(lines).fill(null).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-red-900/20 rounded animate-pulse"
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  )
}

export default Skeleton