const express = require('express');
const db = require('../db/db');
const router = express.Router();

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const {
      full_name,
      phone,
      address,
      city,
      state,
      pincode,
      total_amount,
      cart_items
    } = req.body;

    if (!full_name || !phone || !address || !city || !state || !pincode || !cart_items || cart_items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await client.query('BEGIN');

    // Create order
    const orderQuery = `
      INSERT INTO orders (full_name, phone, address, city, state, pincode, total_amount)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const orderResult = await client.query(orderQuery, [
      full_name, phone, address, city, state, pincode, total_amount
    ]);
    const order = orderResult.rows[0];

    // Create order items and update product stock
    for (const item of cart_items) {
      // Insert order item
      const orderItemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
      `;
      await client.query(orderItemQuery, [
        order.id, item.product_id, item.quantity, item.price
      ]);

      // Update product stock
      const updateStockQuery = `
        UPDATE products 
        SET stock = stock - $1 
        WHERE id = $2 AND stock >= $1
      `;
      const stockResult = await client.query(updateStockQuery, [item.quantity, item.product_id]);
      
      if (stockResult.rowCount === 0) {
        throw new Error(`Insufficient stock for product ${item.product_id}`);
      }
    }

    // Clear cart items
    for (const item of cart_items) {
      await client.query('DELETE FROM cart_items WHERE id = $1', [item.id]);
    }

    await client.query('COMMIT');

    // Fetch complete order with items
    const completeOrderQuery = `
      SELECT o.*, oi.*, p.name as product_name
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1
    `;
    const result = await client.query(completeOrderQuery, [order.id]);

    const orderWithItems = {
      id: result.rows[0].id,
      full_name: result.rows[0].full_name,
      phone: result.rows[0].phone,
      address: result.rows[0].address,
      city: result.rows[0].city,
      state: result.rows[0].state,
      pincode: result.rows[0].pincode,
      total_amount: result.rows[0].total_amount,
      status: result.rows[0].status,
      created_at: result.rows[0].created_at,
      items: result.rows.map(row => ({
        id: row.id,
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        price: row.price,
        image_url: row.image_url
      }))
    };

    res.json(orderWithItems);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// GET /api/orders/:id - Get specific order
router.get('/:id', async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    const orderId = req.params.id;
    
    const query = `
      SELECT o.*, oi.*, p.name as product_name, p.image_url
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1
    `;
    
    const result = await client.query(query, [orderId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = {
      id: result.rows[0].id,
      full_name: result.rows[0].full_name,
      phone: result.rows[0].phone,
      address: result.rows[0].address,
      city: result.rows[0].city,
      state: result.rows[0].state,
      pincode: result.rows[0].pincode,
      total_amount: result.rows[0].total_amount,
      status: result.rows[0].status,
      created_at: result.rows[0].created_at,
      items: result.rows.map(row => ({
        id: row.id,
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        price: row.price,
        image_url: row.image_url
      }))
    };

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

module.exports = router;
