import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/auth/Login";
import PrincipalDashboard from "./components/principal/PrincipalDashboard";
import AddStudent from "./components/principal/student/AddStudent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/principal",
    element: <PrincipalDashboard />,
    children: [{ path: "students/add", element: <AddStudent /> }],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
