# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v18+) installed
- MongoDB running locally or MongoDB Atlas account

## 1. Environment Setup
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/band-practice-scheduler
PORT=5000
```

## 2. Install Dependencies
```bash
npm install
```

## 3. Seed Database (Optional)
```bash
npm run seed
```

## 4. Start Development
```bash
# Start both frontend and backend
npm run dev:full

# Or start them separately:
# Terminal 1: npm run dev:server
# Terminal 2: npm run dev
```

## 5. Access the App
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🎯 What's Ready
✅ Complete frontend with React components
✅ Backend API with Express and MongoDB
✅ Member management system
✅ Practice scheduling system
✅ Beautiful responsive UI
✅ Database models and routes
✅ Sample data seeding

## 🔧 Troubleshooting
- **MongoDB Error**: Make sure MongoDB is running
- **Port Issues**: Change PORT in .env file
- **Build Errors**: Clear node_modules and reinstall

## 🎵 Ready to Rock!
Your band practice scheduler is now ready to use!
