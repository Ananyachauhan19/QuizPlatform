import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
    <div className="max-w-2xl w-full bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex flex-col gap-4">
        <Link to="/admin/create-quiz" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center">Create/Edit Quiz</Link>
        <Link to="/admin/upload-questions" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center">Upload Question Paper</Link>
        <Link to="/admin/schedule-quiz" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-center">Schedule Quiz</Link>
        <Link to="/admin/participation" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-center">Participation Dashboard</Link>
        <Link to="/admin/export-results" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 text-center">Export Results</Link>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
