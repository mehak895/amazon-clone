function Footer() {
  return (
    <footer>

      {/* Back to top */}
      <div
        className="bg-[#37475A] text-white text-center 
        py-4 text-sm cursor-pointer hover:bg-[#485769]"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </div>

      {/* Main Footer */}
      <div className="bg-[#232F3E] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 
        md:grid-cols-4 gap-8">

          <div>
            <h3 className="font-bold mb-3 text-sm">Get to Know Us</h3>
            {['About Amazon', 'Careers', 'Press Releases',
              'Amazon Science'].map(item => (
              <p key={item} className="text-gray-400 text-sm 
              mb-1 hover:text-white cursor-pointer">{item}</p>
            ))}
          </div>

          <div>
            <h3 className="font-bold mb-3 text-sm">
              Connect with Us
            </h3>
            {['Facebook', 'Twitter', 'Instagram'].map(item => (
              <p key={item} className="text-gray-400 text-sm 
              mb-1 hover:text-white cursor-pointer">{item}</p>
            ))}
          </div>

          <div>
            <h3 className="font-bold mb-3 text-sm">
              Make Money with Us
            </h3>
            {['Sell on Amazon', 'Advertise Your Products',
              'Amazon Pay'].map(item => (
              <p key={item} className="text-gray-400 text-sm 
              mb-1 hover:text-white cursor-pointer">{item}</p>
            ))}
          </div>

          <div>
            <h3 className="font-bold mb-3 text-sm">
              Let Us Help You
            </h3>
            {['Your Account', 'Returns Centre',
              'Help'].map(item => (
              <p key={item} className="text-gray-400 text-sm 
              mb-1 hover:text-white cursor-pointer">{item}</p>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#131921] text-gray-400 text-center 
      py-4 text-xs">
        <p className="font-bold text-white text-xl mb-2">amazon</p>
        <p>© 2024 Amazon Clone. Built for Scaler Assignment.</p>
      </div>

    </footer>
  )
}

export default Footer
