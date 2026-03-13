require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const ordersRouter = require("./routes/orders");
const authRouter = require("./routes/auth");
const wishlistRouter = require("./routes/wishlist");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

module.exports = app;