import { Outlet } from "react-router-dom";
import TopBar from "../common/TopBar";
import Sidebar from "../common/Sidebar";
import React from "react";
const StudentLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <TopBar />

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
