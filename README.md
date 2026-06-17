# INFERNO E-Commerce

Full-stack e-commerce application with Vite + React + TailwindCSS (frontend) and Node.js + Express + MongoDB (backend).

## Features

- User authentication (JWT)
- Product listing with search and filtering
- Shopping cart (localStorage for guests, MongoDB for authenticated users)
- Admin panel for product/category management
- Mobile-responsive design

## Project Structure

```
ecommerce-fullstack-design/
├── backend/          # Express + MongoDB API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── server.js
└── frontend/         # Vite + React + Tailwind
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   └── pages/
    └── package.json
```

## Setup

### Backend

```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=mongodb://localhost:27017/ecommerce
# JWT_SECRET=your_secret
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)
- `VITE_API_URL` - Backend API URL