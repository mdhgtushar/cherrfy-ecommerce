import React, { useState } from "react";

const BackupRestorePage = () => {
  const [backups, setBackups] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCreateBackup = () => {
    const newBackup = {
      id: Date.now(),
      size: "5MB",
      date: new Date().toLocaleString(),
      triggeredBy: "Manual",
    };
    setBackups([newBackup, ...backups]);
    alert("Backup created!");
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (selectedFile) {
      alert(`Importing ${selectedFile.name}`);
      setSelectedFile(null);
    } else {
      alert("Please select a file to import.");
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">🗂️ Backup & Restore</h1>

      {/* Full DB Backup */}
      <div className="mb-10 bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">📦 Full DB Backup</h2>
        <button
          onClick={handleCreateBackup}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Create Manual Backup Now
        </button>
        <ul className="text-gray-700 list-disc list-inside">
          <li>Schedule Auto Backup (Daily / Weekly / Monthly)</li>
          <li>Download Full SQL Dump</li>
          <li>Store Backup to Cloud (Google Drive, Dropbox, S3)</li>
          <li>Log Backup Size, Date & Trigger Source</li>
        </ul>
        <div className="mt-4">
          <h3 className="font-bold">Backups:</h3>
          <table className="w-full mt-2 table-auto text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Date</th>
                <th className="p-2">Size</th>
                <th className="p-2">Triggered By</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="p-2">{b.date}</td>
                  <td className="p-2">{b.size}</td>
                  <td className="p-2">{b.triggeredBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export / Import Products */}
      <div className="mb-10 bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">📤 Export / Import Products</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded mr-4">
          Export Products
        </button>
        <input
          type="file"
          accept=".csv, application/json"
          onChange={handleFileChange}
          className="block mt-4"
        />
        <button
          onClick={handleImport}
          className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
        >
          Import Selected File
        </button>
        <ul className="text-gray-700 list-disc list-inside mt-4">
          <li>Field Mapping Tool</li>
          <li>Error Logs & Validation Check</li>
          <li>Partial Import Rollback Option</li>
        </ul>
      </div>

      {/* Restore Snapshot */}
      <div className="mb-10 bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔄 Restore Snapshot</h2>
        <select className="border p-2 rounded mb-4 w-full">
          <option>Select Backup Timestamp</option>
          {backups.map((b) => (
            <option key={b.id}>{b.date}</option>
          ))}
        </select>
        <button className="bg-red-600 text-white px-4 py-2 rounded mr-2">
          Restore Full Database
        </button>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded">
          Preview Before Restore
        </button>
      </div>

      {/* Logs & Monitoring */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">📑 Backup Logs & Monitoring</h2>
        <ul className="text-gray-700 list-disc list-inside">
          <li>View All Backup Activities</li>
          <li>Backup Failure Alerts</li>
          <li>Restore History Logs</li>
          <li>Admin Who Performed Each Backup or Restore</li>
        </ul>
      </div>
    </div>
  );
};

export default BackupRestorePage;
