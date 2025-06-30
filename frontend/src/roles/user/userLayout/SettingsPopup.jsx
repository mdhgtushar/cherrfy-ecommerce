import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import Countries from "../../../util/Countries";
import { setSettingsSlice } from "../../../features/userSettingsSlice";
import { useDispatch, useSelector } from "react-redux";

// Country code to name mapping
const countryNames = {
  "US": "United States",
  "CA": "Canada", 
  "GB": "United Kingdom",
  "AU": "Australia",
  "DE": "Germany",
  "FR": "France",
  "IT": "Italy",
  "ES": "Spain",
  "NL": "Netherlands",
  "PL": "Poland",
  "SE": "Sweden",
  "NO": "Norway",
  "FI": "Finland",
  "DK": "Denmark",
  "IE": "Ireland",
  "PT": "Portugal",
  "BE": "Belgium",
  "CH": "Switzerland",
  "AT": "Austria",
  "CZ": "Czech Republic",
  "SK": "Slovakia",
  "HU": "Hungary",
  "RO": "Romania",
  "BG": "Bulgaria",
  "GR": "Greece",
  "SI": "Slovenia",
  "HR": "Croatia",
  "EE": "Estonia",
  "LV": "Latvia",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "MT": "Malta",
  "CY": "Cyprus",
  "NZ": "New Zealand",
  "AE": "United Arab Emirates",
  "IL": "Israel",
  "TR": "Turkey",
  "MX": "Mexico",
  "BRL": "Brazil",
  "AR": "Argentina",
  "ZA": "South Africa",
  "BD": "Bangladesh"
};

const SettingsPopup = () => {
  const { shipToCountry, currency } = useSelector((state) => state.userSettings);
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

  const getCountryName = (code) => {
    return countryNames[code] || code;
  };

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
                {getCountryName(shipToCountry)} - {currency} /
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
          className="fixed h-screen inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
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
            {Countries.map((countryCode) => (
              <option key={countryCode} value={countryCode} selected={settings.shipToCountry === countryCode}>
                {getCountryName(countryCode)}
              </option>
            ))}
          </select>
        </div>

        {/* Currency */}
        <div>
          <label className="block font-medium mb-1">Currency</label>
           
          <select name="currency" id="currency"
            onChange={handleChange}
            className="w-full border rounded p-2">
  <option value="USD">United States (USD)</option>
  <option value="CAD">Canada (CAD)</option>
  <option value="GBP">United Kingdom (GBP)</option>
  <option value="AUD">Australia (AUD)</option>
  <option value="EUR">Germany (EUR)</option>
  <option value="EUR">France (EUR)</option>
  <option value="EUR">Italy (EUR)</option>
  <option value="EUR">Spain (EUR)</option>
  <option value="EUR">Netherlands (EUR)</option>
  <option value="PLN">Poland (PLN)</option>
  <option value="SEK">Sweden (SEK)</option>
  <option value="NOK">Norway (NOK)</option>
  <option value="EUR">Finland (EUR)</option>
  <option value="DKK">Denmark (DKK)</option>
  <option value="EUR">Ireland (EUR)</option>
  <option value="EUR">Portugal (EUR)</option>
  <option value="EUR">Belgium (EUR)</option>
  <option value="CHF">Switzerland (CHF)</option>
  <option value="EUR">Austria (EUR)</option>
  <option value="CZK">Czech Republic (CZK)</option>
  <option value="EUR">Slovakia (EUR)</option>
  <option value="HUF">Hungary (HUF)</option>
  <option value="RON">Romania (RON)</option>
  <option value="BGN">Bulgaria (BGN)</option>
  <option value="EUR">Greece (EUR)</option>
  <option value="EUR">Slovenia (EUR)</option>
  <option value="EUR">Croatia (EUR)</option>
  <option value="EUR">Estonia (EUR)</option>
  <option value="EUR">Latvia (EUR)</option>
  <option value="EUR">Lithuania (EUR)</option>
  <option value="EUR">Luxembourg (EUR)</option>
  <option value="EUR">Malta (EUR)</option>
  <option value="EUR">Cyprus (EUR)</option>
  <option value="NZD">New Zealand (NZD)</option>
  <option value="AED">United Arab Emirates (AED)</option>
  <option value="ILS">Israel (ILS)</option>
  <option value="TRY">Turkey (TRY)</option>
  <option value="MXN">Mexico (MXN)</option>
  <option value="BRL">Brazil (BRL)</option>
  <option value="ARS">Argentina (ARS)</option>
  <option value="ZAR">South Africa (ZAR)</option>
  <option value="BDT">Bangladesh (BDT)</option>
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
