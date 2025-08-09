import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThanksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get attemptId from state or query param (simulate for now)
  const attemptId = location.state?.attemptId || "QUIZ-" + Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Thank You!</h1>
        <p className="mb-2">Your quiz has been submitted successfully.</p>
        <p className="mb-4">Submission Receipt:</p>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <span className="font-mono text-lg">Attempt ID: <b>{attemptId}</b></span>
        </div>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThanksPage;
