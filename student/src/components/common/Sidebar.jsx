import { Link } from "react-router-dom";
import React from "react";
const Sidebar = () => {
  return (
    <aside className="w-60 bg-white border-r hidden md:flex flex-col">
      {/* Profile Section */}
      <div className="p-4 border-b flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
          A
        </div>
        <div>
          <p className="font-medium text-gray-800">Amit Kumar</p>
          <p className="text-sm text-gray-500">Roll No: 8</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-3">
        <Link
          to="/student/dashboard"
          className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100"
        >
          Dashboard
        </Link>
        <Link
          to="/student/profile"
          className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100"
        >
          Profile
        </Link>
        <Link
          to="/student/results"
          className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100"
        >
          Results
        </Link>
        <Link
          to="/student/attendance"
          className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100"
        >
          Attendance
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
