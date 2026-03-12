const API_BASE_URL = '/api';

// Products API
export const productsAPI = {
  // Get all products with optional search and category filters
  getAll: async (search = '', category = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'All') params.append('category', category);
    
    const response = await fetch(`${API_BASE_URL}/products?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  }
};

// Cart API
export const cartAPI = {
  // Get cart items for a session
  get: async (sessionId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${sessionId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return response.json();
  },

  // Add item to cart
  add: async (sessionId, productId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        product_id: productId,
        quantity: quantity
      })
    });
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
    return response.json();
  },

  // Update cart item quantity
  update: async (cartItemId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity })
    });
    if (!response.ok) {
      throw new Error('Failed to update cart');
    }
    return response.json();
  },

  // Remove item from cart
  remove: async (cartItemId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }
    return response.json();
  }
};

// Orders API
export const ordersAPI = {
  // Create new order
  create: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    return response.json();
  },

  // Get order by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return response.json();
  }
};

// Utility function to generate session ID
export const generateSessionId = () => {
  return 'session_' + Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
