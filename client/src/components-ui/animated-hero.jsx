import { Link, useNavigate } from 'react-router-dom'
import { Gamepad2 } from 'lucide-react'
import { cn } from '../../lib/utils.js'
import { useState, useEffect, useRef } from 'react'

export const ParticleHero = ({
  title = "GAMEGEAR",
  subtitle = "Elite Gaming Hardware",
  description = "Precision-engineered gear for competitive advantage. Level up your setup with premium gaming peripherals.",
  primaryButton,
  secondaryButton,
  interactiveHint = "Explore Collection",
  className,
  particleCount = 12,
}) => {
  const containerRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const rows = particleCount;
    const totalParticles = rows * rows;
    const newParticles = [];
    
    for (let i = 0; i < totalParticles; i++) {
      const row = Math.floor(i / rows);
      const col = i % rows;
      const centerRow = Math.floor(rows / 2);
      const centerCol = Math.floor(rows / 2);
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );
      
      const scale = Math.max(0.2, 1.5 - distanceFromCenter * 0.15);
      const opacity = Math.max(0.1, 1 - distanceFromCenter * 0.12);
      const lightness = Math.max(20, 80 - distanceFromCenter * 7);
      const glowSize = Math.max(0.8, 8 - distanceFromCenter * 0.6);
      
      const colors = ['#06b6d4', '#8b5cf6', '#06b6d4', '#8b5cf6'];
      const color = colors[i % colors.length];
      
      newParticles.push({
        id: i,
        row,
        col,
        distanceFromCenter,
        style: {
          width: '0.5rem',
          height: '0.5rem',
          left: `${col * 2}rem`,
          top: `${row * 2}rem`,
          transform: `scale(${scale})`,
          opacity: opacity,
          backgroundColor: color,
          boxShadow: `0 0 ${glowSize * 0.3}rem ${glowSize * 0.1}rem ${color}`,
          zIndex: Math.round(totalParticles - distanceFromCenter * 5),
        }
      });
    }
    setParticles(newParticles);
  }, [particleCount]);

  useEffect(() => {
    if (!isAutoMode) return;
    
    const interval = setInterval(() => {
      const time = Date.now() * 0.001;
      setCursor({
        x: Math.sin(time * 0.3) * 250 + Math.sin(time * 0.17) * 120,
        y: Math.cos(time * 0.25) * 200 + Math.cos(time * 0.23) * 100
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [isAutoMode]);

  const navigate = useNavigate();

  const handlePointerMove = (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setCursor({
      x: (e.clientX - centerX) * 0.9,
      y: (e.clientY - centerY) * 0.9
    });
    setIsAutoMode(false);
  };

  return (
    <section 
      className={cn('relative w-full min-h-[80vh] bg-background overflow-hidden', className)}
      onMouseMove={handlePointerMove}
    >
      {/* Particle Animation Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: `${particleCount * 2}rem`,
            height: `${particleCount * 2}rem`
          }}
        >
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full will-change-transform transition-transform duration-75"
              style={{
                ...particle.style,
                transform: `translate(${cursor.x * 0.3}px, ${cursor.y * 0.3}px) scale(${particle.style.transform?.split('scale(')[1]?.split(')')[0] || 1})`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Hero Content Overlay */}
      <div className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] mb-6">
              <span className="bg-gradient-to-b from-cyan-300 via-cyan-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                {title}
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin text-cyan-200/90 tracking-[0.3em] uppercase">
                {subtitle}
              </h2>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"></div>
            </div>
          </div>
          
          {/* Description */}
          {description && (
            <div className="mb-16">
              <p className="text-lg md:text-xl lg:text-2xl text-slate-300/70 font-light max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          )}
          
          {/* Call to Action */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => primaryButton?.onClick ? primaryButton.onClick() : navigate("/products")}
                className="group relative px-12 py-6 bg-transparent border-2 border-cyan-500/50 hover:border-purple-500 text-cyan-300 hover:text-white font-medium text-lg tracking-wider uppercase transition-all duration-500 overflow-hidden rounded-lg"
              >
                <span className="relative z-10">{primaryButton?.text || "Shop Now"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-purple-500/30 to-cyan-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
              
              {secondaryButton && (
                <button 
                  onClick={secondaryButton.onClick}
                  className="px-8 py-4 border-2 border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  {secondaryButton.text}
                </button>
              )}
            </div>
            
            {/* Interactive hint */}
            {interactiveHint && (
              <div className="flex items-center justify-center gap-6 text-cyan-400/40 text-sm uppercase tracking-[0.3em]">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-500/30"></div>
                <span className="animate-pulse">{interactiveHint}</span>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500/30"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  )
}