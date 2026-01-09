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
import TeacherDashboard from "./components/teacher/TeacherDashboard";
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
  {
    path: "/teacher",
    element: <TeacherDashboard />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
