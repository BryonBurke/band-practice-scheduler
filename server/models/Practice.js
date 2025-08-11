import mongoose from "mongoose"

const practiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  memberResponses: [{
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true
    },
    status: {
      type: String,
      enum: ["confirmed", "maybe", "declined", "pending"],
      default: "pending"
    },
    responseDate: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Practice", practiceSchema)
