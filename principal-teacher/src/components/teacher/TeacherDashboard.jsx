import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const TeacherDashboard = () => {
  const teacherName = "John Doe"; // later from auth
  const location = useLocation();

  // Sidebar links for teacher
  const sidebarLinks = [
    { name: "Home", link: "/teacher/home" },
    {
      name: "My Students",
      subLinks: [
        { name: "View Students", link: "/teacher/students" },
        { name: "Attendance", link: "/teacher/attendance" },
      ],
    },
    {
      name: "Classes",
      subLinks: [
        { name: "My Class", link: "/teacher/my-class" },
        { name: "Assignments", link: "/teacher/assignments" },
      ],
    },
    {
      name: "Reports",
      subLinks: [
        { name: "Student Progress", link: "/teacher/reports/progress" },
        { name: "Class Report", link: "/teacher/reports/class" },
      ],
    },
    { name: "Profile", link: "/teacher/profile" },
  ];

  const [openMenu, setOpenMenu] = useState("");

  const isDefault =
    location.pathname === "/teacher" || location.pathname === "/teacher/";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Teacher Panel</h2>

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
                      openMenu === link.name
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
          <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </header>

        <main className="p-6 flex-1 overflow-auto">
          {isDefault ? (
            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-semibold text-gray-700">
                Teacher Dashboard
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-4">
                  <span className="text-gray-500 text-sm">My Students</span>
                  <span className="text-2xl font-bold mt-2 block">45</span>
                </div>

                <div className="bg-white shadow rounded-lg p-4">
                  <span className="text-gray-500 text-sm">My Classes</span>
                  <span className="text-2xl font-bold mt-2 block">4</span>
                </div>

                <div className="bg-white shadow rounded-lg p-4">
                  <span className="text-gray-500 text-sm">Assignments</span>
                  <span className="text-2xl font-bold mt-2 block">12</span>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Teacher Overview</h3>
                <p className="text-gray-600">
                  Manage your classes, track student attendance, assign
                  homework, and view student progress reports from here.
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

export default TeacherDashboard;
