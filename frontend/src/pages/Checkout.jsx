import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import Navbar from '../components/Navbar'
import { placeOrder } from '../api/index'

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    full_name: '', phone: '', address: '', city: '', state: '', pincode: ''
  })
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [orderError, setOrderError] = useState('')

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const e = {}
    if (!form.full_name.trim()) e.full_name = 'Enter your full name'
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone'
    if (!form.address.trim()) e.address = 'Enter your address'
    if (!form.city.trim()) e.city = 'Enter your city'
    if (!form.state.trim()) e.state = 'Select your state'
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter valid 6-digit pincode'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setOrderError('')
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setPlacing(true)
    try {
      const response = await placeOrder({
        full_name: form.full_name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        total_amount: total,
        cart_items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      })
      clearCart()
      navigate(`/order-confirm/${response.data.order_id}`)
    } catch (err) {
      setOrderError(err.response?.data?.error || 'Failed to place order')
    } finally {
      setPlacing(false)
    }
  }

  const indianStates = ['Andhra Pradesh','Delhi','Goa','Gujarat','Haryana',
    'Karnataka','Kerala','Madhya Pradesh','Maharashtra','Punjab',
    'Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal']

  return (
    <div className="bg-[#EAEDED] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6">Delivery Address</h2>
              {orderError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded mb-4">
                  {orderError}
                </div>
              )}
              <div className="space-y-4">
                {[
                  { name: 'full_name', label: 'Full Name', placeholder: 'John Doe' },
                  { name: 'phone', label: 'Mobile Number', placeholder: '9876543210' },
                  { name: 'address', label: 'Address', placeholder: '123 Main Street' },
                  { name: 'city', label: 'City', placeholder: 'New Delhi' },
                  { name: 'pincode', label: 'PIN Code', placeholder: '110001' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select State</option>
                    {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={placing || cartItems.length === 0}
                className={`w-full mt-6 py-3 rounded-full text-sm font-medium ${placing || cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#FF9900] hover:bg-[#F3A847]'}`}
              >
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 object-contain" />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Delivery:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
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