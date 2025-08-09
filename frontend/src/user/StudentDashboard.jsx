
import React, { useEffect, useState } from "react";

const instructions = [
  "Read all questions carefully before answering.",
  "Do not refresh the page during the quiz.",
  "Each quiz has a time limit.",
  "Submit your answers before the timer ends."
];

const StudentDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quizzes");
        if (!res.ok) throw new Error("Failed to fetch quizzes");
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
        <h2 className="text-xl font-semibold mb-2">Scheduled Quizzes</h2>
        {loading ? (
          <div className="mb-6">Loading...</div>
        ) : error ? (
          <div className="mb-6 text-red-600">{error}</div>
        ) : (
          <ul className="mb-6">
            {quizzes.length === 0 ? (
              <li className="text-gray-500">No scheduled quizzes.</li>
            ) : (
              quizzes.map((quiz) => (
                <li key={quiz._id} className="mb-2 p-3 border rounded flex justify-between items-center">
                  <span className="font-medium">{quiz.title}</span>
                  <span className="text-gray-600">
                    {new Date(quiz.startTime).toLocaleString()} - {new Date(quiz.endTime).toLocaleString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ul className="list-disc pl-6">
          {instructions.map((inst, idx) => (
            <li key={idx} className="mb-1">{inst}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
