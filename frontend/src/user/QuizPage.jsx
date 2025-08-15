import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

const SOCKET_SERVER_URL = 'http://localhost:5000'; // Change if backend runs elsewhere

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const timerRef = useRef();
  const socketRef = useRef(null);
  const quizContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`http://localhost:5000/api/quizzes/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setQuiz(data);
      setTimeLeft((data.duration || 5) * 60);
    };
    fetchQuiz();
  }, [id]);

  // SOCKET.IO: Connect and listen for timer/quiz events
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    // Listen for timer updates from server
    socketRef.current.on('timer', (time) => {
      setTimeLeft(time);
    });

    // Listen for quiz start event
    socketRef.current.on('startQuiz', () => {
      setQuizStarted(true);
      handleFullscreen();
    });

    // Listen for quiz end event
    socketRef.current.on('endQuiz', () => {
      setQuizStarted(false);
      exitFullscreen();
      handleSubmit(); // Optionally auto-submit
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
    // eslint-disable-next-line
  }, []);

  // Fullscreen logic
  const handleFullscreen = () => {
    const elem = quizContainerRef.current;
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem && elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem && elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };


  if (!quiz) return <div className="min-h-screen flex items-center justify-center">Loading quiz...</div>;
  const questions = quiz.questions || [];

  const handleOption = (idx, opt) => {
    setAnswers({ ...answers, [idx]: opt });
  };
  const handleFlag = (idx) => {
    setFlags({ ...flags, [idx]: !flags[idx] });
  };
  const handleNav = (idx) => setCurrent(idx);
  const handleSubmit = () => {
    // TODO: Submit answers to server and get attemptId
    const attemptId = "QUIZ-" + Math.floor(Math.random() * 1000000);
    navigate("/thanks", { state: { attemptId } });
  };



  // Show waiting screen until quizStarted is true
  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Waiting for quiz to start...
      </div>
    );
  }

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <div ref={quizContainerRef} className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded shadow p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Time Left: {mins}:{secs}</span>
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={timeLeft === 0}
          >
            Submit Quiz
          </button>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Question {current + 1} of {questions.length}</span>
          <button
            onClick={() => handleFlag(current)}
            className={`ml-4 px-3 py-1 rounded ${flags[current] ? 'bg-yellow-400' : 'bg-gray-200'}`}
          >
            {flags[current] ? "Flagged" : "Flag"}
          </button>
        </div>
        <div className="mb-4">
          <p className="mb-2 font-medium">{questions[current]?.questionText}</p>
          <div className="space-y-2">
            {questions[current]?.options?.map((opt, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={`q${current}`}
                  value={opt}
                  checked={answers[current] === opt}
                  onChange={() => handleOption(current, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => handleNav(current - 1)}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handleNav(current + 1)}
            disabled={current === questions.length - 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-full max-w-2xl flex flex-wrap gap-2 justify-center">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleNav(idx)}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
              ${current === idx ? 'border-blue-500' : 'border-gray-300'}
              ${flags[idx] ? 'bg-yellow-200' : ''}
              ${answers[idx] ? 'font-bold' : ''}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
