import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, MotionConfig } from 'framer-motion'

const Menu = ({ list }) => {
  const [hovered, setHovered] = useState(null)

  return (
    <MotionConfig transition={{ bounce: 0, type: 'tween' }}>
      <nav className="relative">
        <ul className="flex items-center gap-1">
          {list?.map((item) => (
            <li key={item.id} className="relative">
              <Link
                className={`
                  relative flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition-all
                  hover:bg-red-900/20
                  ${hovered === item?.id ? 'bg-red-900/20 text-red-200' : 'text-red-100/80'}
                `}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                to={item?.url}
              >
                {item?.title}
              </Link>
              {hovered === item?.id && !item?.dropdown && (
                <motion.div
                  layout
                  layoutId="cursor"
                  className="absolute h-0.5 w-full bg-red-500"
                />
              )}
              {item?.dropdown && hovered === item?.id && (
                <div
                  className="absolute left-0 top-full"
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.div
                    layout
                    transition={{ bounce: 0 }}
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    exit={{ y: 10 }}
                    style={{ borderRadius: '8px' }}
                    className="mt-2 flex w-56 flex-col rounded-lg bg-black border border-red-900/40 shadow-xl"
                    layoutId="cursor"
                  >
                    {item?.items?.map((nav) => (
                      <motion.div
                        key={`link-${nav?.id}`}
                        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                      >
                        <Link
                          to={nav?.url}
                          className="block w-full p-3 text-sm text-red-100/80 hover:text-red-200"
                        >
                          {nav?.title}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </MotionConfig>
  )
}

export default Menu
