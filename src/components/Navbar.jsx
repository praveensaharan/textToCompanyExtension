import React, { useState } from "react";
import Chat from "./Chat";
import Result from "./Result";
import Upload from "./Upload";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <nav className="text-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <div className="flex justify-between h-12">
            <div className="md:flex items-center space-x-4">
              {/* <button
                onClick={() => handleTabClick("chat")}
                className={`px-3 pt-2 rounded-md text-customRed text-sm font-medium border-b-4 ${
                  activeTab === "chat"
                    ? "border-customLightRed hover:bg-customLightBlue hover:border-2 transition-all duration-300"
                    : "border-transparent"
                }`}
              >
                Chat
              </button> */}
              <button
                onClick={() => handleTabClick("upload")}
                className={`px-3 pt-2 rounded-md text-customRed text-sm font-medium border-b-4 ${
                  activeTab === "upload"
                    ? "border-customLightRed hover:bg-customLightBlue hover:border-2 transition-all duration-300"
                    : "border-transparent"
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => handleTabClick("results")}
                className={`px-3 pt-2 rounded-md text-customRed text-sm font-medium border-b-4 ${
                  activeTab === "results"
                    ? "border-customLightRed hover:bg-customLightBlue hover:border-2 transition-all duration-300"
                    : "border-transparent"
                }`}
              >
                Results
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Render the selected component based on activeTab state */}
      <div className="mt-2 px-4 sm:px-6 lg:px-8">
        {activeTab === "upload" && <Upload />}
        {activeTab === "results" && <Result />}
      </div>
    </div>
  );
};

export default Navbar;
