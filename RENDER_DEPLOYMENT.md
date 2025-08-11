# 🚀 Render Deployment Guide

This guide will walk you through deploying your Band Practice Scheduler app to Render.

## 📋 Prerequisites

- [Render account](https://render.com) (free tier available)
- MongoDB Atlas database (already configured)
- Git repository (already set up)

## 🔧 Step-by-Step Deployment

### 1. Push to GitHub

First, create a repository on GitHub and push your code:

```bash
# Add GitHub as remote origin (replace with your repo URL)
git remote add origin https://github.com/yourusername/band-practice-scheduler.git

# Push to GitHub
git push -u origin master
```

### 2. Deploy Backend API

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name:** `band-scheduler-api`
   - **Environment:** `Node`
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm run server`
   - **Plan:** Free

5. **Set Environment Variables:**
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `mongodb+srv://zombie:bikePanel@threeohpractice.zvdzfvd.mongodb.net/band-practice-scheduler`
   - `PORT` = `10000` (Render will set this automatically)

6. **Click "Create Web Service"**

### 3. Deploy Frontend

1. **In Render Dashboard, click "New +" → "Static Site"**
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name:** `band-scheduler-frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Plan:** Free

4. **Set Environment Variables:**
   - `VITE_API_URL` = `https://your-backend-name.onrender.com` (use your actual backend URL)

5. **Click "Create Static Site"**

## 🌐 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://zombie:bikePanel@threeohpractice.zvdzfvd.mongodb.net/band-practice-scheduler
PORT=10000
```

### Frontend
```env
VITE_API_URL=https://your-backend-name.onrender.com
```

## 🔄 Auto-Deploy

Both services are configured to automatically deploy when you push to the `master` branch.

## 📱 Testing Your Deployment

1. **Backend API:** Visit `https://your-backend-name.onrender.com/`
   - Should show: `{"message":"Band Practice Scheduler API"}`

2. **Frontend:** Visit `https://your-frontend-name.onrender.com/`
   - Should load your React app

3. **Test API endpoints:**
   - `https://your-backend-name.onrender.com/api/members`
   - `https://your-backend-name.onrender.com/api/practices`

## 🚨 Common Issues & Solutions

### Issue: Frontend can't connect to backend
**Solution:** Check that `VITE_API_URL` is set correctly in frontend environment variables

### Issue: Backend fails to start
**Solution:** Check MongoDB connection string and ensure database is accessible

### Issue: Build fails
**Solution:** Check build commands and ensure all dependencies are in package.json

### Issue: CORS errors
**Solution:** Backend is already configured to allow all origins in production

## 💰 Cost

- **Free Tier:** Both services included
- **Paid Plans:** Start at $7/month for more resources

## 🔧 Custom Domain (Optional)

1. **In Render Dashboard, go to your service**
2. **Click "Settings" → "Custom Domains"**
3. **Add your domain and configure DNS**

## 📊 Monitoring

- **Logs:** Available in Render Dashboard
- **Health Checks:** Automatic monitoring
- **Uptime:** 99.9% guaranteed on paid plans

## 🚀 Next Steps

After successful deployment:
1. Test all features
2. Set up monitoring
3. Configure custom domain (optional)
4. Set up CI/CD pipeline

## 📞 Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [GitHub Issues](https://github.com/yourusername/band-practice-scheduler/issues)

---

**Happy Deploying! 🎉**
