import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getProductById } from '../api/index'
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

        const res = await getProductById(id)
        setProduct(res.data)

      } catch (err) {
        setError('Product not found')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

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
            className="mt-4 bg-[#FF9900] px-6 py-2 rounded-full font-medium"
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
        <span
          key={i}
          className={i < fullStars ? "text-[#FF9900] text-xl" : "text-gray-300 text-xl"}
        >
          ★
        </span>
      )
    }

    return stars
  }

  return (
    <div className="bg-[#EAEDED] min-h-screen">
      <Navbar />

      <div className="bg-white px-6 py-2 text-xs text-[#007185]">
        <span
          onClick={() => navigate('/')}
          className="cursor-pointer hover:underline"
        >
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-sm shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-8">

            <div className="md:w-80 flex-shrink-0">
              <div className="border border-gray-200 rounded-sm p-4 flex items-center justify-center h-80">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            <div className="flex-1">

              <h1 className="text-xl font-medium text-gray-800 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-[#007185] text-sm">
                  {product.reviews?.toLocaleString()} ratings
                </span>
              </div>

              <hr className="border-gray-200 mb-3" />

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium text-[#B12704]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {product.description}
              </p>

            </div>

            <div className="md:w-56 flex-shrink-0">
              <div className="border border-gray-200 rounded-sm p-4">

                <p className="text-2xl font-medium mb-1">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>

                <p className="text-green-600 font-medium mb-3">
                  In Stock
                </p>

                <div className="mb-3">
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Quantity:
                  </label>

                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-gray-50 w-full"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-2 rounded-full text-sm font-medium mb-2 transition ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-[#FF9900] hover:bg-[#F3A847] text-black'
                  }`}
                >
                  {added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#FFA41C] hover:bg-[#F3A847] py-2 rounded-full text-sm font-medium"
                >
                  Buy Now
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail