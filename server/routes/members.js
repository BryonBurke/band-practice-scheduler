import express from "express"
import Member from "../models/Member.js"

const router = express.Router()

// Get all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ name: 1 })
    res.json(members)
  } catch (error) {
    console.error("Error fetching members:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new member
router.post("/", async (req, res) => {
  try {
    const member = new Member(req.body)
    await member.save()
    res.status(201).json(member)
  } catch (error) {
    console.error("Error creating member:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update member
router.put("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!member) {
      return res.status(404).json({ message: "Member not found" })
    }
    res.json(member)
  } catch (error) {
    console.error("Error updating member:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete member
router.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id)
    if (!member) {
      return res.status(404).json({ message: "Member not found" })
    }
    res.json({ message: "Member deleted successfully" })
  } catch (error) {
    console.error("Error deleting member:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
