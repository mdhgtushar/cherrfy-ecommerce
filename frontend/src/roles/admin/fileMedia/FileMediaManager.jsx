import React, { useState } from "react";
import Gallery from "./Gallery"

export default function FileMediaManager() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [folders, setFolders] = useState(["Marketing", "Product", "Factory"]);
  const [folderName, setFolderName] = useState("");
  const [publicCDN, setPublicCDN] = useState(true);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📁 File & Media Manager</h1>

<Gallery />
      {/* Upload Files */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Upload Files</h2>
        <input type="file" className="block w-full mb-2" onChange={handleFileUpload} multiple />
        <p className="text-sm text-gray-500">Allowed: JPG, PNG, MP4, PDF, WebP | Max Size: 10MB</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
      </section>

      {/* Organize Folders */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Organize Folders</h2>
        <ul className="list-disc pl-5">
          {folders.map((folder, idx) => (
            <li key={idx}>{folder}</li>
          ))}
        </ul>
        <input
          type="text"
          className="mt-2 p-2 border rounded w-full"
          placeholder="New folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => {
            setFolders([...folders, folderName]);
            setFolderName("");
          }}
        >
          Create Folder
        </button>
      </section>

      {/* CDN URL Generator */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">CDN URL Generator</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Public CDN Access:</span>
          <input
            type="checkbox"
            checked={publicCDN}
            onChange={() => setPublicCDN(!publicCDN)}
            className="ml-2 w-4 h-4"
          />
        </div>
        <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded">Copy CDN Link</button>
      </section>

      {/* Replace / Delete Media */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Replace / Delete Media</h2>
        <button className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded">Replace File</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded">Delete File</button>
      </section>

      {/* Image Optimization */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Image Optimization</h2>
        <button className="mr-2 px-4 py-2 bg-gray-700 text-white rounded">Compress</button>
        <button className="mr-2 px-4 py-2 bg-indigo-600 text-white rounded">Convert to WebP</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Resize</button>
      </section>
    </div>
  );
}
