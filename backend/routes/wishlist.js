const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

router.use(authenticate);

// GET /api/wishlist - current user's wishlist
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.pool.query(
      `SELECT w.id,
              w.product_id,
              w.created_at,
              p.name,
              p.price,
              p.image_url,
              p.category,
              p.rating,
              p.reviews,
              p.badge
       FROM wishlists w
       JOIN products p ON p.id = w.product_id
       WHERE w.user_id = $1
       ORDER BY w.created_at DESC`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

// POST /api/wishlist - add product to wishlist
router.post("/", async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ error: "product_id is required" });
  }

  try {
    const { rows } = await db.pool.query(
      `INSERT INTO wishlists (user_id, product_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, product_id) DO NOTHING
       RETURNING *`,
      [req.user.id, product_id]
    );

    // If row already existed, fetch it
    const wishlistItem =
      rows[0] ||
      (
        await db.pool.query(
          "SELECT * FROM wishlists WHERE user_id = $1 AND product_id = $2",
          [req.user.id, product_id]
        )
      ).rows[0];

    res.status(201).json(wishlistItem);
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
});

// DELETE /api/wishlist/:productId - remove product from wishlist
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    await db.pool.query(
      "DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2",
      [req.user.id, productId]
    );

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
});

module.exports = router;

