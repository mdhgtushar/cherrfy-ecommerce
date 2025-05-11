import React, { useState } from 'react';

const PricingAndProfitManagement = () => {
  const [markupType, setMarkupType] = useState('percentage');
  const [globalMarkup, setGlobalMarkup] = useState(10);
  const [countryPricing, setCountryPricing] = useState({});
  const [currencyConversion, setCurrencyConversion] = useState('auto');
  const [showCompareAtPrice, setShowCompareAtPrice] = useState(false);
  const [b2bMode, setB2bMode] = useState(false);
  const [priceLogs, setPriceLogs] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [margin, setMargin] = useState(0);
  
  const handleMarkupChange = (e) => {
    setGlobalMarkup(e.target.value);
  };
  
  const handleCountryPricingChange = (country, price) => {
    setCountryPricing(prev => ({ ...prev, [country]: price }));
  };
  
  const handleCurrencyConversionChange = (e) => {
    setCurrencyConversion(e.target.value);
  };

  const handleB2bModeChange = () => {
    setB2bMode(!b2bMode);
  };

  const handlePriceLogChange = (newLog) => {
    setPriceLogs(prev => [...prev, newLog]);
  };

  const handlePricePreview = () => {
    const calculatedPrice = costPrice + (costPrice * (globalMarkup / 100));
    const calculatedMargin = calculatedPrice - costPrice;
    setFinalPrice(calculatedPrice);
    setMargin(calculatedMargin);
  };

  return (
    <div className="my-4 px-2">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pricing & Profit Management</h2>

      {/* Global Markup Rules */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Global Markup Rules</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-gray-600 font-medium">Markup Type:</label>
            <select
              value={markupType}
              onChange={(e) => setMarkupType(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-600 font-medium">Global Markup:</label>
            <input
              type="number"
              value={globalMarkup}
              onChange={handleMarkupChange}
              min="0"
              className="p-2 border rounded-md"
            />
          </div>
          <button
            onClick={handlePricePreview}
            className="bg-blue-500 text-white p-3 rounded-md mt-4 hover:bg-blue-600"
          >
            Preview Final Price
          </button>
        </div>
      </section>

      {/* Country-wise Pricing */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Country-wise Pricing</h3>
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-gray-600 font-medium">Currency Conversion:</label>
          <select
            value={currencyConversion}
            onChange={handleCurrencyConversionChange}
            className="p-2 border rounded-md"
          >
            <option value="auto">Auto</option>
            <option value="manual">Manual Override</option>
          </select>
        </div>
        {Object.keys(countryPricing).map((country) => (
          <div key={country} className="flex items-center space-x-4 mb-4">
            <label className="text-gray-600 font-medium">{country} Price:</label>
            <input
              type="number"
              value={countryPricing[country]}
              onChange={(e) => handleCountryPricingChange(country, e.target.value)}
              className="p-2 border rounded-md"
            />
          </div>
        ))}
      </section>

      {/* Compare-at Price Settings */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Compare-at Price Settings</h3>
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-gray-600 font-medium">Show "Compare at" Price:</label>
          <input
            type="checkbox"
            checked={showCompareAtPrice}
            onChange={() => setShowCompareAtPrice(!showCompareAtPrice)}
            className="h-5 w-5"
          />
        </div>
      </section>

      {/* B2B/B2C Mode Switch */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">B2B/B2C Mode Switch</h3>
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-gray-600 font-medium">B2B Mode:</label>
          <input
            type="checkbox"
            checked={b2bMode}
            onChange={handleB2bModeChange}
            className="h-5 w-5"
          />
        </div>
      </section>

      {/* Manual Override Logs */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Manual Override Logs</h3>
        {priceLogs.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {priceLogs.map((log, index) => (
              <li key={index} className="text-gray-600">
                <p>{log.message} - {log.timestamp}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No manual overrides made yet.</p>
        )}
      </section>

      {/* Pricing Preview Tool */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Pricing Preview Tool</h3>
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-gray-600 font-medium">Cost Price:</label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            min="0"
            step="0.01"
            className="p-2 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-700">Final Selling Price: ${finalPrice.toFixed(2)}</p>
          <p className="text-lg font-semibold text-gray-700">Margin: ${margin.toFixed(2)}</p>
          <p className="text-lg font-semibold text-gray-700">Estimated Profit: {(margin / costPrice * 100).toFixed(2)}%</p>
        </div>
      </section>
    </div>
  );
};

export default PricingAndProfitManagement;
