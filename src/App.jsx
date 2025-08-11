import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import HomePage from "./components/HomePage"
import AddPractice from "./components/AddPractice"
import MemberManagement from "./components/MemberManagement"
import DeletePractice from "./components/DeletePractice"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-practice" element={<AddPractice />} />
          <Route path="/members" element={<MemberManagement />} />
          <Route path="/delete-practice" element={<DeletePractice />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
