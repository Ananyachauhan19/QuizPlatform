import React from "react";

const CreateEditQuiz = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Create / Edit Quiz</h2>
      {/* Form for quiz title, description, etc. */}
      <form>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Quiz Title</label>
          <input type="text" className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea className="w-full px-3 py-2 border rounded" rows="3" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Quiz</button>
      </form>
    </div>
  </div>
);

export default CreateEditQuiz;
