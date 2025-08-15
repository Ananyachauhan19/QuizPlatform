import React, { useEffect, useState } from "react";

const ParticipationDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/quizzes/admin/participation");
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

  const handleQuizClick = async (quiz) => {
    setSelectedQuiz(quiz);
    setLoading(true);
    setAttempts([]);
    try {
      const res = await fetch(`http://localhost:5000/api/quizzes/${quiz._id}/attempts`);
      if (!res.ok) throw new Error("Failed to fetch attempts");
      const data = await res.json();
      setAttempts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Real-time Participation</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {!selectedQuiz ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Quizzes</h3>
            {loading ? <div>Loading...</div> : (
              <table className="w-full border mb-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Quiz Title</th>
                    <th className="p-2 border">Start Time</th>
                    <th className="p-2 border">End Time</th>
                    <th className="p-2 border">Total Attempts</th>
                    <th className="p-2 border">Top Score</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz) => (
                    <tr key={quiz._id} className="hover:bg-blue-50 cursor-pointer" onClick={() => handleQuizClick(quiz)}>
                      <td className="p-2 border text-blue-700 underline">{quiz.title}</td>
                      <td className="p-2 border">{quiz.startTime ? new Date(quiz.startTime).toLocaleString() : "-"}</td>
                      <td className="p-2 border">{quiz.endTime ? new Date(quiz.endTime).toLocaleString() : "-"}</td>
                      <td className="p-2 border">{quiz.totalAttempts}</td>
                      <td className="p-2 border">{quiz.topScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <>
            <button className="mb-4 px-4 py-2 bg-gray-200 rounded" onClick={() => setSelectedQuiz(null)}>&larr; Back to Quizzes</button>
            <h3 className="text-lg font-semibold mb-2">{selectedQuiz.title} - Participation</h3>
            {loading ? <div>Loading...</div> : (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Student ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Start Time</th>
                    <th className="p-2 border">End Time</th>
                    <th className="p-2 border">Attempted</th>
                    <th className="p-2 border">Correct</th>
                    <th className="p-2 border">Wrong</th>
                    <th className="p-2 border">Unattempted</th>
                    <th className="p-2 border">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((a) => {
                    const attempted = a.answers.filter(ans => ans.selected).length;
                    const correct = a.answers.filter(ans => ans.isCorrect).length;
                    const wrong = a.answers.filter(ans => ans.selected && !ans.isCorrect).length;
                    const unattempted = a.answers.filter(ans => !ans.selected).length;
                    return (
                      <tr key={a._id} className="hover:bg-blue-50">
                        <td className="p-2 border">{a.studentId}</td>
                        <td className="p-2 border">{a.studentName || '-'}</td>
                        <td className="p-2 border">{a.startedAt ? new Date(a.startedAt).toLocaleString() : '-'}</td>
                        <td className="p-2 border">{a.endedAt ? new Date(a.endedAt).toLocaleString() : '-'}</td>
                        <td className="p-2 border">{attempted}</td>
                        <td className="p-2 border text-green-700">{correct}</td>
                        <td className="p-2 border text-red-700">{wrong}</td>
                        <td className="p-2 border">{unattempted}</td>
                        <td className="p-2 border font-bold">{a.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ParticipationDashboard;
