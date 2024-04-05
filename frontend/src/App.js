import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Auth from './pages/Auth/Auth'
import Dashboard from './pages/Dashboard/Dashboard'


function App () {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>

        </Routes>
      </div>
    </Router>
  )
}

export default App
