import React from "react";

const ExportResults = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
      <h2 className="text-xl font-bold mb-4">Export Results</h2>
      <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Download CSV</button>
    </div>
  </div>
);

export default ExportResults;
