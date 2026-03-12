import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function OrderConfirm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(() => setError('Could not load order'))
  }, [id])

  if (error) return (
    <div className="bg-[#EAEDED] min-h-screen">
      <Navbar />
      <div className="text-center py-20">
        <p className="text-2xl text-red-500 mb-4">{error}</p>
        <button onClick={() => navigate('/')} className="bg-[#FF9900] px-6 py-2 rounded-full font-medium">Go Shopping</button>
      </div>
    </div>
  )

  if (!order) return (
    <div className="bg-[#EAEDED] min-h-screen">
      <Navbar />
      <div className="text-center py-20"><p className="text-2xl text-gray-500">Loading order...</p></div>
    </div>
  )

  const items = order.items || []

  return (
    <div className="bg-[#EAEDED] min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-sm shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-medium text-gray-800 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-500">Thank you for shopping with Amazon</p>
          </div>
          <div className="bg-[#F0F2F2] rounded-sm p-4 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-1">Your order ID</p>
            <p className="text-xl font-bold text-[#007185]">#{order.id}</p>
          </div>
          <div className="border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="font-medium mb-3">📦 Delivery Information</h3>
            <p className="text-sm font-medium">{order.full_name}</p>
            <p className="text-sm text-gray-600">{order.address}</p>
            <p className="text-sm text-gray-600">{order.city}, {order.state} - {order.pincode}</p>
            <p className="text-sm text-gray-600">📞 {order.phone}</p>
          </div>
          <div className="border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="font-medium mb-3">🛒 Order Items ({items.length})</h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 pb-3 border-b last:border-0">
                  <img src={item.image_url} alt={item.name} className="w-12 h-12 object-contain" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{parseFloat(item.price).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-sm font-medium">₹{(parseFloat(item.price) * item.quantity).toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-gray-200 rounded-sm p-4 mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span>Payment:</span><span>Cash on Delivery</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Delivery:</span><span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</span>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="w-full bg-[#FF9900] hover:bg-[#F3A847] py-3 rounded-full font-medium">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirm