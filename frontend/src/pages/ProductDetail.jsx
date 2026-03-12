import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { productsAPI } from '../api/index'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  // Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productsAPI.getById(id)
        setProduct(data)
      } catch (err) {
        setError('Product not found')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#EAEDED] min-h-screen">
        <Navbar />
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9900]"></div>
          <p className="text-gray-500 mt-4">Loading product...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !product) {
    return (
      <div className="bg-[#EAEDED] min-h-screen">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500 mb-4">
            {error || 'Product not found'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-[#FF9900] px-6 py-2 
            rounded-full font-medium"
          >
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/checkout')
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < fullStars
          ? "text-[#FF9900] text-xl"
          : "text-gray-300 text-xl"}>
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className="bg-[#EAEDED] min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white px-6 py-2 text-xs 
      text-[#007185]">
        <span onClick={() => navigate('/')}
          className="cursor-pointer hover:underline">
          Home
        </span>
        <span className="text-gray-400 mx-1">›</span>
        <span className="cursor-pointer hover:underline">
          {product.category}
        </span>
        <span className="text-gray-400 mx-1">›</span>
        <span className="text-gray-600 line-clamp-1">
          {product.name}
        </span>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-sm shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Left — Product Image */}
            <div className="md:w-80 flex-shrink-0">
              <div className="border border-gray-200 
              rounded-sm p-4 flex items-center 
              justify-center h-80">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="max-h-full max-w-full 
                  object-contain"
                />
              </div>

              {/* Thumbnail row (same image x3) */}
              <div className="flex gap-2 mt-3">
                {[1, 2, 3].map(i => (
                  <div key={i}
                    className="border-2 border-[#FF9900] 
                    rounded-sm p-1 cursor-pointer w-16 h-16 
                    flex items-center justify-center">
                    <img
                      src={product.image_url}
                      alt=""
                      className="max-h-full max-w-full 
                      object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Middle — Product Info */}
            <div className="flex-1">

              {/* Badge */}
              {product.badge && (
                <span className={`text-xs font-bold 
                px-2 py-0.5 rounded-sm mb-2 inline-block
                ${product.badge === 'Best Seller'
                  ? 'bg-[#FF9900] text-white'
                  : product.badge === 'Deal'
                  ? 'bg-red-600 text-white'
                  : 'bg-[#232F3E] text-white'
                }`}>
                  {product.badge}
                </span>
              )}

              {/* Name */}
              <h1 className="text-xl font-medium 
              text-gray-800 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-[#007185] text-sm 
                hover:text-red-600 cursor-pointer">
                  {product.reviews.toLocaleString()} ratings
                </span>
              </div>

              <hr className="border-gray-200 mb-3" />

              {/* Price */}
              <div className="mb-4">
                <span className="text-gray-500 text-sm">
                  M.R.P:{' '}
                  <span className="line-through">
                    ₹{Math.round(product.price * 1.2)
                      .toLocaleString('en-IN')}
                  </span>
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium 
                  text-[#B12704]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-green-600 
                  font-medium text-sm">
                    Save 17%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Free Delivery */}
              <div className="text-sm mb-3">
                <span className="font-bold">FREE Delivery</span>
                {' '}by Tomorrow. Order within{' '}
                <span className="text-green-600 font-medium">
                  12 hrs 30 mins
                </span>
              </div>

              {/* Stock */}
              <p className={`text-lg font-medium mb-4
              ${product.stock > 10
                ? 'text-green-600'
                : product.stock > 0
                ? 'text-orange-500'
                : 'text-red-600'
              }`}>
                {product.stock > 10
                  ? 'In Stock'
                  : product.stock > 0
                  ? `Only ${product.stock} left in stock`
                  : 'Out of Stock'}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 
              leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="border border-gray-200 
                rounded-sm overflow-hidden mb-4">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specifications.map((spec, i) => (
                        <tr key={i} className={i % 2 === 0
                          ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-2 font-medium 
                          text-gray-600 w-40">
                            {spec.label}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            {/* Right — Buy Box */}
            <div className="md:w-56 flex-shrink-0">
              <div className="border border-gray-200 
              rounded-sm p-4">

                {/* Price */}
                <p className="text-2xl font-medium mb-1">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>

                {/* Delivery */}
                <p className="text-sm text-[#007185] mb-1">
                  FREE Delivery by Tomorrow
                </p>

                {/* Stock */}
                <p className="text-green-600 font-medium 
                mb-3">
                  In Stock
                </p>

                {/* Quantity Selector */}
                <div className="mb-3">
                  <label className="text-sm font-medium 
                  text-gray-600 block mb-1">
                    Quantity:
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Number(e.target.value))}
                    className="border border-gray-300 
                    rounded-md px-3 py-1 text-sm 
                    bg-gray-50 w-full"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-2 rounded-full 
                  text-sm font-medium mb-2 transition
                  ${added
                    ? 'bg-green-500 text-white'
                    : 'bg-[#FF9900] hover:bg-[#F3A847] text-black'
                  }`}
                >
                  {added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#FF9900] 
                  hover:bg-[#F3A847] py-2 rounded-full 
                  text-sm font-medium"
                  style={{backgroundColor: '#FFA41C'}}
                >
                  Buy Now
                </button>

                {/* Secure Transaction */}
                <p className="text-xs text-gray-500 
                text-center mt-3">
                  🔒 Secure transaction
                </p>

                {/* Sold by */}
                <div className="text-xs mt-3 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ships from</span>
                    <span className="text-[#007185]">Amazon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sold by</span>
                    <span className="text-[#007185]">Amazon</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail