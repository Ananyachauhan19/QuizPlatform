
import React, { useState } from "react";

function parseCSV(csv) {
  const lines = csv.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const result = [];
  for (let line of lines) {
    const [questionText, optionA, optionB, optionC, optionD, correctAnswer] = line.split(",").map(s => s && s.trim());
    if (!questionText || !optionA || !optionB || !optionC || !optionD || !correctAnswer) continue;
    result.push({
      questionText,
      options: [optionA, optionB, optionC, optionD],
      answer: correctAnswer
    });
  }
  return result;
}

const CreateEditQuiz = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    questions: [],
    duration: "",
    startTime: "",
    endTime: "",
    visibility: "public",
  });
  const [questionRow, setQuestionRow] = useState({ questionText: "", options: ["", "", "", ""], answer: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e, idx) => {
    const opts = [...questionRow.options];
    opts[idx] = e.target.value;
    setQuestionRow({ ...questionRow, options: opts });
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!questionRow.questionText || questionRow.options.some((o) => !o) || !questionRow.answer) return;
    setForm({ ...form, questions: [...form.questions, { ...questionRow, options: questionRow.options.map(opt => opt.trim()), answer: questionRow.answer.trim() }] });
    setQuestionRow({ questionText: "", options: ["", "", "", ""], answer: "" });
  };

  const handleCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const questions = parseCSV(evt.target.result);
      setForm((f) => ({ ...f, questions: [...f.questions, ...questions] }));
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          duration: Number(form.duration),
        }),
      });
      if (!res.ok) throw new Error("Failed to create quiz");
      setMessage("Quiz scheduled successfully!");
      setForm({ title: "", description: "", questions: [], duration: "", startTime: "", endTime: "", visibility: "public" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-2 sm:p-8">
      <div className="w-full max-w-10xl bg-white rounded-2xl shadow-xl p-4 sm:p-8">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">Schedule Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {message && <div className="mb-2 text-green-600 text-center font-semibold">{message}</div>}
          {error && <div className="mb-2 text-red-600 text-center font-semibold">{error}</div>}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Quiz Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300" rows="3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Start Date & Time</label>
              <input type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">End Date & Time (optional)</label>
              <input type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Quiz Duration (minutes)</label>
            <input type="number" name="duration" value={form.duration} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300" required min="1" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Visibility</label>
            <select name="visibility" value={form.visibility} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <label className="block mb-2 font-semibold text-gray-700">Add Question (manual)</label>
            <input type="text" placeholder="Question text" value={questionRow.questionText} onChange={e => setQuestionRow({ ...questionRow, questionText: e.target.value })} className="w-full px-3 py-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-300" />
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              {questionRow.options.map((opt, idx) => (
                <input key={idx} type="text" placeholder={`Option ${idx + 1}`} value={opt} onChange={e => handleQuestionChange(e, idx)} className="flex-1 px-2 py-1 border rounded-lg focus:ring-2 focus:ring-blue-300" />
              ))}
            </div>
            <input type="text" placeholder="Correct answer" value={questionRow.answer} onChange={e => setQuestionRow({ ...questionRow, answer: e.target.value })} className="w-full px-3 py-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-300" />
            <button onClick={handleAddQuestion} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-2 w-full sm:w-auto">Add Question</button>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <label className="block mb-2 font-semibold text-gray-700">Or Upload Questions (CSV: question,option1,option2,option3,option4,answer)</label>
            <input type="file" accept=".csv" onChange={handleCSV} className="w-full" />
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block mb-2 font-semibold text-gray-700">Questions Added</label>
            <ul className="list-decimal pl-6">
              {form.questions.map((q, idx) => (
                <li key={idx} className="mb-1 text-gray-800">{q.questionText} <span className="text-gray-500">({q.options.join(", ")})</span> - <b className="text-blue-700">{q.answer}</b></li>
              ))}
            </ul>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition">Schedule Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditQuiz;
