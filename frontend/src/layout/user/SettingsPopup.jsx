import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
const SettingsPopup = () => {
  const [isLogOut, setIsLogOut] = useState(false);

  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsLogOut(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
                EN - USD /
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
            <div className="space-y-4">
              {/* Your settings options go here */}
              <div>
                <label className="block text-sm font-medium">Option 1</label>
                <input
                  type="text"
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Option 2</label>
                <input type="checkbox" />
              </div>
            </div>
            <button
              onClick={() => setIsLogOut(false)}
              className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPopup;
