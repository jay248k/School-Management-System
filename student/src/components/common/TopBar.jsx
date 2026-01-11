import React from "react";

const TopBar = () => {
  return (
    <header className="h-14 bg-blue-600 text-white flex items-center justify-between px-4">
      {/* Left - Logo + School Name */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
          D
        </div>
        <span className="font-semibold text-sm sm:text-base">
          Devangi International High School
        </span>
      </div>

      {/* Right - Logout */}
      <button className="text-sm bg-blue-500 px-3 py-1 rounded hover:bg-blue-700 transition">
        Logout
      </button>
    </header>
  );
};

export default TopBar;
