import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useState } from 'react'

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    // Prevent navigating to product page when clicking button
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    // Reset button text after 1.5 seconds
    setTimeout(() => setAdded(false), 1500)
  }

  // Render star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-[#FF9900]">★</span>
        )
      } else {
        stars.push(
          <span key={i} className="text-gray-300">★</span>
        )
      }
    }
    return stars
  }

  // Format price in Indian format
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN')
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-sm hover:shadow-xl 
      transition-shadow duration-200 cursor-pointer 
      flex flex-col h-full group">

        {/* Badge - Best Seller / Deal / Amazon Choice */}
        <div className="h-6 px-2 pt-1">
          {product.badge && (
            <span className={`text-xs font-bold px-1.5 
            py-0.5 rounded-sm
            ${product.badge === 'Best Seller' 
              ? 'bg-[#FF9900] text-white' 
              : product.badge === 'Deal'
              ? 'bg-red-600 text-white'
              : 'bg-[#232F3E] text-white'
            }`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="flex items-center justify-center 
        p-4 h-48 overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="max-h-full max-w-full object-contain 
            group-hover:scale-105 transition-transform 
            duration-200"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200'
            }}
          />
        </div>

        {/* Product Info */}
        <div className="px-3 pb-3 flex flex-col flex-1">

          {/* Product Name */}
          <p className="text-sm text-gray-800 line-clamp-2 
          mb-1 flex-1 leading-snug">
            {product.name}
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex text-sm">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-[#007185] 
            hover:text-red-600 cursor-pointer">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="mb-2">
            <span className="text-xs align-top mt-1 
            inline-block">₹</span>
            <span className="text-xl font-medium">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Free Delivery */}
          <p className="text-xs text-gray-500 mb-2">
            FREE Delivery by <span className="font-bold 
            text-gray-700">Amazon</span>
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-1.5 rounded-full text-sm 
            font-medium transition-colors duration-200
            ${added
              ? 'bg-green-500 text-white'
              : 'bg-[#FF9900] hover:bg-[#F3A847] text-black'
            }`}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </Link>
  )
}

export default ProductCard