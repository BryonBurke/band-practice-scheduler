import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import "./MemberManagement.css"

function MemberManagement() {
  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instrument: "",
    phone: ""
  })

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/api/members")
      setMembers(response.data)
    } catch (error) {
      console.error("Error fetching members:", error)
      toast.error("Failed to load members")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      instrument: "",
      phone: ""
    })
    setEditingMember(null)
    setShowAddForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingMember) {
        await axios.put(`/api/members/${editingMember._id}`, formData)
        toast.success("Member updated successfully!")
      } else {
        await axios.post("/api/members", formData)
        toast.success("Member added successfully!")
      }
      
      resetForm()
      fetchMembers()
    } catch (error) {
      console.error("Error saving member:", error)
      toast.error(editingMember ? "Failed to update member" : "Failed to add member")
    }
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      instrument: member.instrument,
      phone: member.phone || ""
    })
    setShowAddForm(true)
  }

  const handleDelete = async (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`/api/members/${memberId}`)
        toast.success("Member deleted successfully!")
        fetchMembers()
      } catch (error) {
        console.error("Error deleting member:", error)
        toast.error("Failed to delete member")
      }
    }
  }

  const toggleActive = async (member) => {
    try {
      await axios.put(`/api/members/${member._id}`, {
        isActive: !member.isActive
      })
      toast.success(`Member ${member.isActive ? "deactivated" : "activated"} successfully!`)
      fetchMembers()
    } catch (error) {
      console.error("Error updating member status:", error)
      toast.error("Failed to update member status")
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="member-management">
      <header className="header">
        <h1>Member Management</h1>
        <div className="header-actions">
          <button onClick={() => navigate("/")} className="btn btn-secondary">
            ← Back to Home
          </button>
          <button 
            onClick={() => setShowAddForm(true)} 
            className="btn btn-primary"
            disabled={showAddForm}
          >
            + Add Member
          </button>
        </div>
      </header>

      {showAddForm && (
        <section className="add-member">
          <h2>{editingMember ? "Edit Member" : "Add New Member"}</h2>
          <form onSubmit={handleSubmit} className="member-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Member's full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="member@email.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="instrument">Instrument *</label>
                <input
                  type="text"
                  id="instrument"
                  name="instrument"
                  value={formData.instrument}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Guitar, Drums, Vocals"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingMember ? "Update Member" : "Add Member"}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="current-members">
        <h2>Current Members ({members.length})</h2>
        
        {members.length === 0 ? (
          <p className="no-members">No members added yet. Add your first member!</p>
        ) : (
          <div className="members-grid">
            {members.map((member) => (
              <div key={member._id} className={`member-card ${!member.isActive ? "inactive" : ""}`}>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p><strong>Instrument:</strong> {member.instrument}</p>
                  <p><strong>Email:</strong> {member.email}</p>
                  {member.phone && <p><strong>Phone:</strong> {member.phone}</p>}
                  <p><strong>Status:</strong> 
                    <span className={`status-badge ${member.isActive ? "status-active" : "status-inactive"}`}>
                      {member.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
                
                <div className="member-actions">
                  <button 
                    onClick={() => handleEdit(member)} 
                    className="btn btn-secondary btn-small"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => toggleActive(member)} 
                    className={`btn btn-small ${member.isActive ? "btn-warning" : "btn-success"}`}
                  >
                    {member.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button 
                    onClick={() => handleDelete(member._id)} 
                    className="btn btn-danger btn-small"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default MemberManagement
