import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headset";
import SearchIcon from "@mui/icons-material/Search";
import "./MainContent.css";

const MainContent = () => {
  const [headphonesDetected, setHeadphonesDetected] = useState(false);
  const [showSearching, setShowSearching] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();  // Navigation hook

  // Images for subject slideshow
  const images = {
    English: ["/images/english1.jpg", "/images/english2.jpg"],
    Math: ["/images/math1.jpg", "/images/math2.jpg"],
    Science: ["/images/science1.jpg", "/images/science2.jpg"],
    History: ["/images/history1.jpg", "/images/history2.jpg"],
    Geography: ["/images/geography1.jpg", "/images/geography2.jpg"],
  };

  useEffect(() => {
    const checkForHeadphones = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioOutputs = devices.filter(device => device.kind === "audiooutput");

        const headphones = audioOutputs.some(device =>
          device.label.toLowerCase().includes("hd audio 2nd output") ||
          device.label.toLowerCase().includes("usb") ||
          device.label.toLowerCase().includes("bluetooth") ||
          device.label.toLowerCase().includes("headphone")
        );

        const headphones1 = true;

        setHeadphonesDetected(headphones1);

        if (headphones1) {
          setTimeout(() => {
            setShowSearching(true);
            setTimeout(() => {
              setShowSubjects(true);
            }, 3000);
          }, 3000);
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    checkForHeadphones();
    navigator.mediaDevices.addEventListener("devicechange", checkForHeadphones);

    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", checkForHeadphones);
    };
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % images[selectedSubject.subject].length
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [selectedSubject]);

  const radioStations = [
    { subject: "English", frequency: "66.1 FM" },
    { subject: "Math", frequency: "69.2 FM" },
    { subject: "Science", frequency: "63.1 FM" },
    { subject: "History", frequency: "75.4 FM" },
    { subject: "Geography", frequency: "80.3 FM" },
  ];

  const handleStationClick = (station) => {
    setSelectedSubject(station);
  };

  return (
    <div className="main-content">
        <img
        src="/logoNew.png"
        alt="Logo"
        className="top-logo"
        />
      <div className="title-container">
        <h1 className="page-title">ConnectED</h1>
      </div>
  
      {!headphonesDetected ? (
        <div className="no-headphones">
          <HeadphonesIcon style={{ fontSize: 100, color: "red" }} />
          <h2>No headphones detected</h2>
          <p>Please plug in your headphones.</p>
        </div>
      ) : !showSearching ? (
        <div className="headphones-detected">
          <h2>🎧 Headphones detected!</h2>
          <p>You are all set to enjoy your audio experience.</p>
        </div>
      ) : !showSubjects ? (
        <div className="searching-container">
          <SearchIcon className="search-icon" />
          <h2>Searching for Radio...</h2>
        </div>
      ) : selectedSubject ? (
        <div className="learning-container">
          <h2>Now learning {selectedSubject.subject} {selectedSubject.frequency}</h2>
          <div className="audio-wave">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
          <p className="streaming-text">Streaming educational content...</p>
        </div>
      ) : (
        <div className="subject-list">
          <h2>Available Radio Stations</h2>
          <ul>
            {radioStations.map((station, index) => (
              <li key={index} className="subject-item" onClick={() => handleStationClick(station)}>
                <button className="station-button">
                  <span className="subject-name">{station.subject}</span>
                  <span className="subject-frequency">{station.frequency}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
  
      <div className="back-home-container">
        <button className="back-home-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
  
  
  
};

export default MainContent;
