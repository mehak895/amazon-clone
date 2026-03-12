import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import { ordersAPI } from '../api/index'

function Checkout() {
  const { cartItems, cartTotal, clearCart, sessionId } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
  })

  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [orderError, setOrderError] = useState(null)

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    // Clear error when user types
    setErrors({ ...errors, [e.target.name]: '' })
  }

  // Validate form
  const validate = () => {
    const newErrors = {}
    if (!form.fullName.trim()) 
      newErrors.fullName = 'Enter your full name'
    if (!form.phone.trim() || form.phone.length !== 10) 
      newErrors.phone = 'Enter valid 10-digit phone number'
    if (!form.pincode.trim() || form.pincode.length !== 6) 
      newErrors.pincode = 'Enter valid 6-digit pincode'
    if (!form.address.trim()) 
      newErrors.address = 'Enter your address'
    if (!form.city.trim()) 
      newErrors.city = 'Enter your city'
    if (!form.state.trim()) 
      newErrors.state = 'Select your state'
    return newErrors
  }

  // Place order
  const handlePlaceOrder = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setPlacing(true)
    setOrderError(null)

    try {
      // Prepare cart items for backend
      const cartItemsForOrder = cartItems.map(item => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }))

      // Create order data
      const orderData = {
        full_name: form.fullName,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        total_amount: cartTotal,
        cart_items: cartItemsForOrder
      }

      // Send order to backend
      const response = await ordersAPI.create(orderData)
      
      // Clear cart and navigate to confirmation
      clearCart()
      navigate('/order-confirm', { 
        state: { 
          orderId: response.order.id,
          orderData: response
        } 
      })
    } catch (err) {
      console.error('Error placing order:', err)
      setOrderError('Failed to place order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  const indianStates = [
    'Andhra Pradesh', 'Delhi', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Punjab', 'Rajasthan', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'West Bengal'
  ]

  return (
    <div className="bg-[#EAEDED] min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left - Order Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6">
                {placing ? 'Placing Order...' : 'Delivery Address'}
              </h2>

              {orderError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm mb-6">
                  {orderError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.pincode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="110001"
                    maxLength={6}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street, Apartment 4B"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="New Delhi"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={placing || cartItems.length === 0}
                className={`w-full py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                  placing || cartItems.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#FF9900] hover:bg-[#F3A847] text-black'
                }`}
              >
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 pb-3 border-b last:border-b-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-contain flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">₹{parseFloat(item.price).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
