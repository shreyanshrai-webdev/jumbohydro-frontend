# Jumbohydro India — Full Stack MERN Ecommerce

Electronics & Underwater Equipment Store with multi-currency support.

---

## Tech Stack

| Layer    | Technology                 | Deployment           |
| -------- | -------------------------- | -------------------- |
| Frontend | React + Vite + Bootstrap 5 | Vercel               |
| Backend  | Node.js + Express + JWT    | Railway              |
| Database | MongoDB Atlas              | Atlas M0 (Free)      |
| Payment  | Cashfree                   | Sandbox → Production |

---

## Features

- User Registration & Login (JWT)
- 6 Products with INR / USD / EUR / GBP pricing
- Product Search & Category Filter
- Cart (saved to MongoDB)
- Checkout with Cashfree Payment
- Order Tracking with live status stepper
- Customer Reviews & Ratings
- Admin Panel — Dashboard, Products, Orders, Users

---

## Project Structure

```
jumbohydro/
├── backend/       → Node + Express API
└── frontend/      → React + Vite app
```

---

## Local Development Setup

### Step 1 — Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2 — Setup Backend .env

```bash
cp backend/.env.example backend/.env
```

Fill in:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/jumbohydro
JWT_SECRET=any_random_secret_string
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret
CASHFREE_ENV=TEST
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

### Step 3 — Setup Frontend .env

```bash
cp frontend/.env.example frontend/.env
```

Fill in:

```
VITE_API_URL=http://localhost:5000
VITE_CASHFREE_ENV=TEST
```

### Step 4 — Run Both Servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

### Step 5 — Seed Products

Visit: `http://localhost:5000/api/products/seed`

This seeds all 6 Jumbohydro products with prices in INR, USD, EUR, GBP.

---

## Deployment Guide

### 1. MongoDB Atlas (Free M0)

1. Go to https://cloud.mongodb.com
2. Create free M0 cluster
3. Create database user
4. Get connection string → paste in backend .env as MONGO_URI
5. Whitelist IP: 0.0.0.0/0 (allow all — needed for Railway)

---

### 2. Backend → Railway

1. Go to https://railway.app
2. Sign in with GitHub
3. Click **New Project → Deploy from GitHub repo**
4. Select your repo → set **Root Directory** to `backend`
5. Railway auto-detects Node.js via nixpacks
6. Go to **Variables** tab → add all .env variables:
   ```
   MONGO_URI
   JWT_SECRET
   CASHFREE_APP_ID
   CASHFREE_SECRET_KEY
   CASHFREE_ENV=TEST
   FRONTEND_URL=https://your-vercel-app.vercel.app
   BACKEND_URL=https://your-railway-app.up.railway.app
   PORT=5000
   ```
7. Railway gives you a URL like: `https://jumbohydro-backend.up.railway.app`
8. Visit `https://your-railway-url/api/products/seed` to seed products ✅

**Railway Advantages over Render:**

- No cold starts on free $5 credits
- Faster deploys
- Better real-time logs

---

### 3. Frontend → Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **New Project → Import GitHub repo**
4. Set **Root Directory** to `frontend`
5. Vercel auto-detects Vite
6. Add environment variables:
   ```
   VITE_API_URL=https://your-railway-app.up.railway.app
   VITE_CASHFREE_ENV=TEST
   ```
7. Click **Deploy**
8. Vercel gives you URL: `https://jumbohydro.vercel.app` ✅

---

### 4. Cashfree Setup

1. Go to https://merchant.cashfree.com
2. Create account → get App ID and Secret Key
3. Use **TEST** credentials for development
4. When client approves → switch to **PROD** credentials
5. Add your Vercel URL to Cashfree's allowed domains

**Cashfree supported currencies:** INR, USD, EUR, GBP ✅

---

## Creating First Admin User

1. Register normally via `/register`
2. Open MongoDB Atlas → Collections → Users
3. Find your user → change `role` from `"user"` to `"admin"`
4. Login again → Admin Panel appears at `/admin`

---

## After Client Approves → Upgrade Plan

```
Railway Free    → Hobby $5/month   (no cold starts, always on)
Vercel Free     → Keep free        (frontend handles it well)
Atlas M0 Free   → M2 $9/month     (if DB grows beyond 512MB)

Total           → $5 - $14/month  ≈ ₹415 - ₹1,165/month
```

---

## API Endpoints Reference

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/products              ?search= &category= &sort=
GET    /api/products/:id
POST   /api/products/seed         (one-time setup)
POST   /api/products              (admin)
PUT    /api/products/:id          (admin)
DELETE /api/products/:id          (admin)

GET    /api/cart
POST   /api/cart
PUT    /api/cart/:productId
DELETE /api/cart/:productId

POST   /api/orders
GET    /api/orders/my
GET    /api/orders/:id
GET    /api/orders                (admin)
PUT    /api/orders/:id            (admin)

POST   /api/reviews/:productId
GET    /api/reviews/:productId
DELETE /api/reviews/:id

POST   /api/payment/create
POST   /api/payment/verify
POST   /api/payment/webhook

GET    /api/admin/dashboard
GET    /api/admin/users
PUT    /api/admin/users/:id/role
DELETE /api/admin/users/:id
```

---

## Currencies Supported

| Currency | Symbol | Country        |
| -------- | ------ | -------------- |
| INR      | ₹      | India          |
| USD      | $      | United States  |
| EUR      | €      | Europe         |
| GBP      | £      | United Kingdom |

Currency is switchable from the Navbar. Prices stored per-currency in MongoDB. Orders recorded in the customer's chosen currency.

---

© 2026 Jumbohydro India. All Rights Reserved.
