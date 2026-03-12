import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems } = useCart()
  const navigate = useNavigate()

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <div className="bg-[#EAEDED] min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium mb-6">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-sm shadow-sm p-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#FF9900] px-6 py-2 rounded-full font-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-sm shadow-sm p-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 mb-4 border-b last:border-b-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-contain flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-gray-600">₹{parseFloat(item.price).toLocaleString('en-IN')}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-sm shadow-sm p-6">
                <h3 className="font-medium mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items):</span>
                    <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-[#FF9900] hover:bg-[#F3A847] text-black py-2 rounded-full font-medium"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full border border-gray-300 py-2 rounded-full font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
EOF