import React, { useState } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    country: 'Bangladesh',
    currency: 'BDT',
    language: 'English',
    theme: 'light',
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Ship to Country */}
        <div>
          <label className="block font-medium mb-1">Ship to Country</label>
          <select
            name="country"
            value={settings.country}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option>Bangladesh</option>
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
          </select>
        </div>

        {/* Currency */}
        <div>
          <label className="block font-medium mb-1">Currency</label>
          <select
            name="currency"
            value={settings.currency}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="BDT">৳ BDT</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="INR">₹ INR</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block font-medium mb-1">Language</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option>English</option>
            <option>বাংলা</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>

        {/* Theme */}
        <div>
          <label className="block font-medium mb-1">Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
