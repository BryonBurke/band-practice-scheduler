# 🎵 Band Practice Scheduler

A modern, full-stack web application for managing band practice schedules, member responses, and band member information. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **Practice Management**: Schedule and manage band practices with date, time, location, and notes
- **Member Management**: Add, edit, and delete band members with instrument and contact information
- **Response Tracking**: Track member responses (Yes/No/Pending) for each practice
- **Beautiful UI**: Modern, responsive design with gradient backgrounds and glassmorphism effects
- **Real-time Updates**: Instant feedback with toast notifications
- **Mobile Responsive**: Works seamlessly on all device sizes

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Date-fns** - Date manipulation utilities

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd band-practice-scheduler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/band-practice-scheduler
   PORT=5000
   ```

4. **Database Setup**
   - Start MongoDB service
   - Or use MongoDB Atlas and update the connection string

5. **Seed the Database** (Optional)
   ```bash
   npm run seed
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev:server
   ```
   The server will run on http://localhost:5000

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run server
   ```

## 📱 Usage

### Homepage
- View upcoming practices (next 3)
- Quick access to schedule new practices
- Manage band members

### Schedule Practice
- Set date and time
- Specify location and notes
- Pre-populate member responses
- Track attendance status

### Member Management
- Add new band members
- Edit existing member information
- Delete members
- View all members in a grid layout

## 🗄️ Database Schema

### Member Model
```javascript
{
  name: String (required),
  instrument: String (required),
  email: String (required, unique),
  createdAt: Date
}
```

### Practice Model
```javascript
{
  dateTime: Date (required),
  location: String,
  notes: String,
  memberResponses: [{
    member: ObjectId (ref: Member),
    status: String (pending/yes/no),
    note: String
  }],
  status: String (scheduled/confirmed/cancelled),
  createdAt: Date
}
```

## 🔧 API Endpoints

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Practices
- `GET /api/practices` - Get all practices
- `GET /api/practices/:id` - Get practice by ID
- `POST /api/practices` - Create new practice
- `PUT /api/practices/:id` - Update practice
- `DELETE /api/practices/:id` - Delete practice
- `PATCH /api/practices/:id/responses/:memberId` - Update member response

## 🎨 Customization

### Styling
- CSS variables for easy color scheme changes
- Responsive design with mobile-first approach
- Glassmorphism effects and modern gradients

### Adding Features
- Easy to extend with new components
- Modular architecture for scalability
- Well-structured API endpoints

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify network access for Atlas

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes on the port

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by real band practice scheduling needs
- Designed for musicians and band managers

---

**Happy Scheduling! 🎸🥁🎤**
