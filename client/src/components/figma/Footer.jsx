import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#212121] mt-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="space-y-3">
            <p className="font-['Unbounded',sans-serif] font-medium text-sm text-white tracking-wide">Contact Us:</p>
            <p className="font-['Unbounded',sans-serif] font-medium text-sm text-white tracking-wide">+92342312121412</p>
            <p className="font-['Unbounded',sans-serif] font-medium text-sm text-white tracking-wide">abdullaharif0789@gmail.com</p>
            <p className="font-['Unbounded',sans-serif] font-medium text-sm text-white tracking-wide">Or Visit our Shop:</p>
            <p className="font-['Unbounded',sans-serif] font-medium text-sm text-white tracking-wide leading-relaxed">
              Gulshan block 3, Near ChaseUp Gulshan Chowrangi, Karachi
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-['Unbounded',sans-serif] font-medium text-sm text-white tracking-wide">Our Policies:</p>
            {['Shipping Policy', 'Terms & Conditions', 'Return & Refund Policy', 'Payment Policy'].map((policy) => (
              <p key={policy} className="font-['Unbounded',sans-serif] font-medium text-sm text-white/70 tracking-wide hover:text-white cursor-pointer transition-colors">
                {policy}
              </p>
            ))}
          </div>

          <div className="space-y-3">
            <p className="font-['Unbounded',sans-serif] font-medium text-sm text-white tracking-wide">For Further Details Scan QR Code:</p>
            <div className="w-[120px] h-[120px] rounded-xl bg-white flex items-center justify-center text-black text-xs font-bold">QR CODE</div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#AEAEAE]/30 text-center">
          <p className="font-['Unbounded',sans-serif] font-medium text-sm text-white tracking-wide">© 2026 Inferno. All Right Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
