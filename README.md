# Chat App

A real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io.

## Features

- Real-time messaging
- User authentication (signup/login)
- Online user status
- Profile management
- Responsive design
- Dark/Light theme

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **MongoDB** (running locally or MongoDB Atlas connection)
- **npm** or **yarn**

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd Chat-App
```

### 2. Install Backend Dependencies
```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../vite-project
npm install
```

### 4. Environment Setup

Create a `.env` file in the `Backend` directory with the following variables:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development

# Optional: Cloudinary configuration (for profile picture uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Note:** If you don't have MongoDB installed locally, you can use MongoDB Atlas:
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and replace `MONGODB_URI` with it

### 5. Start MongoDB

If using local MongoDB:
```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

### 6. Run the Application

#### Start the Backend Server
```bash
cd Backend
npm run dev
```

The backend server will start on `http://localhost:5001`

#### Start the Frontend Development Server
```bash
cd vite-project
npm run dev
```

The frontend will start on `http://localhost:5173`

### 7. Access the Application

Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
Chat-App/
├── Backend/                 # Backend server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── lib/            # Utility libraries
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Main server file
│   └── package.json
└── vite-project/           # Frontend React app
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── store/          # Zustand stores
    │   └── lib/            # Utility functions
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status

### Messages
- `GET /api/messages/:chatId` - Get messages for a chat
- `POST /api/messages` - Send a message

### Chats
- `GET /api/chat` - Get user chats
- `POST /api/chat` - Create a new chat

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Zustand** - State management
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **Lucide React** - Icons

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check your connection string in `.env`
   - If using MongoDB Atlas, ensure your IP is whitelisted

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill processes using the port: `npx kill-port 5001 5173`

3. **CORS Errors**
   - Ensure the frontend URL matches the CORS configuration in `server.js`
   - Check that both servers are running

4. **Socket Connection Issues**
   - Verify both frontend and backend are running
   - Check browser console for connection errors

### Getting Help

If you encounter any issues:
1. Check the console logs in both terminal and browser
2. Ensure all dependencies are installed
3. Verify environment variables are set correctly
4. Make sure MongoDB is running and accessible

## License

This project is open source and available under the [MIT License](LICENSE). 