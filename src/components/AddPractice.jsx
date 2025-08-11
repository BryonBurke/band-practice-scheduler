import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import "./AddPractice.css"

function AddPractice() {
  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: ""
  })
  const [memberResponses, setMemberResponses] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/api/members")
      setMembers(response.data)
      
      // Initialize member responses
      const initialResponses = {}
      response.data.forEach(member => {
        initialResponses[member._id] = "pending"
      })
      setMemberResponses(initialResponses)
    } catch (error) {
      console.error("Error fetching members:", error)
      toast.error("Failed to load members")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleMemberResponseChange = (memberId, status) => {
    setMemberResponses(prev => ({
      ...prev,
      [memberId]: status
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const practiceData = {
        ...formData,
        memberResponses: Object.entries(memberResponses).map(([memberId, status]) => ({
          member: memberId,
          status
        }))
      }

      await axios.post("/api/practices", practiceData)
      toast.success("Practice created successfully!")
      navigate("/")
    } catch (error) {
      console.error("Error creating practice:", error)
      toast.error("Failed to create practice")
    } finally {
      setLoading(false)
    }
  }

  if (members.length === 0) {
    return <div className="loading">Loading members...</div>
  }

  return (
    <div className="add-practice">
      <header className="header">
        <h1>Add New Practice</h1>
        <button onClick={() => navigate("/")} className="btn btn-secondary">
          ← Back to Home
        </button>
      </header>

      <form onSubmit={handleSubmit} className="practice-form">
        <div className="form-group">
          <label htmlFor="title">Practice Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="e.g., Weekly Rehearsal"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="e.g., Studio A, 123 Music St"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="What will you be working on?"
            rows="3"
          />
        </div>

        <section className="member-responses">
          <h2>Member Responses</h2>
          <p>Set initial response status for each member:</p>
          
          <div className="responses-grid">
            {members.map((member) => (
              <div key={member._id} className="member-response">
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p>{member.instrument}</p>
                </div>
                <select
                  value={memberResponses[member._id] || "pending"}
                  onChange={(e) => handleMemberResponseChange(member._id, e.target.value)}
                  className="response-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="maybe">Maybe</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            ))}
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Practice"}
          </button>
          <button type="button" onClick={() => navigate("/")} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPractice
