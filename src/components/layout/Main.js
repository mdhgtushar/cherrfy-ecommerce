import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Main = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex">
      <Sidebar toggleSidebar={toggleSidebar} />
      {/* Overlay for Sidebar on Mobile */}
      {sidebarOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen transition-all duration-200">
        {/* Mobile Header */}
        <Header toggleSidebar={toggleSidebar} />

        <MainContent />
      </div>
    </div>
  );
};

export default Main;
