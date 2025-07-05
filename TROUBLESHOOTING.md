# Chat App Troubleshooting Guide

## Quick Start

1. **Run the startup script:**
   ```bash
   start-servers.bat
   ```

2. **Or manually start servers:**
   ```bash
   # Terminal 1 - Backend
   cd Backend
   npm run dev

   # Terminal 2 - Frontend  
   cd vite-project
   npm run dev
   ```

## Common Issues & Solutions

### 1. Port Already in Use Error

**Error:** `EADDRINUSE: address already in use :::5001`

**Solution:**
```bash
# Kill processes using port 5001
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F
```

### 2. MongoDB Connection Error

**Error:** `MongoDB connection failed`

**Solutions:**
- Install MongoDB locally: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (free tier):
  1. Go to https://www.mongodb.com/atlas
  2. Create free account
  3. Create cluster
  4. Get connection string
  5. Create `.env` file in Backend folder:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     ```

### 3. Signup/Login Not Working

**Check these:**
1. Backend server is running on port 5001
2. Frontend is running on port 5173 or 5174
3. MongoDB is connected
4. Check browser console for errors
5. Check backend terminal for errors

### 4. CORS Errors

**Error:** `Access to fetch at 'http://localhost:5001/api/auth/signup' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution:** Backend CORS is already configured for both ports 5173 and 5174.

### 5. Cookie Issues

**Error:** `Unauthorized, please login`

**Solutions:**
- Clear browser cookies
- Check if cookies are being set properly
- Ensure `withCredentials: true` is set in axios

## Testing the Connection

1. **Test Backend:**
   ```
   http://localhost:5001/api/test
   ```
   Should return: `{"message": "Backend server is running!"}`

2. **Test Frontend:**
   ```
   http://localhost:5173
   ```
   Should show the login page

3. **Test Database:**
   - Check backend console for "MongoDB connected" message
   - If not connected, check MongoDB installation

## Debug Steps

1. **Check Backend Logs:**
   - Look for "Server is running on port 5001"
   - Look for "MongoDB connected: localhost"

2. **Check Frontend Logs:**
   - Open browser developer tools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

3. **Test API Endpoints:**
   ```bash
   # Test signup
   curl -X POST http://localhost:5001/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"fullname":"Test User","email":"test@example.com","password":"123456"}'
   ```

## Environment Variables

Create `.env` file in Backend folder:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## Still Having Issues?

1. **Restart everything:**
   - Close all terminals
   - Kill all Node.js processes
   - Restart your computer
   - Run `start-servers.bat`

2. **Check Node.js version:**
   ```bash
   node --version
   ```
   Should be 16 or higher

3. **Reinstall dependencies:**
   ```bash
   cd Backend && npm install
   cd ../vite-project && npm install
   ```

4. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ``` 