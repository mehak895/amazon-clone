const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
  const { full_name, phone, address, city, state, pincode, cart_items, total_amount } = req.body;
  if (!full_name || !phone || !address || !city || !state || !pincode) {
    return res.status(400).json({ error: 'All delivery fields are required.' });
  }
  if (!cart_items || cart_items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' });
  }
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    const orderResult = await client.query(
      `INSERT INTO orders (full_name, phone, address, city, state, pincode, total_amount, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending') RETURNING *`,
      [full_name, phone, address, city, state, pincode, total_amount]
    );
    const order = orderResult.rows[0];
    for (const item of cart_items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, item.price]
      );
    }
    await client.query('COMMIT');
    res.status(201).json({ order_id: order.id, total_amount: order.total_amount, status: order.status });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Failed to place order.' });
  } finally {
    client.release();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await db.pool.query(
      `SELECT o.*,
        json_agg(json_build_object(
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'price', oi.price,
          'name', p.name,
          'image_url', p.image_url
        )) AS items
       FROM orders o
       JOIN order_items oi ON oi.order_id = o.id
       JOIN products p ON p.id = oi.product_id
       WHERE o.id = $1
       GROUP BY o.id`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Order not found.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order.' });
  }
});

module.exports = router;
