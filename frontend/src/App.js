import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Gallery from './components/Gallery';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/homepage" element={<Homepage />} />
          
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
