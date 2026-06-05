import { FiLoader } from 'react-icons/fi'

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <FiLoader className="w-8 h-8 text-primary animate-spin" />
    </div>
  )
}

export default Loader