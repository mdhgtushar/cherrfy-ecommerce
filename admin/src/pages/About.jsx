import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">About</h1>

      <p className="text-gray-600 mb-6">
        Welcome to our application! This page provides a brief overview of the system and its current features.
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">📌 Application Features</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>🔐 <strong>Authentication:</strong> Secure login and registration using JWT.</li>
          <li>📦 <strong>Product Info:</strong> Easily fetch and view product information from the server.</li>
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-400">More features will be added as the app evolves. Stay tuned!</p>
      </div>
    </div>
  );
};

export default About;
