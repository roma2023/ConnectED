import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="mobile-container">
          <Routes>
            {/* Home Page Route */}
            <Route path="/" element={<HomePage />} />

            {/* Live Classes (headphones detection page) */}
            <Route path="/live-classes" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
