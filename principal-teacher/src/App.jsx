import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/auth/Login";
import PrincipalDashboard from "./components/principal/PrincipalDashboard";
import AddStudent from "./components/principal/student/AddStudent";
import AddTeacher from "./components/principal/teacher/AddTeacher";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/principal",
    element: <PrincipalDashboard />,
    children: [
      { path: "students/add", element: <AddStudent /> },
      { path: "teachers/add", element: <AddTeacher /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
