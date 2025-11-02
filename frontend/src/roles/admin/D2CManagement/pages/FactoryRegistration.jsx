import React, { useState } from "react";

export default function FactoryRegistration() {
  const [formData, setFormData] = useState({
    businessLicense: null,
    idDocument: null,
    countryManager: "",
    commission: "",
    currency: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Factory Registration Data:", formData);
    // Handle form submission
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Factory Registration</h2>
        <p className="text-gray-600">Complete your factory vendor application and KYC verification</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Application Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Vendor Application</h3>
          <button 
            type="button"
            className="mb-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Apply as Factory Vendor
          </button>
        </div>

        {/* Document Upload Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Document Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Business License
              </label>
              <input 
                type="file" 
                name="businessLicense"
                onChange={handleInputChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload ID Document
              </label>
              <input 
                type="file" 
                name="idDocument"
                onChange={handleInputChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          </div>
          <button 
            type="button"
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Complete KYC Verification
          </button>
        </div>

        {/* Configuration Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Factory Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Country Manager
              </label>
              <select 
                name="countryManager"
                value={formData.countryManager}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Country Manager</option>
                <option value="manager1">Country Manager 1</option>
                <option value="manager2">Country Manager 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commission & Tax Settings (%)
              </label>
              <input
                type="number"
                name="commission"
                value={formData.commission}
                onChange={handleInputChange}
                placeholder="Set Commission"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency Settings
              </label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                placeholder="Set Currency (e.g., USD, EUR)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button 
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Save Factory Registration
          </button>
        </div>
      </form>
    </div>
  );
}
