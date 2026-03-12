const express = require('express');
const db = require('../db/db');
const router = express.Router();

// GET /api/cart/:sessionId - Get cart items for a session
router.get('/:sessionId', async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const { sessionId } = req.params;
    
    const query = `
      SELECT ci.*, p.name, p.price, p.image_url
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.session_id = $1
      ORDER BY ci.created_at DESC
    `;
    
    const result = await client.query(query, [sessionId]);
    
    const items = result.rows.map(row => ({
      id: row.id,
      product_id: row.product_id,
      name: row.name,
      price: row.price,
      image_url: row.image_url,
      quantity: row.quantity
    }));
    
    // Calculate total
    const total = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    
    res.json({
      items,
      total
    });
    
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const { session_id, product_id, quantity } = req.body;
    
    if (!session_id || !product_id || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Insert cart item
    const query = `
      INSERT INTO cart_items (session_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const result = await client.query(query, [session_id, product_id, quantity]);
    const cartItem = result.rows[0];
    
    // Get product details
    const productQuery = 'SELECT name, price, image_url FROM products WHERE id = $1';
    const productResult = await client.query(productQuery, [product_id]);
    const product = productResult.rows[0];
    
    res.status(201).json({
      id: cartItem.id,
      product_id: cartItem.product_id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: cartItem.quantity
    });
    
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }
    
    const query = `
      UPDATE cart_items 
      SET quantity = $1
      WHERE id = $2
      RETURNING *
    `;
    
    const result = await client.query(query, [quantity, id]);
    const updatedItem = result.rows[0];
    
    // Get product details
    const productQuery = 'SELECT name, price, image_url FROM products WHERE id = $1';
    const productResult = await client.query(productQuery, [updatedItem.product_id]);
    const product = productResult.rows[0];
    
    res.json({
      id: updatedItem.id,
      product_id: updatedItem.product_id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: updatedItem.quantity
    });
    
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const { id } = req.params;
    
    const query = 'DELETE FROM cart_items WHERE id = $1';
    await client.query(query, [id]);
    
    res.json({ message: 'Item removed from cart' });
    
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

module.exports = router;
