# HisabMitra

HisabMitra is a personal finance and expense-tracking app with tools for managing expenses and shared financial records. It includes a React frontend and an Express/MongoDB backend.

**Live demo:** [https://hisab-mitra.vercel.app](https://hisab-mitra.vercel.app)

## Features

- Create an account and log in
- Add and edit expenses
- Create expense clusters and manage their records
- View a dashboard with expense visualizations
- Protected routes for account and expense features

## Tech Stack

**Frontend:** React, Vite, React Router, Tailwind CSS, Axios, Recharts  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT

## Project Structure

```text
HisabMitra/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── utils/
└── frontend/
    └── src/
        └── components/
```

## Prerequisites

- Node.js and npm
- A MongoDB database

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/RishikaRajput25/HisabMitra.git
cd HisabMitra
```

### 2. Configure and run the backend

The backend loads environment variables from `backend/env`. Create that file with:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

Install dependencies and start the backend:

```bash
cd backend
npm install
npm start
```

The server uses port `3000` by default. MongoDB database name: `hisabmitra`.

### 3. Configure and run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## API Route Groups

| Resource | Base route |
|---|---|
| Users | `/api/v1/users` |
| Expenses | `/api/v1/expenses` |
| Clusters | `/api/v1/clusters` |
| Cluster records | `/api/v1/clusters/:clusterId/records` |

## Frontend Commands

Run these inside the `frontend` directory:

```bash
npm run dev      # Start the development server
npm run build    # Build for production
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Deployment

The frontend is configured for Vercel. When deploying, configure the backend environment variables and set `CORS_ORIGIN` to the deployed frontend's URL. Ensure the frontend API requests point to the deployed backend.

## License

No license file is currently included in this repository.
