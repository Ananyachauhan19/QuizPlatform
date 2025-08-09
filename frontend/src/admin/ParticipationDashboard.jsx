import React from "react";

const ParticipationDashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Real-time Participation</h2>
      {/* TODO: Replace with real data */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Student ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Start Time</th>
            <th className="p-2 border">End Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">12345</td>
            <td className="p-2 border">Alice</td>
            <td className="p-2 border text-green-600">Completed</td>
            <td className="p-2 border">10:00</td>
            <td className="p-2 border">10:30</td>
          </tr>
          <tr>
            <td className="p-2 border">67890</td>
            <td className="p-2 border">Bob</td>
            <td className="p-2 border text-yellow-600">In Progress</td>
            <td className="p-2 border">10:05</td>
            <td className="p-2 border">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default ParticipationDashboard;
