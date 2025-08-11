import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { format } from "date-fns"
import "./HomePage.css"

function HomePage() {
  const [practices, setPractices] = useState([])
  const [loading, setLoading] = useState(true)
  const [cleaning, setCleaning] = useState(false)

  useEffect(() => {
    fetchPractices()
  }, [])

  const fetchPractices = async () => {
    try {
      const response = await axios.get("/api/practices")
      console.log("Fetched practices:", response.data)
      setPractices(response.data)
    } catch (error) {
      console.error("Error fetching practices:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "status-confirmed"
      case "maybe":
        return "status-maybe"
      case "declined":
        return "status-declined"
      default:
        return "status-pending"
    }
  }

  const handleCleanup = async () => {
    if (window.confirm("This will permanently delete all practices that have already passed. Continue?")) {
      setCleaning(true)
      try {
        const response = await axios.post("/api/cleanup")
        alert(`Cleanup completed! Deleted ${response.data.deletedCount} expired practice(s).`)
        // Refresh the practices list
        fetchPractices()
      } catch (error) {
        console.error("Cleanup error:", error)
        alert("Cleanup failed. Please try again.")
      } finally {
        setCleaning(false)
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="homepage">
      <header className="header">
        <h1>3-oh Schedule</h1>
        
      </header>

      <div className="action-buttons">
        <Link to="/add-practice" className="btn btn-primary">
          + Add New Practice
        </Link>
        <Link to="/members" className="btn btn-secondary">
          Manage Members
        </Link>
        <Link to="/delete-practice" className="btn btn-danger">
          🗑️ Delete Practices
        </Link>
        <button 
          onClick={handleCleanup} 
          className="btn btn-warning"
          disabled={cleaning}
        >
          {cleaning ? "🧹 Cleaning..." : "🧹 Clean Expired"}
        </button>
      </div>

      <section className="upcoming-practices">
        <h2>Upcoming Practices</h2>
        <div className="cleanup-info">
          <p>💡 Expired practices are automatically cleaned up daily at 2:00 AM</p>
        </div>
        {practices.length === 0 ? (
          <p className="no-practices">No practices scheduled yet. Add your first practice!</p>
        ) : (
          <div className="practices-grid">
            {practices.map((practice) => (
              <div key={practice._id} className="practice-card">
                <h3>{practice.title}</h3>
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
                  {practice.memberResponses.map((response) => {
                    console.log("Response item:", response)
                    return (
                      <div key={response._id} className="response-item">
                        <span className="member-name">
                          {response.member ? response.member.name : 'Unknown Member'}
                        </span>
                        <span className={`status-badge ${getStatusColor(response.status)}`}>
                          {response.status}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
