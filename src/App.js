import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app">
      
        
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />

          {/* Live Classes (headphones detection page) */}
          <Route
            path="/live-classes"
            element={
              <>


                {/* Main Content */}
                
                <MainContent />

              
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
