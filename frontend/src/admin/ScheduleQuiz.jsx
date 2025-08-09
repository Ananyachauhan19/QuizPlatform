import React from "react";

const ScheduleQuiz = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Schedule Quiz</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Start Time</label>
          <input type="datetime-local" className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">End Time</label>
          <input type="datetime-local" className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Schedule</button>
      </form>
    </div>
  </div>
);

export default ScheduleQuiz;
