# ✨ Full Stack Realtime Chat App ✨

![Demo App](/frontend/public/screenshot-for-readme.png)

[Video Tutorial on Youtube](https://youtu.be/ntKkVrQqBYY)

Highlights:

- 🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- 🎃 Authentication && Authorization with JWT
- 👾 Real-time messaging with Socket.io
- 🚀 Online user status
- 👌 Global state management with Zustand
- 🐞 Error handling both on the server and on the client
- ⭐ At the end Deployment like a pro for FREE!
- ⏳ And much more!

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas)
- Cloudinary account

### 2. Setup Environment Variables

Create `backend/.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/chat-app
PORT=5001
JWT_SECRET=your_jwt_secret_here

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

### 3. Install Dependencies

```shell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Run Development Servers

**Option 1: Use Quick Start Script (Windows)**
```shell
# From root directory
start-dev.bat
```

**Option 2: Manual Start**
```shell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser!

### 5. Build & Start Production

```shell
npm run build
npm start
```

---

📚 **For detailed setup instructions, see [SETUP.md](./SETUP.md)**
