import React, { useState, useEffect, useRef } from "react";
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
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const audioRef = useRef(new Audio()); // Reference for background audio

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
    if (loading) {
      setProgress(0);
      let interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(interval);
            setLoading(false);
            setShowQuiz(true);
            return 100;
          }
          return oldProgress + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, []);

  const subjectQuestions = {
    English: { question: "Which word is a noun?", options: ["Run", "Happy", "Dog"], answer: "Dog" },
    Math: { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    Science: { question: "Which planet is closest to the Sun?", options: ["Earth", "Mercury", "Mars"], answer: "Mercury" },
    History: { question: "Who was the first President of the USA?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"], answer: "George Washington" },
    Geography: { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris"], answer: "Paris" },
  };

  const radioStations = Object.keys(subjectQuestions).map((subject, index) => ({
    subject,
    frequency: `${60 + index}.1 FM`,
  }));

  const handleStationClick = async (station) => {
    setSelectedSubject(station);
    setShowQuiz(false);
    setLoading(true);

    try {
      console.log("Fetching audio stream...");

      // Test audio stream (Replace with real API later)
      const audioStreamURL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

      // Play the audio in the background without UI
      audioRef.current.src = audioStreamURL;
      audioRef.current.play().catch(error => console.error("Audio play error:", error));

    } catch (error) {
      console.error("Error fetching audio:", error);
    }

    const { question, options, answer } = subjectQuestions[station.subject];
    const shuffledAnswers = [...options].sort(() => Math.random() - 0.5);

    setAnswers(shuffledAnswers);
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

        setTimeout(() => {
          setShowQuiz(false);
        }, 1500);
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
          <div className="audio-wave">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
          <p className="streaming-text">Streaming educational content...</p>

          {loading && (
            <div className="loading-container">
              <p className="loading-text">Loading content...</p>
              <div className="loading-bar">
                <div className="loading-progress" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {showQuiz && (
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
        <button className="back-home-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default MainContent;
