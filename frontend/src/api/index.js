import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api"
})

// Products
export const getProducts = (category, search) => {
  const params = {}

  if (category && category !== "All") {
    params.category = category
  }

  if (search && search.trim()) {
    params.search = search.trim()
  }

  return API.get("/products", { params })
}

export const getProductById = (id) =>
  API.get(`/products/${id}`)

// Cart
export const getCart = (sessionId) =>
  API.get(`/cart/${sessionId}`)

export const addToCart = (data) =>
  API.post("/cart", data)

export const updateCartItem = (id, quantity) =>
  API.put(`/cart/${id}`, { quantity })

export const deleteCartItem = (id) =>
  API.delete(`/cart/${id}`)

// Orders
export const placeOrder = (data) =>
  API.post("/orders", data)

export const getOrder = (id) =>
  API.get(`/orders/${id}`)

// Auth
export const authAPI = {
  login: async (email, password) => {
    const res = await API.post("/auth/login", { email, password })
    return res.data
  },
  signup: async (name, email, password) => {
    const res = await API.post("/auth/signup", { name, email, password })
    return res.data
  }
}

// Wishlist (requires JWT token)
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
})

export const getWishlist = (token) =>
  API.get("/wishlist", authHeader(token))

export const addToWishlist = (productId, token) =>
  API.post("/wishlist", { product_id: productId }, authHeader(token))

export const removeFromWishlist = (productId, token) =>
  API.delete(`/wishlist/${productId}`, authHeader(token))