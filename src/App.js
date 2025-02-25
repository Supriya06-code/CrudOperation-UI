import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Navbar from "./Components/Navbar";


function App() {
  return (
    <Router>
      <div className="App">
      
        <Navbar /> {/* Navigation Bar */}
        <div style={{ padding: "20px" }}>
          
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} /> 
          </Routes>
          
        </div>
       
      </div>

    </Router>
    
  );
}

export default App;
