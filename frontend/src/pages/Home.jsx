import { useState, useEffect } from 'react'
import { productsAPI } from '../api/index'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

const categories = ['All', 'Electronics', 'Fashion', 
'Home & Kitchen', 'Books', 'Sports', 'Beauty']

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productsAPI.getAll(searchTerm, selectedCategory)
      setProducts(data)
    } catch (err) {
      setError('Failed to load products. Please try again.')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch products when category or search changes
  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, searchTerm])

  return (
    <div className="bg-[#EAEDED] min-h-screen">
      
      {/* Navbar */}
      <Navbar onSearch={setSearchTerm} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-[#131921] 
      to-[#EAEDED] h-8" />

      {/* Category Filter */}
      <div className="bg-white px-4 py-3 flex gap-2 
      overflow-x-auto sticky top-[88px] z-40 shadow-sm">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm 
            font-medium whitespace-nowrap border transition
            ${selectedCategory === cat
              ? 'bg-[#131921] text-white border-[#131921]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#131921]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {products.length} results
          {selectedCategory !== 'All' && 
            ` in "${selectedCategory}"`}
          {searchTerm && ` for "${searchTerm}"`}
        </p>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9900]"></div>
            <p className="text-gray-500 mt-4">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-[#FF9900] px-6 py-2 rounded-full font-medium"
            >
              Try Again
            </button>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 
          lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">
              No products found
            </p>
            <p className="text-gray-400 mt-2">
              Try a different search or category
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default Home
