import React from "react"; // ← Add this
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import PrincipalDashboard from "./components/principal/PrincipalDashboard";
import StudentRegistrationForm from "./components/pages/StudentRegistrationForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/principal",
    element: <PrincipalDashboard />,
    children: [
      { path: "student-management", element: <StudentRegistrationForm /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
