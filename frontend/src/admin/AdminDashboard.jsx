import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-4 sm:p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link to="/admin/create-quiz" className="bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 text-center font-semibold transition">Create/Edit Quiz</Link>
          <Link to="/admin/participation" className="bg-purple-600 text-white py-3 rounded-xl shadow hover:bg-purple-700 text-center font-semibold transition">Participation Dashboard</Link>
          <Link to="/admin/export-results" className="bg-gray-800 text-white py-3 rounded-xl shadow hover:bg-gray-900 text-center font-semibold transition">Export Results</Link>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Scheduled Quizzes</h2>
        {loading ? (
          <div className="mb-6 text-center text-blue-500 font-medium">Loading...</div>
        ) : error ? (
          <div className="mb-6 text-red-600 text-center">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 font-semibold">Title</th>
                  <th className="p-2 font-semibold">Start</th>
                  <th className="p-2 font-semibold">End</th>
                  <th className="p-2 font-semibold">Visibility</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.length === 0 ? (
                  <tr><td colSpan={4} className="text-gray-500 p-4 text-center">No scheduled quizzes.</td></tr>
                ) : (
                  quizzes.map((quiz) => (
                    <tr key={quiz._id} className="border-b hover:bg-blue-50 transition">
                      <td className="p-2 font-medium text-blue-900">{quiz.title}</td>
                      <td className="p-2">{new Date(quiz.startTime).toLocaleString()}</td>
                      <td className="p-2">{quiz.endTime ? new Date(quiz.endTime).toLocaleString() : "No end time"}</td>
                      <td className="p-2 capitalize">{quiz.visibility || 'public'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
