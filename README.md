# Dravix

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white&labelColor=333)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white&labelColor=333)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white&labelColor=333)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat&logo=node.js&logoColor=white&labelColor=333)
![Express](https://img.shields.io/badge/Express-5-000?style=flat&logo=express&logoColor=white&labelColor=333)
![MongoDB](https://img.shields.io/badge/MongoDB-9-47A248?style=flat&logo=mongodb&logoColor=white&labelColor=333)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white&labelColor=333)
![License](https://img.shields.io/badge/License-MIT-D4AC0D?style=flat&labelColor=333&color=D4AC0D)

Modern Full-Stack E-Commerce Platform  
Built with React + Vite + TailwindCSS on the frontend, Node.js + Express + MongoDB on the backend.  
Clean UI, smooth shopping experience, and a fully-featured admin panel.

---

## Features

| Feature | Description |
|---|---|
| **Authentication** | Firebase Auth with email/password and Google login |
| **Shopping Cart** | localStorage for guests, synced to DB for logged-in users |
| **Product Management** | Browse, search, filter, and view product details |
| **Admin Panel** | Add, edit, and delete products with image upload |
| **Responsive Design** | Works seamlessly on desktop, tablet, and mobile |
| **Fast & Modern** | Vite-powered frontend, Express API, MongoDB Atlas |

---

## Project Structure

```
dravix-ecommerce/
├── backend/                  # Express + MongoDB API
│   ├── config/               # Database & env configuration
│   ├── controllers/          # Route handlers
│   ├── middleware/           # Auth, error, rate-limit middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── seed/                 # Database seeding scripts
│   └── server.js             # Entry point
│
├── frontend/                 # Vite + React + TailwindCSS
│   ├── src/
│   │   ├── api/              # Axios API client
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React context providers
│   │   ├── pages/            # Page components
│   │   └── App.jsx           # Root component
│   └── package.json
│
├── render.yaml               # Render deployment config
└── package.json              # Root scripts
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB -- local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier works great)
- A terminal you're comfortable with

### 1. Clone & Install

```bash
git clone https://github.com/your-username/dravix-ecommerce.git
cd dravix-ecommerce

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Go back to root
cd ..
```

### 2. Configure Environment Variables

**Backend** -- create `backend/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.xxxxx.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend** -- create `frontend/.env` (if needed for API proxy):

```env
VITE_API_URL=http://localhost:5000
```

### 3. Start the Dev Server

From the root directory:

```bash
npm run dev
```

This runs both the backend (port 5000) and frontend (port 5173) concurrently.  
Open **http://localhost:5173** in your browser.

### 4. Seed the Database (optional)

Populate your database with sample products:

```bash
npm run seed
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start both backend & frontend in development mode |
| `npm run dev:backend` | Start backend only (with nodemon) |
| `npm run dev:frontend` | Start frontend only (Vite dev server) |
| `npm run build` | Build frontend for production |
| `npm start` | Start backend in production mode |
| `npm run seed` | Seed the database with sample data |

---

## Deployment (One-Click with Render)

This project includes a `render.yaml` for easy deployment on Render's free tier.

1. Push the repo to GitHub
2. Go to [dashboard.render.com](https://dashboard.render.com)
3. Click **New + -> Web Service** and connect your repository
4. Set the **Build Command** to:
   ```
   cd frontend && npm install && npm run build && cd ../backend && npm install
   ```
5. Set the **Start Command** to:
   ```
   cd backend && node server.js
   ```
6. Add your environment variables (`MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, `NODE_ENV`)
7. Choose the **Free** plan and deploy

> Your app will be live in about 3-5 minutes.

---

## Tech Stack

**Frontend**
- React 19
- Vite 8
- TailwindCSS 4
- React Router 7
- Axios
- React Toastify

**Backend**
- Node.js / Express 5
- MongoDB + Mongoose 9
- Firebase Admin SDK (authentication)
- bcryptjs
- Multer (file uploads)
- Helmet + CORS + Rate Limiting

---

## License

This project is for demonstration and portfolio purposes.

---

Built with React by the Dravix team.