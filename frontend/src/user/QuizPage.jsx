import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Dummy questions for UI demo
const questions = [
  { id: 1, text: "What is 2 + 2?", options: ["2", "3", "4", "5"] },
  { id: 2, text: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Rome"] },
  { id: 3, text: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"] },
];

const QUIZ_DURATION = 5 * 60; // 5 minutes in seconds (should come from server)

const QuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const timerRef = useRef();

  const navigate = useNavigate();
  // Timer effect (should be server authoritative in real app)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Autosave effect (simulate per question)
  useEffect(() => {
    if (answers[questions[current]?.id] !== undefined) {
      // Simulate autosave (replace with API call)
      // console.log(`Autosaved Q${questions[current].id}:`, answers[questions[current].id]);
    }
  }, [answers, current]);

  const handleOption = (qid, opt) => {
    setAnswers({ ...answers, [qid]: opt });
  };

  const handleFlag = (qid) => {
    setFlags({ ...flags, [qid]: !flags[qid] });
  };

  const handleNav = (idx) => setCurrent(idx);

  const handleSubmit = () => {
    // TODO: Submit answers to server and get attemptId
    const attemptId = "QUIZ-" + Math.floor(Math.random() * 1000000);
    navigate("/thanks", { state: { attemptId } });
  };

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
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
            onClick={() => handleFlag(questions[current].id)}
            className={`ml-4 px-3 py-1 rounded ${flags[questions[current].id] ? 'bg-yellow-400' : 'bg-gray-200'}`}
          >
            {flags[questions[current].id] ? "Flagged" : "Flag"}
          </button>
        </div>
        <div className="mb-4">
          <p className="mb-2 font-medium">{questions[current].text}</p>
          <div className="space-y-2">
            {questions[current].options.map((opt, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={`q${questions[current].id}`}
                  value={opt}
                  checked={answers[questions[current].id] === opt}
                  onChange={() => handleOption(questions[current].id, opt)}
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
            key={q.id}
            onClick={() => handleNav(idx)}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
              ${current === idx ? 'border-blue-500' : 'border-gray-300'}
              ${flags[q.id] ? 'bg-yellow-200' : ''}
              ${answers[q.id] ? 'font-bold' : ''}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
