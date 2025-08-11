import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { format } from "date-fns"
import "./DeletePractice.css"

function DeletePractice() {
  const [practices, setPractices] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchPractices()
  }, [])

  const fetchPractices = async () => {
    try {
      const response = await axios.get("/api/practices")
      setPractices(response.data)
    } catch (error) {
      console.error("Error fetching practices:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (practiceId) => {
    if (window.confirm("Are you sure you want to delete this practice? This action cannot be undone.")) {
      setDeleting(practiceId)
      try {
        await axios.delete(`/api/practices/${practiceId}`)
        // Remove the deleted practice from the list
        setPractices(practices.filter(practice => practice._id !== practiceId))
        alert("Practice deleted successfully!")
      } catch (error) {
        console.error("Error deleting practice:", error)
        alert("Failed to delete practice. Please try again.")
      } finally {
        setDeleting(null)
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading practices...</div>
  }

  return (
    <div className="delete-practice-page">
      <header className="header">
        <h1>🗑️ Delete Practices</h1>
        <p>Remove practices from your schedule</p>
      </header>

      <div className="action-buttons">
        <Link to="/" className="btn btn-secondary">
          ← Back to Home
        </Link>
      </div>

      <section className="practices-list">
        <h2>All Practices</h2>
        {practices.length === 0 ? (
          <div className="no-practices">
            <p>No practices found.</p>
            <Link to="/add-practice" className="btn btn-primary">
              + Add Your First Practice
            </Link>
          </div>
        ) : (
          <div className="practices-grid">
            {practices.map((practice) => (
              <div key={practice._id} className="practice-card">
                <div className="practice-header">
                  <h3>{practice.title}</h3>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(practice._id)}
                    disabled={deleting === practice._id}
                  >
                    {deleting === practice._id ? "Deleting..." : "🗑️ Delete"}
                  </button>
                </div>
                
                <div className="practice-details">
                  <p><strong>Date:</strong> {format(new Date(practice.date), "PPP")}</p>
                  <p><strong>Time:</strong> {practice.time}</p>
                  <p><strong>Location:</strong> {practice.location}</p>
                  {practice.description && (
                    <p><strong>Description:</strong> {practice.description}</p>
                  )}
                </div>

                <div className="member-responses">
                  <h4>Member Responses:</h4>
                  {practice.memberResponses.map((response) => (
                    <div key={response._id} className="response-item">
                      <span className="member-name">
                        {response.member ? response.member.name : 'Unknown Member'}
                      </span>
                      <span className={`status-badge status-${response.status}`}>
                        {response.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default DeletePractice
