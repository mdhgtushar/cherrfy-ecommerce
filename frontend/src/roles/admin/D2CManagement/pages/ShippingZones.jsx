import React, { useState } from "react";

export default function ShippingZones() {
  const [shippingData, setShippingData] = useState({
    countries: [],
    deliveryTime: "",
    priceOverride: "",
    courierServices: [],
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [priceOverride, setPriceOverride] = useState("");

  const handleAddCountry = () => {
    if (selectedCountry && deliveryTime && priceOverride) {
      const newCountry = {
        id: Date.now(),
        name: selectedCountry,
        deliveryTime,
        priceOverride: parseFloat(priceOverride),
      };
      setShippingData(prev => ({
        ...prev,
        countries: [...prev.countries, newCountry]
      }));
      setSelectedCountry("");
      setDeliveryTime("");
      setPriceOverride("");
    }
  };

  const handleRemoveCountry = (id) => {
    setShippingData(prev => ({
      ...prev,
      countries: prev.countries.filter(country => country.id !== id)
    }));
  };

  const handleDefineShippingCountries = () => {
    console.log("Defining shipping countries");
    // Handle shipping countries definition
  };

  const handleConnectCouriers = () => {
    console.log("Connecting regional couriers");
    // Handle courier connection
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Zones & Options</h2>
        <p className="text-gray-600">Configure shipping zones, delivery times, and courier services</p>
      </div>

      {/* Define Shipping Countries Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Define Shipping Countries</h3>
        <button 
          onClick={handleDefineShippingCountries}
          className="mb-4 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Define Shipping Countries
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Country
            </label>
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="AU">Australia</option>
              <option value="JP">Japan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Delivery Time
            </label>
            <input
              type="text"
              placeholder="e.g., 5-7 business days"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Override (USD)
            </label>
            <input
              type="number"
              placeholder="Override shipping price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={priceOverride}
              onChange={(e) => setPriceOverride(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <button 
          onClick={handleAddCountry}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Country
        </button>
      </div>

      {/* Configured Countries List */}
      {shippingData.countries.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Configured Shipping Countries</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price Override
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shippingData.countries.map((country) => (
                  <tr key={country.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {country.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {country.deliveryTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${country.priceOverride}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleRemoveCountry(country.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Regional Couriers Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Connect Regional Couriers</h3>
        <button 
          onClick={handleConnectCouriers}
          className="mb-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Connect Regional Couriers
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Courier Services
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>DHL Express</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>FedEx</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>UPS</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>USPS</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Local Courier Services</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Courier Integration Status
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm">DHL Express</span>
                <span className="text-xs text-green-600">Connected</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-sm">FedEx</span>
                <span className="text-xs text-yellow-600">Pending</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">UPS</span>
                <span className="text-xs text-gray-600">Not Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{shippingData.countries.length}</div>
          <div className="text-sm text-blue-700">Configured Countries</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">2</div>
          <div className="text-sm text-green-700">Active Couriers</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">98.5%</div>
          <div className="text-sm text-purple-700">Delivery Success Rate</div>
        </div>
      </div>
    </div>
  );
}
