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
  const [showQuiz, setShowQuiz] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkForHeadphones = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioOutputs = devices.filter(device => device.kind === "audiooutput");

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
      // Show quiz at a random interval between 10 to 20 seconds
      const quizTimeout = setTimeout(() => {
        setShowQuiz(true);
      }, Math.floor(Math.random() * (20000 - 10000) + 10000));

      return () => {
        clearTimeout(quizTimeout);
      };
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
    setShowQuiz(false); // Reset quiz when switching subjects
  };

  return (
    <div className="main-content">
      <img src="/logoNew.png" alt="Logo" className="top-logo" />
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

          {showQuiz && (
            <div className="quiz-container">
              <p style={{ textAlign: 'center' }}>Question 1: What is the correct answer?</p>
              <ul className="quiz-options">
                <li>A) Option 1</li>
                <li>B) Option 2</li>
                <li>C) Option 3</li>
              </ul>
            </div>
          )}
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
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default MainContent;
