# Gaming Gear Store

A full-stack ecommerce application built with React, Node.js, Express, and MongoDB.

## Tech Stack
- **Frontend**: React + TailwindCSS + Vite + Zustand
- **Backend**: Node.js + Express.js + MongoDB
- **Authentication**: JWT + bcrypt

## Features
- Product listing with search and filters
- Product details with ratings and reviews
- Shopping cart
- Wishlist
- User authentication
- Admin dashboard
- Dark/light mode toggle
- Skeleton loading states
- Toast notifications

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally or connection string

### Installation
```bash
cd server && npm install
cd ../client && npm install
```

### Environment Variables

**server/.env**
```
MONGODB_URI=mongodb://localhost:27017/gaming-gear-store
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
PORT=5000
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
```

### Seed Database

```bash
cd server
node seed.js
```

### Run Development

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   └── ...
├── server/          # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
```

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/products` - Get all products (with optional ?keyword= and ?category=)
- `GET /api/products/:id` - Get single product
- `GET /api/products/top` - Get top rated products
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `GET /api/wishlist` - Get user wishlist
- `POST /api/orders` - Create order