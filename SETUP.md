# 🚀 Local Development Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (running locally or MongoDB Atlas account)
- **Cloudinary Account** (for image uploads)

## Setup Instructions

### 1. Clone and Navigate to Project

```bash
cd fullstack-chat-app
```

### 2. Backend Setup

#### Install Backend Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/chat-app
PORT=5001
JWT_SECRET=your_super_secret_jwt_key_here

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

**Important Configuration Notes:**

- **MONGODB_URI**: 
  - For local MongoDB: `mongodb://localhost:27017/chat-app`
  - For MongoDB Atlas: Get connection string from your Atlas dashboard
  
- **JWT_SECRET**: Generate a strong secret key (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
  
- **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com) and get your credentials from the dashboard

### 3. Frontend Setup

#### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

#### Proxy Configuration (Already Configured)

The `vite.config.js` is configured to proxy API requests from port 5173 to backend port 5001:

```javascript
server: {
  port: 5173,
  proxy: {
    "/api": {
      target: "http://localhost:5001",
      changeOrigin: true,
    },
  },
}
```

### 4. Running the Application

#### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5001`

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

#### Option 2: Production Build

```bash
# From root directory
npm run build
npm start
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
- Ensure MongoDB is running locally: `mongod`
- Or use MongoDB Atlas connection string in `.env`

### Issue: "CORS errors"

**Solution:**
- Verify backend is running on port 5001
- Check `backend/src/index.js` has correct CORS configuration
- Ensure Vite proxy is configured correctly

### Issue: "Image upload not working"

**Solution:**
- Verify Cloudinary credentials in `.env`
- Check if all three Cloudinary variables are set correctly

### Issue: "Port already in use"

**Solution:**
```bash
# On Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Or change the PORT in backend/.env
```

### Issue: "Socket.io connection failed"

**Solution:**
- Ensure backend server is running
- Check that frontend is connecting to correct URL
- Verify CORS settings allow socket connections

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/messages/users` - Get all users
- `GET /api/messages/:userId` - Get messages with specific user
- `POST /api/messages/send/:userId` - Send message to user

## Tech Stack

- **Frontend:** React + Vite + TailwindCSS + DaisyUI
- **Backend:** Node.js + Express + Socket.io
- **Database:** MongoDB + Mongoose
- **State Management:** Zustand
- **Authentication:** JWT + Cookies
- **Real-time:** Socket.io

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development
2. **Database Seeding**: Check `backend/src/seeds/` for seed data if needed
3. **Environment**: Always use `NODE_ENV=development` for local development
4. **Debugging**: Check browser console and terminal logs for errors

## Project Structure

```
fullstack-chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── lib/              # Database & Socket config
│   │   ├── middleware/       # Auth middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   └── index.js          # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── store/            # Zustand stores
│   │   ├── lib/              # Utilities & axios config
│   │   └── main.jsx          # Entry point
│   └── package.json
└── package.json              # Root package.json for build scripts
```

## Need Help?

If you encounter any issues:
1. Check that all dependencies are installed
2. Verify environment variables are set correctly
3. Ensure MongoDB and both servers are running
4. Check browser console and terminal logs for specific errors
