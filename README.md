# Amazon Clone – Full-Stack E-Commerce Application

A full-stack **Amazon-style e-commerce web application** that allows users to browse products, manage a shopping cart, and place orders.
The project demonstrates the integration of a modern **React frontend** with a **Node.js + Express backend** and a **PostgreSQL database**.

This application was built to showcase full-stack development skills including **REST API design, frontend state management, and database integration**.

---

## Features

• Browse a catalog of products
• Add items to the shopping cart
• Remove items from the cart
• View cart contents dynamically
• Place orders through backend APIs
• Full integration between frontend and backend
• Responsive user interface

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* PostgreSQL

### Tools

* Git
* GitHub

---

## Project Architecture

```id="yq8d6f"
amazon-clone
│
├── index.js                # Express server
├── routes                  # Backend API routes
│
└── frontend
    ├── src
    │   ├── components      # Reusable UI components
    │   ├── pages           # Application pages
    │   ├── context         # React context (cart management)
    │   └── api             # API service layer
    │
    ├── vite.config.js
    └── package.json
```

---

## Getting Started

### 1. Clone the repository

```id="0b6x3q"
git clone https://github.com/mehak895/amazon-clone.git
```

### 2. Navigate to the project folder

```id="md1f6u"
cd amazon-clone
```

---

## Backend Setup

Install dependencies:

```id="7y3j3l"
npm install
```

Start the backend server:

```id="b2yqz7"
node index.js
```

Backend runs on:

```id="x3q7yy"
http://localhost:5001
```

---

## Frontend Setup

Navigate to frontend directory:

```id="b1dzgo"
cd frontend
```

Install dependencies:

```id="h0m2zj"
npm install
```

Start the development server:

```id="t7v0t0"
npm run dev
```

Frontend runs on:

```id="1y8xbo"
http://localhost:5173
```

---

## API Endpoints

```id="xq1j7n"
GET  /api/products   → Fetch product catalog
GET  /api/cart       → Retrieve cart data
POST /api/orders     → Create a new order
```

---

## Author

**Mehak Mittal**

GitHub:
https://github.com/mehak895
