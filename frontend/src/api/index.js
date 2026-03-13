import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 
  'http://localhost:5001/api'
})

export const getProducts = (category, search) =>
  API.get('/products', { params: { category, search } })

export const getProductById = (id) =>
  API.get(`/products/${id}`)

export const getCart = (sessionId) =>
  API.get(`/cart/${sessionId}`)

export const addToCart = (data) =>
  API.post('/cart', data)

export const updateCartItem = (id, quantity) =>
  API.put(`/cart/${id}`, { quantity })

export const deleteCartItem = (id) =>
  API.delete(`/cart/${id}`)

export const placeOrder = (data) =>
  API.post('/orders', data)

export const getOrder = (id) =>
  API.get(`/orders/${id}`)
