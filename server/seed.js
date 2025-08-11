import mongoose from "mongoose"
import dotenv from "dotenv"
import Member from "./models/Member.js"
import Practice from "./models/Practice.js"

dotenv.config()

const sampleMembers = [
  {
    name: "Nick",
    instrument: "Drums",
    email: "nick@band.com"
  },
  {
    name: "Keelan",
    instrument: "Bass",
    email: "keelan@band.com"
  },
  {
    name: "Zombie",
    instrument: "Guitar",
    email: "zombie@band.com"
  },
  {
    name: "Logan",
    instrument: "Guitar",
    email: "logan@band.com"
  },
  {
    name: "Halle",
    instrument: "Vocals",
    email: "halle@band.com"
  },
  {
    name: "Tina Marie",
    instrument: "Vocals",
    email: "tina.marie@band.com"
  }
]

const samplePractices = [
  {
    title: "Band Practice",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    time: "19:00",
    location: "Garage",
    description: "Practice new songs"
  },
  {
    title: "Band Practice",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    time: "20:00",
    location: "Garage",
    description: "Full band rehearsal"
  },
  {
    title: "Band Practice",
    date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
    time: "18:30",
    location: "Garage",
    description: "Gig prep"
  }
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://zombie:bikePanel@threeohpractice.zvdzfvd.mongodb.net/band-practice-scheduler")
    console.log("Connected to MongoDB")

    // Clear existing data
    await Member.deleteMany({})
    await Practice.deleteMany({})
    console.log("Cleared existing data")

    // Insert sample members
    const createdMembers = await Member.insertMany(sampleMembers)
    console.log(`Created ${createdMembers.length} members`)

    // Create practices with member responses
    const practicesWithResponses = samplePractices.map(practice => ({
      ...practice,
      memberResponses: createdMembers.map(member => ({
        member: member._id,
        status: "pending"
      }))
    }))

    const createdPractices = await Practice.insertMany(practicesWithResponses)
    console.log(`Created ${createdPractices.length} practices`)

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
