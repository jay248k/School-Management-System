import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const PrincipalDashboard = () => {
  const teacherName = "John Doe";
  const location = useLocation();

  // Sidebar links
  const sidebarLinks = [
    { name: "Home", link: "/principal/home" },
    {
      name: "Students",
      subLinks: [
        { name: "Add Student", link: "/principal/students/add" },
        { name: "View Students", link: "/principal/students/view" },
      ],
    },
    {
      name: "Teachers",
      subLinks: [
        { name: "Add Teacher", link: "/principal/teachers/add" },
        { name: "View Teachers", link: "/principal/teachers/view" },
      ],
    },
    {
      name: "Classes",
      subLinks: [
        { name: "Add Class", link: "/principal/classes/add" },
        { name: "View Classes", link: "/principal/classes/view" },
      ],
    },
    { name: "Settings", link: "/principal/settings" },
  ];

  const [openMenu, setOpenMenu] = useState("");

  // Check if we are at the default route
  const isDefault =
    location.pathname === "/principal" || location.pathname === "/principal/";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-1">
          {sidebarLinks.map((link) => (
            <div key={link.name}>
              {link.subLinks ? (
                <>
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === link.name ? "" : link.name)
                    }
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      location.pathname.startsWith(link.link)
                        ? "bg-blue-100"
                        : "hover:bg-blue-100"
                    }`}
                  >
                    {link.name}
                  </button>
                  {openMenu === link.name && (
                    <div className="ml-4 mt-1 flex flex-col space-y-1">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.link}
                          className={`px-3 py-1 rounded text-sm transition ${
                            location.pathname === sub.link
                              ? "bg-blue-200 font-semibold"
                              : "hover:bg-blue-50 text-gray-700"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.link}
                  className={`block px-3 py-2 rounded transition ${
                    location.pathname === link.link
                      ? "bg-blue-200 font-semibold"
                      : "hover:bg-blue-100 text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
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

        <main className="p-6 flex-1 overflow-auto">
          {isDefault ? (
            // Default Home content if no Outlet is active
            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-semibold text-gray-700">
                Dashboard Home
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-4 flex flex-col">
                  <span className="text-gray-500 text-sm">Total Students</span>
                  <span className="text-2xl font-bold mt-2">120</span>
                </div>
                <div className="bg-white shadow rounded-lg p-4 flex flex-col">
                  <span className="text-gray-500 text-sm">Total Teachers</span>
                  <span className="text-2xl font-bold mt-2">25</span>
                </div>
                <div className="bg-white shadow rounded-lg p-4 flex flex-col">
                  <span className="text-gray-500 text-sm">Total Classes</span>
                  <span className="text-2xl font-bold mt-2">8</span>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Welcome to the Dashboard!
                </h3>
                <p className="text-gray-600">
                  Here you can view statistics, manage students, teachers, and
                  classes, and navigate through different sections using the
                  sidebar.
                </p>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
