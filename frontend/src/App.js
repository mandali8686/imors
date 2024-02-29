import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'
import Gallery from './components/Gallery'
import Signup1 from './components/Signup1'
import Signup2 from './components/Signup2'
import LoginPage from './components/LoginPage'
import Profile1 from './components/profile1'
import Profile2 from './components/profile2'

function App () {
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/signup1" element={<Signup1 />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile1" element={<Profile1 />} />
          <Route path="/profile2" element={<Profile2 />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
