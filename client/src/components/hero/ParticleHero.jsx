import { useEffect, useRef, useCallback } from 'react'

const ParticleHero = ({
  title = "FLUX",
  subtitle = "Digital Inferno",
  description = "Experience the mesmerizing dance of light and motion.",
  primaryButton,
  secondaryButton,
  interactiveHint = "Move to Create",
  className = "",
  particleCount = 12,
  children
}) => {
  const containerRef = useRef(null)
  const particlesRef = useRef([])
  const cursorRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef(null)
  const isAutoRef = useRef(true)
  const staticCursorRef = useRef({ x: 0, y: 0 })
  const lastMoveRef = useRef(Date.now())
  const timeoutRef = useRef(null)
  const startTimeRef = useRef(Date.now())
  const rows = particleCount
  const totalParticles = rows * rows

  const createParticles = useCallback(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    container.innerHTML = ''
    particlesRef.current = []

    for (let i = 0; i < totalParticles; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle absolute rounded-full'
      
      const row = Math.floor(i / rows)
      const col = i % rows
      const centerRow = rows / 2
      const centerCol = rows / 2
      
      const dist = Math.sqrt((row - centerRow) ** 2 + (col - centerCol) ** 2)
      const scale = Math.max(0.15, 1.15 - dist * 0.1)
      const opacity = Math.max(0.04, 0.9 - dist * 0.08)
      const lightness = Math.max(18, 72 - dist * 5)
      const glow = Math.max(0.4, 5 - dist * 0.4)

      particle.style.cssText = `
        width: 0.35rem;
        height: 0.35rem;
        left: ${col * 1.6}rem;
        top: ${row * 1.6}rem;
        transform: translate3d(0,0,0) scale(${scale});
        opacity: ${opacity};
        background: hsl(4, 85%, ${lightness}%);
        box-shadow: 0 0 ${glow * 0.15}rem hsl(4, 85%, 58%);
        mix-blend-mode: screen;
        z-index: ${Math.round(totalParticles - dist * 4)};
        will-change: transform;
        transition: transform 0.08s linear;
      `
      container.appendChild(particle)
      particlesRef.current.push(particle)
    }
  }, [rows, totalParticles])

  useEffect(() => {
    createParticles()

    const animate = () => {
      const now = Date.now()
      const t = (now - startTimeRef.current) * 0.001

      if (isAutoRef.current) {
        const x = Math.sin(t * 0.3) * 180 + Math.sin(t * 0.17) * 90
        const y = Math.cos(t * 0.2) * 130 + Math.cos(t * 0.23) * 70
        cursorRef.current = { x, y }
      } else if (now - lastMoveRef.current > 200) {
        const strength = Math.min((now - lastMoveRef.current - 200) / 800, 1)
        const sx = Math.sin(t * 1.5) * 18 * strength
        const sy = Math.cos(t * 1.2) * 14 * strength
        cursorRef.current = {
          x: staticCursorRef.current.x + sx,
          y: staticCursorRef.current.y + sy
        }
      }

      const cx = cursorRef.current.x
      const cy = cursorRef.current.y
      const particles = particlesRef.current
      const len = particles.length

      for (let i = 0; i < len; i++) {
        const p = particles[i]
        const row = (i / rows) | 0
        const col = i % rows
        const dr = rows / 2
        const dc = rows / 2
        const dist = Math.sqrt((row - dr) ** 2 + (col - dc) ** 2)
        const damp = Math.max(0.25, 1 - dist * 0.07)
        p.style.transform = `translate3d(${cx * damp}px, ${cy * damp}px,0) scale(${Math.max(0.15, 1.15 - dist * 0.1)})`
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [createParticles, rows])

  const handlePointerMove = useCallback((e) => {
    const ev = 'touches' in e ? e.touches[0] : e
    const x = (ev.clientX - window.innerWidth / 2) * 0.7
    const y = (ev.clientY - window.innerHeight / 2) * 0.7
    
    cursorRef.current = { x, y }
    staticCursorRef.current = { x, y }
    isAutoRef.current = false
    lastMoveRef.current = Date.now()

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (Date.now() - lastMoveRef.current >= 400) {
        // stays in static mode until 4s of no movement
      }
    }, 400)

    setTimeout(() => {
      if (Date.now() - lastMoveRef.current >= 4000) {
        isAutoRef.current = true
        startTimeRef.current = Date.now()
      }
    }, 4000)
  }, [])

  return (
    <section
      className={`relative w-full min-h-screen bg-black overflow-hidden ${className}`}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative"
          style={{ width: `${rows * 1.6}rem`, height: `${rows * 1.6}rem` }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {children ? (
          children
        ) : (
          <div className="text-center max-w-6xl mx-auto select-none">
            <div className="mb-16">
              <h1 className="text-7xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black tracking-tighter leading-[0.85] mb-8">
                <span className="bg-gradient-to-b from-red-300 via-red-500 to-red-800 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              <div className="space-y-3">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-light text-red-200/90 tracking-[0.25em] uppercase">
                  {subtitle}
                </h2>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
              </div>
            </div>

            {description && (
              <div className="mb-16">
                <p className="text-base md:text-lg text-red-100/50 font-light max-w-2xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {primaryButton && (
                  <button
                    onClick={primaryButton.onClick}
                    className="group relative px-10 py-4 bg-transparent border border-red-500/40 hover:border-red-400 text-red-200 hover:text-white font-medium tracking-wider uppercase transition-all duration-500 overflow-hidden text-sm"
                  >
                    <span className="relative z-10">{primaryButton.text}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-500/15 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </button>
                )}
                {secondaryButton && (
                  <button
                    onClick={secondaryButton.onClick}
                    className="px-8 py-3 border border-white/20 hover:border-red-400 text-white hover:text-red-400 font-semibold rounded-full transition-all duration-300 backdrop-blur-sm text-sm"
                  >
                    {secondaryButton.text}
                  </button>
                )}
              </div>
              {interactiveHint && (
                <div className="flex items-center justify-center gap-4 text-red-400/40 text-xs uppercase tracking-[0.3em]">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-500/30" />
                  <span>{interactiveHint}</span>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-red-500/30" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  )
}

export default ParticleHero
