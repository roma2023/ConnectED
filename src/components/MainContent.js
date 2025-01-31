import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headset";
import SearchIcon from "@mui/icons-material/Search";
import "./MainContent.css";

const WEBSOCKET_URL = "ws://localhost:8000/ws/";
const STREAM_URL = "http://localhost:8000/stream/";

const MainContent = () => {
  const [headphonesDetected, setHeadphonesDetected] = useState(false);
  const [showSearching, setShowSearching] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventReceived, setEventReceived] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const audioRef = useRef(new Audio());
  const wsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkForHeadphones = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHeadphonesDetected(true);
        setTimeout(() => {
          setShowSearching(true);
          setTimeout(() => {
            setShowSubjects(true);
          }, 3000);
        }, 3000);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };
    checkForHeadphones();
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const subjectChannels = {
    English: 1,
    Math: 2,
  };

  const subjectQuestions = {
    English: { question: "Which word is a noun?", options: ["Run", "Happy", "Dog"], answer: "Dog" },
    Math: { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
  };

  const radioStations = Object.keys(subjectQuestions).map((subject, index) => ({
    subject,
    frequency: `${60 + index}.1 FM`,
  }));

  const handleStationClick = async (station) => {
    setSelectedSubject(station);
    setLoading(true);
    setEventReceived(false);

    const channelId = subjectChannels[station.subject];
    if (!channelId) return;

    audioRef.current.pause();
  audioRef.current.src = ""; // Reset src before assigning a new one
  audioRef.current.load();

    audioRef.current.src = `${STREAM_URL}${channelId}`;
    audioRef.current.play().catch((error) => console.error("Audio play error:", error));

    wsRef.current = new WebSocket(`${WEBSOCKET_URL}${channelId}`);
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "timestamp_reached") {
        setEventReceived(true);
        setLoading(false);
      }
    };

    const { question, options, answer } = subjectQuestions[station.subject];
    setAnswers([...options].sort(() => Math.random() - 0.5));
    setCorrectAnswer(answer);
    setSelectedAnswer(null);
  };

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setTimeout(() => {
        if (answer !== correctAnswer) {
          setSelectedAnswer(correctAnswer);
        }
      }, 1000);
    }
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
          <h2>{selectedSubject.subject} {selectedSubject.frequency}</h2>
          <p className="streaming-text">Streaming educational content...</p>

          {loading && (
            <div className="loading-container">
              <p className="loading-text">Waiting for event...</p>
            </div>
          )}

          {eventReceived && (
            <div className="quiz-container">
              <p style={{ textAlign: 'center' }}>{subjectQuestions[selectedSubject.subject].question}</p>
              <ul className="quiz-options">
                {answers.map((answer, index) => (
                  <li
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    className={
                      selectedAnswer
                        ? answer === correctAnswer
                          ? "correct-answer"
                          : answer === selectedAnswer
                          ? "wrong-answer"
                          : ""
                        : ""
                    }
                  >
                    {answer}
                  </li>
                ))}
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
        <button className="back-home-button" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};

export default MainContent;
