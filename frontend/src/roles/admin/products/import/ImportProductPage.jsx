import React, { useState } from 'react';

const ImportProductPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setPreview([]);
  };

  const handlePreview = async () => {
    if (!file) return setError('Please select a file.');
    setLoading(true);
    setError('');
    // Dummy preview logic (replace with real parsing logic)
    setTimeout(() => {
      setPreview([
        { name: 'Sample Product 1', price: 10, sku: 'SKU1' },
        { name: 'Sample Product 2', price: 20, sku: 'SKU2' },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleImport = () => {
    // Implement import logic (API call)
    alert('Products imported!');
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4 text-neutral-900">Import Products</h1>
      <p className="mb-4 text-neutral-600">Upload a CSV or Excel file to bulk import products. Preview before importing.</p>
      <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} className="mb-4 border border-gray-300 rounded-xl px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <button
        onClick={handlePreview}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition mr-2"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Preview'}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {preview.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-neutral-900">Preview</h2>
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-neutral-50">
              <tr>
                <th className="border border-gray-200 px-2 py-1">Name</th>
                <th className="border border-gray-200 px-2 py-1">Price</th>
                <th className="border border-gray-200 px-2 py-1">SKU</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((row, idx) => (
                <tr key={idx} className="even:bg-neutral-50">
                  <td className="border border-gray-200 px-2 py-1">{row.name}</td>
                  <td className="border border-gray-200 px-2 py-1">{row.price}</td>
                  <td className="border border-gray-200 px-2 py-1">{row.sku}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleImport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition mt-4"
          >
            Import
          </button>
        </div>
      )}
    </div>
  );
};

export default ImportProductPage; 