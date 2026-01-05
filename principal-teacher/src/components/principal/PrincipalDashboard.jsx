import React from "react";

const PrincipalDashboard = () => {
  const teacherName = "John Doe"; // Replace with dynamic auth name

  // Sidebar links (can expand later)
  const sidebarLinks = ["Home", "Students", "Teachers", "Classes", "Settings"];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Principal Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          {sidebarLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:bg-blue-100 rounded px-3 py-2 transition"
            >
              {link}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Welcome, {teacherName} 👋
          </h1>
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Dashboard Content</h2>
            <p>Here you can add charts, stats, tables, etc.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
