import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import Countries from "../../../util/Countries";
import { setSettingsSlice } from "../../../features/userSettingsSlice";
import { useDispatch, useSelector } from "react-redux";
const SettingsPopup = () => {
  const { shipToCountry } = useSelector((state) => state.userSettings);
  const dispatch = useDispatch();
  const [isLogOut, setIsLogOut] = useState(false);
  const [settings, setSettings] = useState({
    shipToCountry: 'BD',
    currency: 'BDT',
    language: 'English',
    theme: 'light',
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };
  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsLogOut(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const saveChanges = () => {
    // Here you would typically dispatch an action to save the settings
    console.log("Settings saved:", settings);
    dispatch(setSettingsSlice(settings));
    setIsLogOut(false);
  }
  return (
    <div className="relative z-10">
      {/* <button
       
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      > <Settings className="mr-1 w-5 h-5 text-2xl" />
      </button> */}
      <div onClick={() => setIsLogOut(true)}>
        <div className="flex items-center text-sm">
          <div className="flex items-center hover:text-red-600 cursor-pointer">
            <Settings className="mr-1 w-5 h-5 text-2xl" />
            <div className="text-sm">
              <div className="text-xs text-gray-500 hover:text-red-600 rounded-full text-black text-left">
                {shipToCountry} - USD /
              </div>
              <div className="font-semibold flex items-center">
                <span>SETTINGS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLogOut && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsLogOut(false)}
        >
          <div
            className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Prevent click inside popup from closing
          >
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <div className="space-y-6">
        {/* Ship to Country */}
        <div>
          <label className="block font-medium mb-1">Ship to Country</label>
          <select
            name="shipToCountry"
            value={settings.shipToCountry}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            {Countries.map((country) => (
              <option key={country} value={country} selected={settings.shipToCountry === country}>
                {country}
              </option>
            ))}
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
            <button
              onClick={saveChanges}
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPopup;
