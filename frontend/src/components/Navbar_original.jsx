import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

function Navbar({ onSearch }) {
  const { cartCount } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(searchTerm)
    navigate('/')
  }

  return (
    <nav className="bg-[#131921] text-white sticky top-0 z-50">
      
      {/* Top Navbar */}
      <div className="flex items-center gap-4 px-4 py-2">

        {/* Amazon Logo */}
        <Link to="/" className="border-2 border-transparent 
        hover:border-white px-2 py-1 flex-shrink-0">
          <div className="text-white font-bold text-2xl">
            amazon
          </div>
          <div className="text-[#FF9900] text-xs font-bold">.in</div>
        </Link>

        {/* Deliver To */}
        <div className="hidden md:flex flex-col text-xs 
        flex-shrink-0 border-2 border-transparent 
        hover:border-white px-2 py-1 cursor-pointer">
          <span className="text-gray-400">Deliver to</span>
          <span className="font-bold text-sm">India</span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-1">
          <select className="bg-[#f3f3f3] text-black text-sm 
          px-2 rounded-l-md border-none outline-none 
          hidden md:block h-10">
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Books</option>
            <option>Home</option>
            <option>Sports</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Amazon.in"
            className="flex-1 px-4 py-2 text-black 
            outline-none text-sm h-10"
          />
          <button
            type="submit"
            className="bg-[#FF9900] hover:bg-[#F3A847] 
            px-4 rounded-r-md h-10"
          >
            🔍
          </button>
        </form>

        {/* Account */}
        <div className="hidden md:flex flex-col text-xs 
        flex-shrink-0 border-2 border-transparent 
        hover:border-white px-2 py-1 cursor-pointer">
          <span className="text-gray-400">Hello, User</span>
          <span className="font-bold text-sm">Account & Lists</span>
        </div>

        {/* Returns */}
        <div className="hidden md:flex flex-col text-xs 
        flex-shrink-0 border-2 border-transparent 
        hover:border-white px-2 py-1 cursor-pointer">
          <span className="text-gray-400">Returns</span>
          <span className="font-bold text-sm">& Orders</span>
        </div>

        {/* Cart */}
        <Link to="/cart" className="flex items-end gap-1 
        border-2 border-transparent hover:border-white 
        px-2 py-1 flex-shrink-0">
          <div className="relative">
            <span className="text-3xl">🛒</span>
            <span className="absolute -top-1 -right-1 
            bg-[#FF9900] text-black text-xs font-bold 
            rounded-full w-5 h-5 flex items-center 
            justify-center">
              {cartCount}
            </span>
          </div>
          <span className="font-bold text-sm hidden md:block">
            Cart
          </span>
        </Link>

      </div>

      {/* Bottom Nav Bar — Categories */}
      <div className="bg-[#232F3E] flex items-center 
      gap-1 px-4 py-1 text-sm overflow-x-auto">
        <span className="flex items-center gap-1 
        hover:border hover:border-white px-2 py-1 
        cursor-pointer whitespace-nowrap font-bold">
          ☰ All
        </span>
        {['Electronics', 'Fashion', 'Home & Kitchen', 
          'Books', 'Sports', 'Toys', 'Beauty'].map(cat => (
          <span key={cat} className="hover:border 
          hover:border-white px-2 py-1 cursor-pointer 
          whitespace-nowrap">
            {cat}
          </span>
        ))}
      </div>

    </nav>
  )
}

export default Navbar
