import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import memberRoutes from "./routes/members.js"
import practiceRoutes from "./routes/practices.js"
import Practice from "./models/Practice.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

// Routes
app.use("/api/members", memberRoutes)
app.use("/api/practices", practiceRoutes)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://zombie:bikePanel@threeohpractice.zvdzfvd.mongodb.net/band-practice-scheduler?retryWrites=true&w=majority&maxPoolSize=10&serverSelectionTimeoutMS=30000", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0,
  bufferCommands: false
})
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })

// Function to clean up expired practices
const cleanupExpiredPractices = async () => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set to start of day
    
    const result = await Practice.deleteMany({
      date: { $lt: today }
    })
    
    if (result.deletedCount > 0) {
      console.log(`Cleaned up ${result.deletedCount} expired practice(s)`)
    }
  } catch (error) {
    console.error("Error cleaning up expired practices:", error)
  }
}

// Schedule cleanup to run daily at 2:00 AM
const scheduleCleanup = () => {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(2, 0, 0, 0)
  
  const timeUntilCleanup = tomorrow.getTime() - now.getTime()
  
  setTimeout(() => {
    cleanupExpiredPractices()
    // Schedule next cleanup for 24 hours later
    setInterval(cleanupExpiredPractices, 24 * 60 * 60 * 1000)
  }, timeUntilCleanup)
  
  console.log(`Next cleanup scheduled for: ${tomorrow.toLocaleString()}`)
}

// Start the cleanup scheduler
scheduleCleanup()

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Band Practice Scheduler API" })
})

// Manual cleanup endpoint (for admin use)
app.post("/api/cleanup", async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const result = await Practice.deleteMany({
      date: { $lt: today }
    })
    
    res.json({ 
      message: `Cleanup completed successfully`,
      deletedCount: result.deletedCount,
      cleanedAt: new Date()
    })
  } catch (error) {
    console.error("Manual cleanup error:", error)
    res.status(500).json({ message: "Cleanup failed", error: error.message })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Server accessible at:`)
  console.log(`  - http://localhost:${PORT}`)
  console.log(`  - http://127.0.0.1:${PORT}`)
  console.log(`  - http://0.0.0.0:${PORT}`)
})
