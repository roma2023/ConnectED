import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
        <img
        src="/logoNew.png"
        alt="Logo"
        className="top-left-logo"
        />

      <h1 className="home-title">ConnectED</h1>
      
      <h2 className="subtitle">Jump back in...</h2>

      <div className="jump-back-section">
        <div className="progress-card">
          <h3>English</h3>
          <progress value="80" max="100"></progress>
          <span>80%</span>
        </div>
        <div className="progress-card">
          <h3>Math</h3>
          <progress value="50" max="100"></progress>
          <span>50%</span>
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={() => navigate("/live-classes")}>Live Classes</button>
        <button onClick={() => alert("Saved content coming soon!")}>Saved Content</button>
      </div>
    </div>
  );
};

export default HomePage;
