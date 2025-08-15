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

  // Fetch quizzes and only show those with endTime in the future (or no endTime)
  const fetchQuizzes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/quizzes");
      if (!res.ok) throw new Error("Failed to fetch quizzes");
      const data = await res.json();
      const now = new Date();
      setQuizzes(data.filter(q => !q.endTime || new Date(q.endTime) > now));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Upcoming Quizzes</h2>
          <button
            onClick={fetchQuizzes}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Refresh quiz list"
          >
            Refresh
          </button>
        </div>
        {loading ? (
          <div className="mb-6 flex items-center gap-2 text-blue-600"><span className="loader mr-2"></span>Loading quizzes...</div>
        ) : error ? (
          <div className="mb-6 text-red-600 font-semibold">{error}</div>
        ) : (
          <ul className="mb-6">
            {quizzes.length === 0 ? (
              <li className="text-gray-500">No upcoming quizzes at the moment.</li>
            ) : (
              quizzes.map((quiz) => (
                <li key={quiz._id} className="mb-2 p-3 border rounded flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-blue-50 transition">
                  <div>
                    <a href={`/quiz/${quiz._id}`} className="font-medium text-blue-700 hover:underline text-lg">{quiz.title}</a>
                    <div className="text-sm text-gray-500 mt-1">{quiz.description}</div>
                  </div>
                  <span className="text-gray-600 text-sm mt-2 md:mt-0">
                    {new Date(quiz.startTime).toLocaleString()} {quiz.endTime ? `- ${new Date(quiz.endTime).toLocaleString()}` : ''}
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
