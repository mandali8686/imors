
import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import Dashboard from "./pages/Dashboard/Dashboard"
import Profile from "./pages/Profile/Profile"
import ImörsHistory from "./pages/Profile/ImörsHistory"
import MyFavorites from "./pages/Profile/MyFavorites"

function App () {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/ImörsHistory" element={<ImörsHistory />}></Route>
          <Route path="/MyFavorites" element={<MyFavorites />}></Route>
        </Routes>

      </div>
    </Router>
  )
}

export default App
