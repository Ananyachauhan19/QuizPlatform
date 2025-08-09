import React, { useRef } from "react";

const UploadQuestions = () => {
  const fileInput = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: Parse and upload file (CSV/Excel)
      alert(`File selected: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Upload Question Paper</h2>
        <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" ref={fileInput} onChange={handleFileChange} className="mb-4" />
        <p className="text-gray-600">Supported formats: CSV, Excel (.xlsx, .xls)</p>
      </div>
    </div>
  );
};

export default UploadQuestions;
