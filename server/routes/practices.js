import express from "express"
import Practice from "../models/Practice.js"

const router = express.Router()

// Get all practices
router.get("/", async (req, res) => {
  try {
    const practices = await Practice.find()
      .populate("memberResponses.member", "name instrument email")
      .sort({ date: 1 })
    res.json(practices)
  } catch (error) {
    console.error("Error fetching practices:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get practice by ID
router.get("/:id", async (req, res) => {
  try {
    const practice = await Practice.findById(req.params.id)
      .populate("memberResponses.member", "name instrument email")
    if (!practice) {
      return res.status(404).json({ message: "Practice not found" })
    }
    res.json(practice)
  } catch (error) {
    console.error("Error fetching practice:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new practice
router.post("/", async (req, res) => {
  try {
    const practice = new Practice(req.body)
    await practice.save()
    
    const populatedPractice = await Practice.findById(practice._id)
      .populate("memberResponses.member", "name instrument email")
    
    res.status(201).json(populatedPractice)
  } catch (error) {
    console.error("Error creating practice:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update practice
router.put("/:id", async (req, res) => {
  try {
    const practice = await Practice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("memberResponses.member", "name instrument email")
    
    if (!practice) {
      return res.status(404).json({ message: "Practice not found" })
    }
    res.json(practice)
  } catch (error) {
    console.error("Error updating practice:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete practice
router.delete("/:id", async (req, res) => {
  try {
    const practice = await Practice.findByIdAndDelete(req.params.id)
    if (!practice) {
      return res.status(404).json({ message: "Practice not found" })
    }
    res.json({ message: "Practice deleted successfully" })
  } catch (error) {
    console.error("Error deleting practice:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update member response for a practice
router.patch("/:id/responses/:memberId", async (req, res) => {
  try {
    const { status, note } = req.body
    const practice = await Practice.findById(req.params.id)
    
    if (!practice) {
      return res.status(404).json({ message: "Practice not found" })
    }
    
    const memberResponse = practice.memberResponses.find(
      response => response.member.toString() === req.params.memberId
    )
    
    if (!memberResponse) {
      return res.status(404).json({ message: "Member response not found" })
    }
    
    memberResponse.status = status
    if (note !== undefined) memberResponse.note = note
    
    await practice.save()
    
    const populatedPractice = await Practice.findById(practice._id)
      .populate("memberResponses.member", "name instrument email")
    
    res.json(populatedPractice)
  } catch (error) {
    console.error("Error updating member response:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
