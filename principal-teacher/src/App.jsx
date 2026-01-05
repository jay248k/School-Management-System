import React from "react"; // ← Add this
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import PrincipalDashboard from "./components/auth/principal/PrincipalDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/principal",
    element: <PrincipalDashboard />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
